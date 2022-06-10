import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { AngularFirePerformance } from '@angular/fire/performance';
import {from, Observable, of} from 'rxjs';
import {catchError, map, mergeMap, shareReplay} from 'rxjs/operators';
import firebase from 'firebase';
import firestore = firebase.firestore;
import { IntegrativeTeacher } from '../../models/integrative-teacher';
import { Planning } from '../../models/planning';
import { AcademicPeriodsService } from './academic-period.service';

const PLANNING_COLLECTION_NAME = 'planning';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  constructor(
    private angularFirestore: AngularFirestore,
    private academicPeriodsService: AcademicPeriodsService,
    private readonly angularFirePerformance: AngularFirePerformance
  ) { }

  public savePlanning(planning: Planning): Observable<Planning | null> {
    const saveProcess = from(this.createPlanning(planning)).pipe(
      mergeMap(async (acc) => await this.saveInDB(acc)),
      catchError((err) => {
        console.log('Error saving teacher: ', err);
        return of(null);
      })
    );
    return saveProcess;
  }


  private async createPlanning(planning: Planning): Promise<Planning> {
    // criterio para crear ID de planning
    // `${it.period.reference.id}-${it.degree.reference.id}-${it.email.split('@')[0]}-${it.cycle}`

    const planningCreated: Planning =  {
      id: planning.id,
      integrativeTeacherId: planning.integrativeTeacherId,
      degree: planning.degree,
      faculty: planning.faculty,
      modality: planning.modality,
      cycle: planning.cycle,
      planningStatus: planning.planningStatus
    };
    return planningCreated;
  }

  private async saveInDB(planning: Planning): Promise<Planning> {

    const batch = this.angularFirestore.firestore.batch();
    const planningReference = this.planningReference(`${planning.id}`);
    batch.set(planningReference, planning);
    await batch.commit();

    return planning;
  }

  /**
   * Update planning status
   * @param planningId Identifier of the planning
   * @param planningStatus status to update
   */
  public async updatePlanningStatus(planningId: string, planningStatus: string): Promise<void> {
    return await this.planningReference(planningId).set(
      { planningStatus },
      { merge: true }
    );
  }

  /**
   * Get plannings of an Integrative Teachers
   * @param teacherId Identifier of the teacher
   */
  public getPlanningsOfTeacher(teacherId: string): Observable<Array<Planning>> {

    return this.angularFirestore.collection<Planning>(
      PLANNING_COLLECTION_NAME,
      query => {
        return query.orderBy('cycle')
          .where('integrativeTeacherId', '==', teacherId);
      }
    )
      .valueChanges()
      .pipe(
        mergeMap(async doc => {
          await this.angularFirePerformance.trace('list-plannings-of-a-teacher');
          return doc;
        }),
        shareReplay(1)
      );
  }

  /**
   * Get the firestore document of a planning
   * @param planningId Identifier of the planning
   */
  private planningDocument(planningId: string): AngularFirestoreDocument<Planning> {
    return this.angularFirestore
      .collection(PLANNING_COLLECTION_NAME)
      .doc<Planning>(planningId);
  }

  /**
   * Get the document reference of a planning
   * @param planningId Identifier of the planning
   */
  public planningReference(planningId: string): firestore.DocumentReference<Planning> {
    return this.planningDocument(planningId).ref as firestore.DocumentReference<Planning>;
  }

  /**
   * Get a planning by id
   * @param planningId Identifier of the planning
   */
  public planningById(planningId: string): Observable<Planning> {
    return this.planningDocument(planningId).get().pipe(
      map(snap => (snap.data() as Planning))
    );
  }

  /**
   * Get plannings collection
   */
  public planningCollection(): AngularFirestoreCollection<Planning> {
    return this.angularFirestore.collection<Planning>(PLANNING_COLLECTION_NAME);
  }

  /**
   * Get all plannings
   */
  public plannings(): Observable<Array<Planning>> {
    return this.planningCollection().valueChanges();
  }

}

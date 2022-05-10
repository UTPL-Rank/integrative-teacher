import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirePerformance } from '@angular/fire/performance';
import { Observable } from 'rxjs';
import { map, mergeMap, shareReplay } from 'rxjs/operators';
import firebase from 'firebase';
import firestore = firebase.firestore;
import { IntegrativeTeacher } from '../../models/integrative-teacher';
import { AcademicPeriodsService } from './academic-period.service';

const INTEGRATIVE_TEACHERS_COLLECTION_NAME = 'integrative-teachers';

@Injectable({
  providedIn: 'root'
})
export class IntegrativeTeacherService {

  constructor(
    private angularFirestore: AngularFirestore,
    private academicPeriodsService: AcademicPeriodsService,
    private readonly angularFirePerformance: AngularFirePerformance
  ) { }

  public async updatePlanningStatus(integrativeTeacherId: string, planningStatus: string): Promise<void> {
    return await this.integrativeTeacherReference(integrativeTeacherId).set(
      { planningStatus },
      { merge: true }
    );
  }

  /**
   * Get Integrative Teachers of a period
   * @param periodId Identifier of the period
   */
  public getIntegrativeTeachersOfPeriod(periodId: string): Observable<Array<IntegrativeTeacher>> {
    const periodReference = this.academicPeriodsService.periodReference(periodId);
    return this.angularFirestore.collection<IntegrativeTeacher>(
      INTEGRATIVE_TEACHERS_COLLECTION_NAME,
      query => {
        return query.orderBy('displayName')
          .where('period.reference', '==', periodReference);
      }
    )
      .valueChanges()
      .pipe(
        mergeMap(async doc => {
          await this.angularFirePerformance.trace('list-teachers-of-a-period');
          return doc;
        }),
        shareReplay(1)
      );
  }

  /**
   * Get the firestore document of a Integrative Teacher
   * @param integrativeTeacherId Identifier of the Integrative Teacher
   */
  private integrativeTeacherDocument(integrativeTeacherId: string): AngularFirestoreDocument<IntegrativeTeacher> {
    return this.angularFirestore
      .collection(INTEGRATIVE_TEACHERS_COLLECTION_NAME)
      .doc<IntegrativeTeacher>(integrativeTeacherId);
  }

  public integrativeTeacherReference(activityId: string): firestore.DocumentReference<IntegrativeTeacher> {
    return this.integrativeTeacherDocument(activityId).ref as firestore.DocumentReference<IntegrativeTeacher>;
  }

  public integrativeTeacherById(integrativeTeacherId: string): Observable<IntegrativeTeacher> {
    return this.integrativeTeacherDocument(integrativeTeacherId).get().pipe(
      map(snap => (snap.data() as IntegrativeTeacher))
    );
  }
}

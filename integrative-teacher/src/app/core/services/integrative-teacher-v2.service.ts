import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, shareReplay } from 'rxjs/operators';
import firebase from 'firebase';
import firestore = firebase.firestore;
import {IntegrativeTeacher, IntegrativeTeacherV2} from '../../models/integrative-teacher';
import { AngularFirePerformance } from '@angular/fire/performance';
import { AcademicPeriodsService } from './academic-period.service';

const INTEGRATIVE_TEACHERS_COLLECTION_NAME = 'integrative-teachers-v2';

@Injectable({
  providedIn: 'root'
})
export class IntegrativeTeacherV2Service {

  constructor(
    private angularFirestore: AngularFirestore,
    private readonly academicPeriodsService: AcademicPeriodsService,
    private readonly angularFirePerformance: AngularFirePerformance
  ) { }

  public saveIntegrativeTeacher(integrativeTeacher: IntegrativeTeacherV2): Observable<IntegrativeTeacherV2 | null> {
    const saveProcess = from(this.createIntegrativeTeacher(integrativeTeacher)).pipe(
      mergeMap(async (acc) => await this.saveInDB(acc)),
      catchError((err) => {
        console.log('Error saving teacher: ', err);
        return of(null);
      })
    );
    return saveProcess;
  }


  private async createIntegrativeTeacher(integrativeTeacher: IntegrativeTeacherV2): Promise<IntegrativeTeacherV2> {

    const integrativeTeacherCreated: IntegrativeTeacherV2 =  {
      id: `${integrativeTeacher.period.reference.id}-${integrativeTeacher.email.split('@')[0]}`,
      email: integrativeTeacher.email,
      displayName: integrativeTeacher.displayName,
      period: integrativeTeacher.period
    };
    return integrativeTeacherCreated;
  }

  private async saveInDB(integrativeTeacher: IntegrativeTeacherV2): Promise<IntegrativeTeacherV2> {

    const batch = this.angularFirestore.firestore.batch();
    const integrativeTeacherReference = this.integrativeTeacherReference(`${integrativeTeacher.id}`);
    batch.set(integrativeTeacherReference, integrativeTeacher);
    await batch.commit();

    return integrativeTeacher;
  }

  /**
   * Get the firestore document of a Integrative Teacher
   * @param integrativeTeacherId Identifier of the Integrative Teacher
   */
  private integrativeTeacherDocument(integrativeTeacherId: string): AngularFirestoreDocument<IntegrativeTeacherV2> {
    return this.angularFirestore
      .collection(INTEGRATIVE_TEACHERS_COLLECTION_NAME)
      .doc<IntegrativeTeacherV2>(integrativeTeacherId);
  }

  public integrativeTeacherReference(activityId: string): firestore.DocumentReference<IntegrativeTeacherV2> {
    return this.integrativeTeacherDocument(activityId).ref as firestore.DocumentReference<IntegrativeTeacherV2>;
  }

  public integrativeTeacherById(integrativeTeacherId: string): Observable<IntegrativeTeacherV2> {
    return this.integrativeTeacherDocument(integrativeTeacherId).get().pipe(
      map(snap => (snap.data() as IntegrativeTeacherV2))
    );
  }

  /**
   * Get integrative-teachers collection
   */
  public integrativeTeachersCollection(): AngularFirestoreCollection<IntegrativeTeacherV2> {
    return this.angularFirestore.collection<IntegrativeTeacherV2>(INTEGRATIVE_TEACHERS_COLLECTION_NAME);
  }

  /**
   * Get all integrative teachers
   */
  public integrativeTeachers(): Observable<Array<IntegrativeTeacherV2>> {
    return this.integrativeTeachersCollection().valueChanges();
  }

  /**
   * Get Integrative Teachers of a period
   * @param periodId Identifier of the period
   */
  public getIntegrativeTeachersOfPeriod(periodId: string): Observable<Array<IntegrativeTeacherV2>> {
    const periodReference = this.academicPeriodsService.periodReference(periodId);
    return this.angularFirestore.collection<IntegrativeTeacherV2>(
      INTEGRATIVE_TEACHERS_COLLECTION_NAME,
      query => {
        return query.orderBy('displayName')
          .where('period.reference', '==', periodReference);
      }
    )
      .valueChanges()
      .pipe(
        mergeMap(async doc => {
          await this.angularFirePerformance.trace('list-teachers-of-period');
          return doc;
        }),
        shareReplay(1)
      );
  }

}

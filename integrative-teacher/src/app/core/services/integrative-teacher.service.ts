import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirePerformance } from '@angular/fire/performance';
import { Observable } from 'rxjs';
import { map, mergeMap, shareReplay } from 'rxjs/operators';
import { Activity } from '../../models/activity';
import firebase from 'firebase';
import firestore = firebase.firestore;
import { IntegrativeTeacher } from '../../models/integrative-teacher';

const INTEGRATIVE_TEACHERS_COLLECTION_NAME = 'integrative-teachers';

@Injectable({
  providedIn: 'root'
})
export class IntegrativeTeacherService {

  constructor(
    private angularFirestore: AngularFirestore,
  ) { }

  public async updatePlanningStatus(integrativeTeacherId: string, planningStatus: string): Promise<void> {
    return await this.integrativeTeacherReference(integrativeTeacherId).set(
      { planningStatus },
      { merge: true }
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

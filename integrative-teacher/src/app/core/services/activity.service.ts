import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirePerformance } from '@angular/fire/performance';
import { AngularFireStorage } from '@angular/fire/storage';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, shareReplay } from 'rxjs/operators';
import { Activity } from '../../models/activity';
import firebase from 'firebase';
import firestore = firebase.firestore;

const ACTIVITIES_COLLECTION_NAME = 'activities';
const USERNAME_TEST = 'odmendoza';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private activitiesReference: AngularFirestoreCollection;

  constructor(
    private angularFireStorage: AngularFireStorage,
    private angularFirestore: AngularFirestore,
    private readonly angularFirePerformance: AngularFirePerformance
  ) {
    this.activitiesReference = this.angularFirestore.collection(ACTIVITIES_COLLECTION_NAME);
  }

  public saveActivity(activity: Activity): Observable<Activity | null> {
    const saveProcess = from(this.createActivity(activity)).pipe(
      mergeMap(async (acc) => await this.saveInDB(acc)),
      catchError((err) => {
        return of(null);
      })
    );
    return saveProcess;
  }

  private async createActivity(activity: Activity): Promise<Activity> {
    const activityCreated: Activity =  {
      id: `${ (new Date()).valueOf() }`, // Date Integer
      integrativeTeacher: USERNAME_TEST,
      description: activity.description,
      goal: activity.goal,
      createdAt: new Date(),
      startDate: activity.startDate,
      endDate: activity.endDate,
      evidence: activity.evidence,
      indicator: activity.indicator,
      status: 'planificada'
    };
    return activityCreated;
  }

  private async saveInDB(activity: Activity): Promise<Activity> {

    const batch = this.angularFirestore.firestore.batch();
    const activityReference = this.activitiesReference.doc(`${activity.id}`).ref;
    batch.set(activityReference, activity);
    await batch.commit();

    return activity;
  }

  public async updateActivityStatus(activityId: string, status: string): Promise<void> {
    return await this.activityReference(activityId).set(
      { status },
      { merge: true }
    );
  }

  /**
   * Get the firestore document of a Activity
   * @param activityId Identifier of the Activity
   */
  private activityDocument(activityId: string): AngularFirestoreDocument<Activity> {
    return this.angularFirestore
      .collection(ACTIVITIES_COLLECTION_NAME)
      .doc<Activity>(activityId);
  }

  public activityReference(activityId: string): firestore.DocumentReference<Activity> {
    return this.activityDocument(activityId).ref as firestore.DocumentReference<Activity>;
  }

  public activityById(activityId: string): Observable<Activity> {
      return this.activityDocument(activityId).get().pipe(
        map(snap => (snap.data() as Activity))
      );
    }

  setActivity(activity: Activity): Promise<any> {
    return this.activitiesReference.doc(activity.id).set(activity);
  }

  updateActivity(activity: Activity): Promise<any> {
    return this.activitiesReference.doc(activity.id).update(activity);
  }

  deleteActivity(id: string | undefined): Promise<any> {
    return this.activitiesReference.doc(id).delete();
  }

  public getActivitiesOfATeacher(username: string): Observable<Array<Activity>> {
    return this.angularFirestore.collection<Activity>(
      ACTIVITIES_COLLECTION_NAME,
      query => {
        // const teacherReference = this.userService.userDocument(username).ref;
        return query.orderBy('createdAt')
          .where('integrativeTeacher', '==', username);
      }
    )
      .valueChanges()
      .pipe(
        mergeMap(async doc => {
          await this.angularFirePerformance.trace('list-activities-of-a-teacher');
          return doc;
        }),
        shareReplay(1)
      );
  }
}

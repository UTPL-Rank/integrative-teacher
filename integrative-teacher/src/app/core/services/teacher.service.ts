import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirePerformance } from '@angular/fire/performance';
import { AngularFireStorage } from '@angular/fire/storage';
import { from, Observable, of } from 'rxjs';
import { catchError, mergeMap, shareReplay} from 'rxjs/operators';
import { ATeacher } from '../../models/a-teacher';

const TEACHERS_COLLECTION_NAME = 'teachers-v2';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private teachersReference: AngularFirestoreCollection;

  constructor(
    private angularFireStorage: AngularFireStorage,
    private angularFirestore: AngularFirestore,
    private readonly angularFirePerformance: AngularFirePerformance
  ) {
    this.teachersReference = this.angularFirestore.collection(TEACHERS_COLLECTION_NAME);
  }


  public saveTeacher(teacher: ATeacher): Observable<ATeacher | null> {
    const saveProcess = from(this.createTeacher(teacher)).pipe(
      mergeMap(async (acc) => await this.saveInDB(acc)),
      catchError((err) => {
        console.log('Error saving teacher: ', err);
        return of(null);
      })
    );
    return saveProcess;
  }

  private async createTeacher(teacher: ATeacher): Promise<ATeacher> {
    const teacherCreated: ATeacher =  {
      id: `${ (new Date()).valueOf() }`, // Date Integer
      integrativeTeacher: teacher.integrativeTeacher,
      displayName: teacher.displayName,
      subject: teacher.subject,
      planningId: teacher.planningId
    };
    return teacherCreated;
  }

  // private async createTeacher2(teacher: ATeacher): Promise<ATeacher> {
  //   const teacherCreated: ATeacher =  {
  //     id: teacher.id,
  //     planningId: teacher.planningId,
  //     integrativeTeacher: teacher.integrativeTeacher,
  //     displayName: teacher.displayName,
  //     subject: teacher.subject
  //   };
  //   return teacherCreated;
  // }

  private async saveInDB(teacher: ATeacher): Promise<ATeacher> {

    const batch = this.angularFirestore.firestore.batch();
    const teacherReference = this.teachersReference.doc(`${teacher.id}`).ref;
    batch.set(teacherReference, teacher);
    await batch.commit();

    return teacher;
  }

  // private async saveInDB2(teacher: ATeacher): Promise<ATeacher> {
  //
  //   const batch = this.angularFirestore.firestore.batch();
  //   const teacherReference = this.teachersReference2.doc(`${teacher.id}`).ref;
  //   batch.set(teacherReference, teacher);
  //   await batch.commit();
  //
  //   return teacher;
  // }

  setTeacher(teacher: ATeacher): Promise<any> {
    return this.teachersReference.doc(teacher.id).set(teacher);
  }

  // updateTeacher(teacher: ATeacher): Promise<any> {
  //   return this.teachersReference.doc(teacher.id).update({
  //     displayName: teacher.displayName,
  //     subject: teacher.subject
  //   });
  // }

  updateTeacher(teacher: ATeacher): Promise<any> {
    return this.teachersReference.doc(teacher.id).update(teacher);
  }

  deleteTeacher(id: string | undefined): Promise<any> {
    return this.teachersReference.doc(id).delete();
  }

  /**
   * Get Teachers Of A IntegrativeTeacher
   * @param integrativeTeacherId Id of the integrative teacher
   * @deprecated Use getTeachersOfPlanning instead.
   */
  public getTeachersOfAIntegrativeTeacher(integrativeTeacherId: string): Observable<Array<ATeacher>> {
    return this.angularFirestore.collection<ATeacher>(
      TEACHERS_COLLECTION_NAME,
      query => {
        return query.orderBy('displayName')
          .where('integrativeTeacher', '==', integrativeTeacherId);
      }
    )
      .valueChanges()
      .pipe(
        mergeMap(async doc => {
          await this.angularFirePerformance.trace('list-teachers-of-a-integrative');
          return doc;
        }),
        shareReplay(1)
      );
  }

  /**
   * Get Teachers Of A Planning
   * @param planningId The id of the planning
   */
  public getTeachersOfPlanning(planningId: string): Observable<Array<ATeacher>> {
    return this.angularFirestore.collection<ATeacher>(
      TEACHERS_COLLECTION_NAME,
      query => {
        return query.orderBy('displayName')
          .where('planningId', '==', planningId);
      }
    )
      .valueChanges()
      .pipe(
        mergeMap(async doc => {
          await this.angularFirePerformance.trace('list-teachers-of-planning');
          return doc;
        }),
        shareReplay(1)
      );
  }

  /**
   * Get activities collection
   */
  public teachersCollection(): AngularFirestoreCollection<ATeacher> {
    return this.angularFirestore.collection<ATeacher>(TEACHERS_COLLECTION_NAME);
  }

  /**
   * Get all activities
   */
  public allTeachers(): Observable<Array<ATeacher>> {
    return this.teachersCollection().valueChanges();
  }

}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, shareReplay } from 'rxjs/operators';
import firebase from 'firebase';
import firestore = firebase.firestore;
import { Faculty } from '../../models/faculty';

const FACULTIES_COLLECTION_NAME = 'faculties';
// const USERNAME_TEST = 'abr22-ago22-odmendoza';

@Injectable({
  providedIn: 'root'
})
export class FacultiesService {

  private facultiesReference: AngularFirestoreCollection;

  constructor(
    private angularFireStorage: AngularFireStorage,
    private angularFirestore: AngularFirestore,
  ) {
    this.facultiesReference = this.angularFirestore.collection(FACULTIES_COLLECTION_NAME);
  }

  public faculties(): Observable<Array<Faculty>> {
    return this.facultiesCollection().valueChanges();
  }

  /**
   * Get the firestore document of a Faculty
   * @param facultyId Identifier of the Faculty
   */
  private facultyDocument(facultyId: string): AngularFirestoreDocument<Faculty> {
    return this.angularFirestore
      .collection(FACULTIES_COLLECTION_NAME)
      .doc<Faculty>(facultyId);
  }

  public facultyReference(facultyId: string): firestore.DocumentReference<Faculty> {
    return this.facultyDocument(facultyId).ref as firestore.DocumentReference<Faculty>;
  }

  public facultyById(facultyId: string): Observable<Faculty> {
    return this.facultyDocument(facultyId).get().pipe(
      map(snap => (snap.data() as Faculty))
    );
  }

  public facultiesCollection(): AngularFirestoreCollection<Faculty> {
    return this.angularFirestore.collection<Faculty>(FACULTIES_COLLECTION_NAME);
  }

}

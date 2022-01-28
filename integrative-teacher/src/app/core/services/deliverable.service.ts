import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirePerformance } from '@angular/fire/performance';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, mergeMap, shareReplay } from 'rxjs/operators';
import firebase from 'firebase';
import firestore = firebase.firestore;

import { FileUpload } from '../../models/file-upload';
import { Deliverable } from '../../models/deliverable';
import Timestamp = firestore.Timestamp;


export interface AnalyticsOER {
  next: number;
}

const DELIVERABLES_COLLECTION_NAME = 'deliverables';

@Injectable({
  providedIn: 'root'
})
export class DeliverableService {

  private FILES_BASE_PATH = '/uploads';

  evidencesCollection: AngularFirestoreCollection;

  constructor(
    private storage: AngularFireStorage,
    private angularFirestore: AngularFirestore,
    private readonly perf: AngularFirePerformance,
  ) {
    this.evidencesCollection = this.angularFirestore.collection(DELIVERABLES_COLLECTION_NAME);
  }


  public async saveDeliverable(formData: FormData, deliverable: Deliverable): Promise<Deliverable> {
    const deliverableToSave = await this.createDeliverable(formData.get('file') as File, deliverable);
    return await this.saveInDB(deliverableToSave);
  }


  private async createDeliverable(file: File, deliverable: Deliverable): Promise<Deliverable> {
    // Cargamos el archivo y obtenemos los datos de la carga
    const deliverableUploaded = await this.uploadFile(file, this.FILES_BASE_PATH);

    // Creamos el objeto que queremos guarda en Firebase
    const created: Deliverable = {
      id: `${(new Date()).valueOf()}`, // Date Integer
      owner: deliverable.owner,
      activityId: deliverable.activityId,
      filename: deliverableUploaded.name,
      path: deliverableUploaded.path,
      url: deliverableUploaded.url,
      createdAt: Timestamp.fromDate(new Date())
    };
    return created;
  }

  private async uploadFile(file: File, folder: string): Promise<FileUpload> {

    const path = `/${folder}/${file.name}`;
    await this.storage.upload(path, file);

    const ref = this.storage.storage.ref(path);
    const data: FileUpload = {
        name: ref.name,
        path,
        createdAt: new Date(),
        url: await ref.getDownloadURL(),
      } as FileUpload;

    return data;
  }

  private async saveInDB(deliverable: Deliverable): Promise<Deliverable> {

    const batch = this.angularFirestore.firestore.batch();
    const evidenceReference = this.evidencesCollection.doc(`${deliverable.id}`).ref;
    batch.set(evidenceReference, deliverable);
    await batch.commit();

    return deliverable;
  }

  public async deleteDeliverable(deliverable: Deliverable): Promise<void> {

    // Create a reference to the file to delete
    const filename = `${deliverable.filename}`;
    const deliverableReference = this.storage.ref(this.FILES_BASE_PATH);

    // Delete file from storage
    deliverableReference.child(filename).delete();

    // Delete file from database
    return this.evidencesCollection.doc(deliverable.id).delete();
  }

  public getDeliverablesOfActivity(activityId: string): Observable<Array<Deliverable>> {
    return this.angularFirestore.collection<Deliverable>(
      DELIVERABLES_COLLECTION_NAME,
      query => {
        return query.orderBy('createdAt')
          .where('activityId', '==', activityId);
      }
    )
      .valueChanges()
      .pipe(
        mergeMap(async doc => {
          await this.perf.trace('deliverables-by-activity');
          return doc;
        }),
        shareReplay(1)
      );
  }


  /**
   * Get the firestore collection of REAs
   */
  public deliverableCollection(): AngularFirestoreCollection<Deliverable> {
    return this.angularFirestore.collection<Deliverable>(DELIVERABLES_COLLECTION_NAME);
  }

  /**
   * Get the firestore document of a Deliverable
   * @param deliverableId Identifier of the Deliverable
   */
  private deliverableDocument(deliverableId: string): AngularFirestoreDocument<Deliverable> {
    return this.angularFirestore
      .collection(DELIVERABLES_COLLECTION_NAME)
      .doc<Deliverable>(deliverableId);
  }

  public deliverable(deliverableId: string): Observable<Deliverable> {
    return this.deliverableDocument(deliverableId).get().pipe(
      map(snap => (snap.data() as Deliverable))
    );
  }

  public deliverableRef(deliverableId: string): firestore.DocumentReference<Deliverable> {
    return this.deliverableDocument(deliverableId).ref as firestore.DocumentReference<Deliverable>;
  }

}

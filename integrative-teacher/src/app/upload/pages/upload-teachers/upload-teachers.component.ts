import { Component } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { UploadTeacher } from '../../../models/upload-teacher';
import { Faculty } from '../../../models/faculty';
import { Degree } from '../../../models/degree';
import { UploadData } from 'src/app/models/upload-data.interface';

@Component({
  selector: 'app-upload-teachers',
  templateUrl: './upload-teachers.component.html',
  styleUrls: ['./upload-teachers.component.scss']
})
export class UploadTeachersComponent implements UploadData<UploadTeacher>{

  constructor(private db: AngularFirestore) { }

  isSaving = false;
  data: Array<UploadTeacher> | null = null;

  async save(): Promise<void> {
    if (!this.data) {
      alert('Primero carge un archivo.');
      return;
    }

    if (this.isSaving) { return; }

    try {
      this.isSaving = true;
      const batch = this.db.firestore.batch();

      this.data.forEach(teacher => {
        const { ref } = this.db.collection('iTeachers').doc(teacher.id);
        batch.set(ref, teacher, { merge: true });
      });

      await batch.commit();
      alert('Todos los docentes han sido guardados');
    } catch (error) {
      this.isSaving = false;
      console.log(error);
      alert('Ocurrió un error al guardar los docentes, intente nuevamente.');
    }
  }

  async transformer(rawData: string[]): Promise<UploadTeacher> {
    const data = rawData.map(t => t.toLocaleLowerCase().trim());
    const [id, email, displayName, degreeId, facultyId, cycle] = data;

    const facultyReference = this.db.collection('faculties').doc(facultyId).ref as DocumentReference<Faculty>;
    const facultySnap = await facultyReference.get();
    if (!facultySnap.exists) { throw new Error(`La facultad ${facultySnap.id} no existe.`); }
    const facultyData = facultySnap.data();

    if (!facultyData) {
      throw new Error('missing data');
    }

    const degreeReference = this.db.collection('degrees').doc(degreeId).ref as DocumentReference<Degree>;
    const degreeSnap = await degreeReference.get();
    if (!degreeSnap.exists) { throw new Error(`La carrera ${degreeSnap.id} no existe.`); }
    const degreeData = degreeSnap.data();

    if (!degreeData) {
      throw new Error('missing data');
    }

    return {
      id,
      email,
      displayName,
      degree: {
        reference: degreeReference,
        name: degreeData.name
      },
      faculty: {
        reference: facultyReference,
        name: facultyData.name
      },
      cycle,
    };
  }

  async readFile(csv: string): Promise<void> {

    const data = csv
      .split(/\r\n|\n/)
      .filter(line => line.trim() !== '')
      .splice(1)
      .map(line => line.split(';'))
      .map(v => this.transformer(v));


    this.data = await Promise.all(data);
    // tslint:disable-next-line: typedef
  } catch(error: Error) {
    alert(error.message);
    this.data = [];
  }
}

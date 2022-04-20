import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DocumentReference } from '@angular/fire/firestore';
import { Faculty } from '../../../models/faculty';
import { Degree } from '../../../models/degree';
import { UploadData } from 'src/app/models/upload-data.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-degrees',
  templateUrl: './upload-degrees.component.html',
  styleUrls: ['./upload-degrees.component.scss']
})
export class UploadDegreesComponent implements UploadData<Degree> {

  constructor(private db: AngularFirestore) { }

  isSaving = false;
  data: Array<Degree> | null = null;

  async save(): Promise<void> {
    if (!this.data) {
      await Swal.fire(
        {
          title: 'No se puede realizar esta acción. Por favor, cargue el archivo de las carreras universitarias.',
          icon: 'error'
        });
      return;
    }

    if (this.isSaving) { return; }

    try {
      this.isSaving = true;
      const batch = this.db.firestore.batch();

      this.data.forEach(degree => {
        const { ref } = this.db.collection('degrees').doc(degree.id);
        batch.set(ref, degree, { merge: true });
      });

      await batch.commit();
      await Swal.fire({title: 'Las carreras han sido guardadas exitosamente.', icon: 'success'});
      this.data = null;
    } catch (error) {
      this.isSaving = false;
      await Swal.fire({title: 'Ocurrió un error al guardar las carreras universitarias, vuelve a intentarlo.', icon: 'error'});
    }
  }
  async transformer(rawData: string[]): Promise<Degree> {
    const data = rawData.map(d => d.toLocaleLowerCase().trim());
    const [facultyId, id, name] = data;

    // Obtain faculty data
    const facultyReference = this.db.collection('faculties').doc(facultyId).ref as DocumentReference<Faculty>;
    const facultySnap = await facultyReference.get();
    if (!facultySnap.exists) { throw new Error(`La facultad ${facultySnap.id} no existe.`); }
    const facultyData = facultySnap.data();

    if (!facultyData) {
      throw new Error('missing data');
    }


    return {
      id,
      name,
      faculty: {
        reference: facultyReference,
        name: facultyData.name
      }
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

import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DocumentReference } from '@angular/fire/firestore';
import { Faculty } from '../../../models/faculty';
import { Degree } from '../../../models/degree';

@Component({
  selector: 'app-upload-faculties',
  templateUrl: './upload-faculties.component.html',
  styleUrls: ['./upload-faculties.component.scss']
})
export class UploadFacultiesComponent {

  constructor(private db: AngularFirestore) { }

  isSaving = false;
  data: Array<Faculty> | null = null;

  async save(): Promise<void> {
    if (!this.data) {
      alert('Primero lee el archivo de los carreras académicas.');
      return;
    }

    if (this.isSaving) { return; }

    try {
      this.isSaving = true;
      const batch = this.db.firestore.batch();

      this.data.forEach(faculty => {
        const { ref } = this.db.collection('faculties').doc(faculty.id);
        batch.set(ref, faculty, { merge: true });
      });

      await batch.commit();
      alert('Todos las carreras han sido guardados.');
      // this.router.navigateByUrl('/');
    } catch (error) {
      this.isSaving = false;
      console.log(error);
      alert('Ocurrió un error al guardar las carreras, vuelve a intentarlo.');
    }
  }
  async transformer(rawData: string[]): Promise<Faculty> {
    const data = rawData.map(d => d.toLocaleLowerCase().trim());
    const [id, name] = data;

    return {
      id,
      name,
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

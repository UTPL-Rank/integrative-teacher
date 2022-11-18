import { Component } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { IntegrativeTeacher } from '../../../models/integrative-teacher';
import { Faculty } from '../../../models/faculty';
import { Degree } from '../../../models/degree';
import { UploadData } from '../../../models/upload-data.interface';
import Swal from 'sweetalert2';
import {AcademicPeriodsService} from '../../../core/services/academic-period.service';
import {AcademicPeriod} from '../../../models/academic-period';
import {Planning} from '../../../models/planning';
import { reference } from '@popperjs/core';
import { PlanningService } from 'src/app/core/services/planning.service';
import { MicrosoftSignInService } from 'src/app/core/services/microsoft-sign-in.service';
import { MicrosoftSignInOptions } from 'src/app/models/microsoft-sign-in-options.model';

@Component({
  selector: 'app-upload-teachers',
  templateUrl: './upload-teachers.component.html',
  styleUrls: ['./upload-teachers.component.scss']
})
export class UploadTeachersComponent implements UploadData<IntegrativeTeacher>{
  
  
  ACADEMIC_PERIOD_ID!: string;


  planning: Planning[] = [];

  constructor(
    private db: AngularFirestore,    
    private academicPeriodsService: AcademicPeriodsService,
    private planningService: PlanningService,
    private microsoftSignInService:MicrosoftSignInService
    ) {
    this.academicPeriodsService.current().subscribe(
      periods => {
        this.academicPeriod = periods.filter(periods => periods.current == true)[0];
        this.ACADEMIC_PERIOD_ID = periods.filter(periods => periods.current == true)[0].id;
      }
    );

    

     }

  isSaving = false;
  data: Array<IntegrativeTeacher> | null = null;
  academicPeriod!: AcademicPeriod;

  async save(): Promise<void> {
    if (!this.data) {
      await Swal.fire(
        {
          title: 'No se puede realizar esta acción. Por favor, cargue el archivo de los docentes.',
          icon: 'error'
        });
      return;
    }

    if (this.isSaving) { return; }

    try {

      this.isSaving = true;
      const batch = this.db.firestore.batch();

      // Insertar datos en documento integrative-Teacher-v2
      this.data.forEach(teacher => {
        const { ref } = this.db.collection('integrative-teachers-v2').doc(teacher.id);

        batch.set(ref, teacher, { merge: true });



        
      });
      
      // Insertar datos en documento planning-v2/* 
      // let plan = this.planningService.savePlanning(this.planning).subscribe();
      
      this.planning.forEach( plan => this.planningService.savePlanning(plan).subscribe());
    
      // Crear el usuario en users:


      
      await batch.commit();
      await Swal.fire({title: 'Los docentes han sido guardados exitosamente.', icon: 'success'});
      
      this.data = null;

      


    } catch (error) {
      this.isSaving = false;
      await Swal.fire(
        {title: 'Ocurrió un error al guardar los docentes, vuelve a intentarlo.',
          icon: 'error'
        }
      );
    }
  }



  async transformer(rawData: string[]): Promise<IntegrativeTeacher> {
    const data = rawData.map(t => t.toLocaleLowerCase().trim());
    const [email, displayName, degreeId, facultyId, cycle, modality] = data;

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

    
    var plan = {
      
      // ${it.period.reference.id}-${it.degree.reference.id}-${it.email.split('@')[0]}-${it.cycle}
      /* id: `${this.ACADEMIC_PERIOD_ID}-${email.split('@')[0]}`, */
      
      id: `${this.ACADEMIC_PERIOD_ID}-${degreeReference.id}-${email.split('@')[0]}-${cycle} `,
      
      integrativeTeacherId: `${this.ACADEMIC_PERIOD_ID}-${email.split('@')[0]}`,

      degree: {
        reference: degreeReference,
        name: degreeData.name
      },

      faculty: {
        reference: facultyReference,
        name: facultyData.name
      },

      modality,
      cycle ,
      planningStatus: "incompleta",

      }

      this.planning.push(plan);
      

      

    return {
      id: `${this.ACADEMIC_PERIOD_ID}-${email.split('@')[0]}`,
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
      planningStatus: 'incompleta',
      period: {
        reference: this.academicPeriodsService.periodDocument(this.ACADEMIC_PERIOD_ID).ref,
        name: this.academicPeriod.name
      }
    };
  }

  // TODO: Poner periodo académico en el return de la función anterior

  async readFile(csv: string): Promise<void> {

    const data = csv
      .split(/\r\n|\n/)
      .filter(line => line.trim() !== '')
      .splice(1)
      .map(line => line.split(';'))
      .map(v => this.transformer(v));


    this.data = await Promise.all(data);
    console.log("echo")
    // tslint:disable-next-line: typedef
  } catch(error: Error) {
    alert(error.message);
    this.data = [];
  }
}

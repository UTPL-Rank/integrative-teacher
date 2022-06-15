import {DocumentReference} from '@angular/fire/firestore';

export interface IntegrativeTeacherWithPlanning {
  planningId: string;
  integrativeTeacherId: string;
  email: string;
  displayName: string;
  degree: {
    reference: DocumentReference;
    name: string;
  };
  faculty: {
    reference: DocumentReference;
    name: string;
  };
  cycle: string;
  planningStatus: string;
  period: {
    reference: DocumentReference;
    name: string;
  };
  modality: string;
}

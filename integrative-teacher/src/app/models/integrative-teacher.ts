import { DocumentReference } from '@angular/fire/firestore';

/**
 * @deprecated Do not use. Use IntegrativeTeacherV2
 */
export interface IntegrativeTeacher {
    id: string;
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
}


export interface IntegrativeTeacherV2 {
  id?: string;
  email: string;
  displayName: string;
  period: {
    reference: DocumentReference;
    name: string;
  };
}

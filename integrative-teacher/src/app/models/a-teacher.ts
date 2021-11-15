import { DocumentReference } from '@angular/fire/firestore';


export interface ATeacher {
  displayName: string;
  subject: string;
  integrativeTeacher: DocumentReference;
}

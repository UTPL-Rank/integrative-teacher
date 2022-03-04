import { DocumentReference } from '@angular/fire/firestore';

export interface Degree {
    id: string;
    name: string;
    faculty: {
        reference: DocumentReference;
        name: string;
    };
}

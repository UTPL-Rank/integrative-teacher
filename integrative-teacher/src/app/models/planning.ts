import { DocumentReference } from '@angular/fire/firestore';

export interface Planning {
    id: string;
    integrativeTeacherId: string;
    degree: {
        reference: DocumentReference;
        name: string;
    };
    faculty: {
        reference: DocumentReference;
        name: string;
    };
    modality: string;
    cycle: string;
    planningStatus: string;
}

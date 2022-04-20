import { firestore } from "firebase-admin";

export interface Teacher {
    id: string;
    email: string;
    displayName: string;
    degree: {
        reference: firestore.DocumentReference;
        name: string;
    };
    faculty: {
        reference: firestore.DocumentReference;
        name: string;
    };
    cycle: string;
    planningStatus: string;
    period: {
        reference: firestore.DocumentReference;
        name: string;
    };
}

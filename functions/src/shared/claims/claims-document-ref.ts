import { firestore } from "firebase-admin";
import { UserDocumentRef } from "../user";

export type Claims = Record<string, any>;


/**
 * Claims Document Ref
 * ==============================================================
 *
 * @author Bruno Esparza
 *
 * Get the firestore document of custom claims of a user
 *
 * @param id identifier of the user
 */
export function ClaimsDocumentRef<T = Claims>(id: string): firestore.DocumentReference<T> {
    return UserDocumentRef(id).collection('account-configuration').doc('claims') as firestore.DocumentReference<T>;
}
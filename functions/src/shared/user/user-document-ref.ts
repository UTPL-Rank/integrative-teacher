import { User } from "../../models/user.model";
import { firestore } from "firebase-admin";
import { UserCollectionRef } from "./user-collection-ref";


/**
 * User Document
 * ==============================================================
 *
 * @author Bruno Esparza
 *
 * Get the firestore document of a user
 *
 * @param id identifier of the user
 */
export function UserDocumentRef<T = User>(id: string): firestore.DocumentReference<T> {
    return UserCollectionRef<T>().doc(id);
}
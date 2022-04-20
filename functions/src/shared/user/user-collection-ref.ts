import { User } from "../../models/user.model";
import { firestore } from "firebase-admin";
import { dbFirestore } from "../../utils/utils";

/**
 * Users Collection
 * =============================================================
 *
 * @author Bruno Esparza
 *
 * Get the firestore collection of users
 */
export function UserCollectionRef<T = User>(): firestore.CollectionReference<T> {
    return dbFirestore.collection('users') as firestore.CollectionReference<T>;
}
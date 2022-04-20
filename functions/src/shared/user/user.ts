import { User } from "../../models/user.model";
import { UserDocumentRef } from "./user-document-ref";

export async function _User(id: string): Promise<User | null> {
    const docRef = UserDocumentRef(id);
    const userSnap = await docRef.get();

    return userSnap.exists ? userSnap.data() as User : null;
}
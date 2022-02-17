import { User } from "../../models/user.model";
import { _User } from "./user";

export async function ValidUser(id: string): Promise<User> {
    const user = await _User(id);

    if (user)
        return user;

    throw new Error(`User with id: ${id} not found`);
}
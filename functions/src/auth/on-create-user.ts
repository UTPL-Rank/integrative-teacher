import * as functions from 'firebase-functions';
import { ValidUTPLEmail, UsernameFromEmail,CreateNewUser,DisableAccount } from "../utils/users-utils";
import { User } from "../models/user.model";

export const onCreateUser = functions.auth.user().onCreate(async(user, _) => {
    const { uid, email, displayName = '', photoURL = '' } = user;
    if(email && ValidUTPLEmail(email)){
        const username = UsernameFromEmail(email);
        const userDTO: User = {
            uid,
            email,
            displayName,
            disabled: false,
            photoURL,
            username,
        };
        await CreateNewUser(username,userDTO);
    } else{
        await DisableAccount({uid});
    }
}

);

         
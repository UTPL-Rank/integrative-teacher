import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Subscription } from 'rxjs';

// models
import { SignIn } from '../../models/sign-in.model';
import { MicrosoftSignInOptions } from '../../models/microsoft-sign-in-options.model';
import { IntegrativeUser } from '../../models/integrative-user';
import { UserClaimsModel } from '../../models/user-claims';

// services
import { UserService } from '../../core/services/user.service';


@Injectable({ providedIn: 'root' })
export class MicrosoftSignInService extends SignIn<MicrosoftSignInOptions> {

    subscription!: Subscription;
    userClaims: UserClaimsModel = {
        isAdmin: false,
        isDocente: false
    };

    constructor(
        private router: Router,
        private readonly afAuth: AngularFireAuth,
        private readonly eventLog: AngularFireAnalytics,
        private userService: UserService,
    ) {
        super();
    }

    async signIn(options?: MicrosoftSignInOptions): Promise<void> {

        // early return since no username was provided
        if (!options?.username) {
            //CAMBIAR de lugar
            alert('No se ingresó un usuario válido');
            return;
        }

        const username: string = options.username.split('@')[0];

        // proceed to create a new UTPL provider
        const microsoftProvider = new firebase.auth.OAuthProvider('microsoft.com');
        microsoftProvider.setCustomParameters({
            prompt: 'login',
            login_hint: `${username}@utpl.edu.ec`,
            tenant: '6eeb49aa-436d-43e6-becd-bbdf79e5077d'
        });
        microsoftProvider.addScope('user.read');
        microsoftProvider.addScope('openid');
        microsoftProvider.addScope('profile');
        microsoftProvider.addScope('mail.send');

        await this.eventLog.logEvent('sign_an_action', { username });

        return await this.afAuth.signInWithPopup(microsoftProvider).then(
            async result => {
                console.log(result.additionalUserInfo);
                /*if (result.additionalUserInfo?.isNewUser) {
                   /* const newUser: IntegrativeUser = {
                        username,
                        disabled: false,
                        displayName: result.additionalUserInfo.profile['displayName'],
                        email: result.additionalUserInfo.profile['mail'],
                        photoURL: null,
                        uid: result.additionalUserInfo.profile['id'],
                    };

                    //await this.userService.userDocument(username).set(newUser);

                    let isDocente = false;
                    let isAdmin = false;

                    if (result.additionalUserInfo.profile['jobTitle'] === null) {
                        isAdmin = true;
                    } else {
                        isDocente = true;
                    }

                    const userClaims: UserClaimsModel = {
                        isDocente,
                        isAdmin: false
                    };
                    await this.userService.claimsDocument(username).set(userClaims);
                }*/

               /* await this.userService.claims.subscribe(
                    async value => {
                        this.userClaims = await value as UserClaimsModel;
                        this.redirectTo().then();
                    }
                );*/
            }
        );
    }

    async redirectTo(): Promise<void> {
        // And redirect
        if (this.userClaims.isDocente) {
            await this.router.navigate([
                'IT-docente',
                'list-docente',
            ]);
        } else if (this.userClaims.isAdmin) {
            await this.router.navigate([
                'IT-admin',
                'home',
            ]);
        }
    }

}

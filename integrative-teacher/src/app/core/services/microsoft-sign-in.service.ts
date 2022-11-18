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
import { UserClaims } from '../../models/user-claims';

// services
import { UserService } from './user.service';
import { TeacherService } from './teacher.service';
import { IntegrativeTeacherService } from './integrative-teacher.service';



@Injectable({ providedIn: 'root' })
export class MicrosoftSignInService extends SignIn<MicrosoftSignInOptions> {

    // subscription!: Subscription;
    // userClaims: UserClaims = {
    //   isAdmin: false,
    //   isTeacher: false,
    //   integrativeTeacherId: ''
    // };

    

    constructor(
        private router: Router,
        private readonly afAuth: AngularFireAuth,
        private readonly eventLog: AngularFireAnalytics,
        private userService: UserService,
        private integrativeTeacherservice : IntegrativeTeacherService
        
    ) {
        super();
    }

    
   
  

    async signIn(options?: MicrosoftSignInOptions): Promise<void> {

        // early return since no username was provided
        if (!options?.username) {
            // CAMBIAR de lugar
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
              const additionalUserInfo = await result.additionalUserInfo;
              if (additionalUserInfo && additionalUserInfo.isNewUser) {
                // @ts-ignore
                const displayName = additionalUserInfo.profile.displayName;
                // @ts-ignore
                const email = additionalUserInfo.profile.mail;
                // @ts-ignore
                const uid = additionalUserInfo.profile.id;
                // @ts-ignore
                // tslint:disable-next-line:max-line-length
                const photoURL = 'https://ui-avatars.com/api/?background=random&name=' + additionalUserInfo?.profile.givenName.split(' ')[0] + '+' + additionalUserInfo.profile.surname.split(' ')[0];

                const newUser: IntegrativeUser = {
                  username,
                  disabled: false,
                  displayName,
                  email,
                  photoURL,
                  uid
                };

                console.log(newUser);
                
                // TODO: el usuario se debe crear cuando se carga desde upload

                

                await this.userService.userDocument(username).set(newUser);

                let isTeacher = false;

                // @ts-ignore
                if (additionalUserInfo.profile.jobTitle !== null ) {
                    isTeacher = true;
                }

                const userClaims: UserClaims = {
                    isTeacher,
                    isAdmin: false,
                    /* integrativeTeacherId: `abr22-ago22-${username}` */
                    integrativeTeacherId: `oct22-feb23-${username}`
                };
                await this.userService.claimsDocument(username).set(userClaims);
              }

              await this.router.navigate(['dashboard', 'home']);

            });
    }
}

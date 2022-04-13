import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

/**
 * Guard to protect any route, and allow access to:
 * - Administers
 * - Mentors
 */
@Injectable({ providedIn: 'root' })
export class IsTeacherGuard implements CanActivate {
  constructor(
    private readonly auth: UserService,
    private readonly router: Router
  ) { }

  canActivate({ params }: ActivatedRouteSnapshot, { url }: RouterStateSnapshot): Observable<boolean | UrlTree> {

    const validateUserIsAdmin = this.auth.claims.pipe(
      map(claims => {
        // User hasn't signed in
        if (!claims) {
          return this.router.createUrlTree(['/login'], { queryParams: { redirect: url } });
        }

        // User is admin, and can enter the route
        // User is a mentor and is the mentor is the correct one
        if (claims.isTeacher || (claims.isTeacher && claims.integrativeTeacherId === params.integrativeTeacherId)) {
          return true;
        }

        // Nop, user is not allowed to enter the route
        alert('No tienes permisos para ingresar a esta ruta, por favor vuelve a recargar la página.');
        return false;
      })
    );

    return validateUserIsAdmin;
  }
}

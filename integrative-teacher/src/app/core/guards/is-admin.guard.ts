import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

/**
 * Validate the current user has the admin claims
 */
@Injectable({ providedIn: 'root' })
export class IsAdminGuard implements CanActivate {

  constructor(
    private readonly auth: UserService,
    private readonly router: Router
  ) { }

  canActivate(_: ActivatedRouteSnapshot, { url }: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.auth.claims.pipe(
      map(claims => {
        // User hasn't signed in
        if (!claims) {
          return this.router.createUrlTree(['/login'], { queryParams: { redirect: url } });
        }

        // yep, user is an admin
        if (claims.isAdmin) {
          return true;
        }

        // user is not allowed to enter the route
        alert('No tienes permisos para ingresar a esta ruta, por favor vuelve a recargar la página.');
        return false;
      })
    );
  }

}

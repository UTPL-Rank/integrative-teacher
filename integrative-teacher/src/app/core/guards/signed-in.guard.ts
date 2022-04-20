import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

/**
 * Validate the user is signed in
 */
@Injectable({ providedIn: 'root' })
export class SignedInGuard implements CanActivate {

  constructor(
    private readonly auth: UserService,
    private readonly router: Router
  ) { }

  canActivate(_: ActivatedRouteSnapshot, { url }: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.auth.currentUser
      .pipe(
        map(user => user ? true : this.router.createUrlTree(['/login'], { queryParams: { redirect: url } }))
      );
  }
}

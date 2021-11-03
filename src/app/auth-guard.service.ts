import {  Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable() //for using another service here

export class AuthGuardService implements CanActivate {

  constructor(
    private authSrviceProp: AuthService,
    private routerProp: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authSrviceProp.isAuthenticated() //handle promis:
      .then(
        (authenticated: boolean) => {
          if (authenticated) {
            return true;
          } else { //navigate away to home:
            this.routerProp.navigate(['/']);
            return false;
          }
        }
      );
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../Shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationResponsableGuard implements CanActivate {
  constructor (private servShared: SharedService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.servShared.authResponsable();
  }
}

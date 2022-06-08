import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../Shared/shared.service';
/**
 * Guard Responsable
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationResponsableGuard implements CanActivate {
  /**
   * Constructor
   */
  constructor (private servShared: SharedService){}
  /**
   * Can Activate
   * @param route 
   * @param state 
   * @returns 
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.servShared.authResponsable();
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../Shared/shared.service';
/**
 * Guard profesor
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationProfesorGuard implements CanActivate {
  /**
   * Constructor
   * @param servShared 
   */
  constructor (private servShared: SharedService){}
  /**
   * CanActivate
   * @param route 
   * @param state 
   * @returns 
   */
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.servShared.authProfesor();
  }
  
  
}

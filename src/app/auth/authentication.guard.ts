import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../Shared/shared.service';
/**
 * Guard logeado
 */
@Injectable()
export class AuthenticationGuard implements CanActivate {
  /**
   * Constructor
   * @param serv 
   */
  constructor(private serv: SharedService) { }
  /**
   * CanActivate
   * @param route 
   * @param state 
   * @returns 
   */
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.serv.islogged();
  }

}

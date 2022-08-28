import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, 
              private router: Router){}

  canActivate(
          route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<boolean> | boolean {
      return this.authService.refresh().pipe(
        tap(isValid => {
          if(!isValid) {
            this.router.navigateByUrl('/login');
          }
        })
      );  
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean  {
      return this.authService.refresh().pipe(
        tap(isValid => {
          if(!isValid) {
            this.router.navigateByUrl('/login');
          }
        })
      );  
  }
  
}

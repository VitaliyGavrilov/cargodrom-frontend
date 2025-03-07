import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.auth.isAuthenticated();

    if (!isAuthenticated) {
      const currentState = { returnUrl: state.url };
      this.router.navigate(['/login'], { queryParams: currentState });
      // this.router.navigate(['/pages/dashboard']);
      return false;
    }
    return isAuthenticated;
  }
}


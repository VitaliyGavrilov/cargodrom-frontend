import { AuthService } from './auth/services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(e => {
      if (e.status === 401) {
        const currentState = { returnUrl: this.router.url };
        this.auth.logout().subscribe(
          () => this.router.navigate(['/login'], { queryParams: currentState })
        );
      }
      else if (e.status === 403) {
        const currentState = { returnUrl: this.router.url };
        this.auth.logout().subscribe(
          () => this.router.navigate(['/dashboard'], { queryParams: currentState })
        );
      }
      else {
      }
      throw e;
    }));
  }
}

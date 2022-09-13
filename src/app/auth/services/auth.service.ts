import { TokenInfo } from './../../api/custom_models/token-info';
import { UserService } from './../../api/services/user.service';
import { map, Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';

const TOKEN_INFO_KEY = 'com.cargodrom.token-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenInfo?: TokenInfo;
  readonly storage = window.sessionStorage;

  constructor(
    private userService: UserService
  ) {
    this.loadTokenFromStorage();
  }

  login(login: string, password: string): Observable<void> {
    return this.userService.userLogin({ body: { login, password } })
      .pipe(
        tap(res => this.tokenInfo = res),
        tap(() => this.saveTokenToStorage()),
        map(() => undefined)
      );
  }

  isAuthenticated(): boolean {
    return typeof this.tokenInfo?.token !== 'undefined';
  }

  logout(): Observable<void> {
    this.tokenInfo = undefined;
    this.removeTokenFromLocalStorage();
    return of(undefined);
  }

  getToken(): string | undefined {
    return this.tokenInfo?.token;
  }

  private loadTokenFromStorage(): void {
    const tokenInfoString = this.storage.getItem(TOKEN_INFO_KEY);
    if (!tokenInfoString) {
      return;
    }
    try {
      const tokenInfo = JSON.parse(tokenInfoString);
      if (tokenInfo) {
        this.tokenInfo = tokenInfo;
      }
    } catch (e) {
      console.log(`unable to load token from local storage`, e);
    }
  }

  private saveTokenToStorage(): void {
    this.storage.setItem(TOKEN_INFO_KEY, JSON.stringify(this.tokenInfo));
  }

  private removeTokenFromLocalStorage(): void {
    this.storage.removeItem(TOKEN_INFO_KEY);
  }

  isTokenExpired(): boolean {
    if (this.tokenInfo?.token_expire) {
      try {
        const expireDate = new Date(this.tokenInfo?.token_expire);
        const now = new Date();
        return (expireDate.getTime() - now.getTime()) < 10000;
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  refreshToken(): Observable<void> {
    const body = { refresh_token: this.tokenInfo!.refresh_token };
    return this.userService.userUpdateToken({body}).pipe(
      tap(res => this.tokenInfo = res as TokenInfo),
      tap(() => this.saveTokenToStorage()),
      map(() => undefined)
    );
  }

}

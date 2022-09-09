import { Injectable } from '@angular/core';
import {map, Observable, tap} from "rxjs";
import {UserService} from "../../api/services/user.service";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public userId:number|undefined;

  constructor(
    private userService: UserService
  ) { }

  save( body: { password: string; password_confirm: string; phone: string; inn: string; company: string; fio: string; email: string  }): Observable<void> {
    return this.userService.userCreate( body )
      .pipe(
        tap(res => res),
        map(() => undefined)
      );
  }


}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PopupService} from "../../../material/services/popup.service";
import {finalize, tap} from "rxjs";
import {RegisterService} from "../../services/register.service";
import { UserService } from 'src/app/api/services';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})

export class ConfirmComponent implements OnInit {

  checkForm: FormGroup;
  uid!: string;
  id?: number;
  loading = false;

  remainingTime: number = 120; // 2 минуты
  timer: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public popup: PopupService,
    private register: RegisterService,
    private userService: UserService,
  ) {
    this.checkForm = this.fb.group({
      code: ['', [Validators.required] ],
    });
  }

  ngOnInit(): void {
    this.uid = this.route.snapshot.params['uid'];
    if (!this.uid) {
      this.router.navigate(['/register']);
    }

    this.startTimer();
  }
  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  restartTimer() {
    // Сбросить оставшееся время и перезапустить таймер
    this.remainingTime = 120; // 2 минуты
    clearInterval(this.timer); // остановить старый таймер
    this.startTimer(); // начать новый таймер
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  onSubmitCode() {
    if (this.remainingTime > 0) {
      alert("Код отправлен!");
    } else {
      alert("Время истекло!");
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  doCheck(){
    if ( !this.checkForm.valid ) {
      let err = {
        'error': {
          'error_message': 'Все поля обязательны к заполнению'
        }
      }
      this.popup.error(err);
      return;
    }

    this.loading = true;
    const uid = this.uid!;
    const code = this.checkForm.controls['code'].value;

    this.register.confirm( { uid, code } )
      .pipe(
        finalize(() => this.loading = false)
      ).subscribe({
      next: ( id ) => this.processResult(id),
      error: err => this.popup.error(err)
    });
  }

  processResult( id:number ): void {
    this.id = id; // вдруг пригодится потом
    this.router.navigate(['/login']);
  }

  reSendCode(){
    this.userService.userSendCode({body:{uid:this.uid}})
    .pipe(
      tap((data) => {}),
    )
    .subscribe({
      next: (data:any) => {
        this.restartTimer();
      },
      error: (err) => {}
    });
  }

}

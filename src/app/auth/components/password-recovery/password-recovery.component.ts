import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, Subject, takeUntil, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {PopupService} from "../../../material/services/popup.service";
import { UserService } from 'src/app/api/services';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 3000 };

  private _destroy$ = new Subject();

  getCodeForm: FormGroup;
  resetPasswordForm: FormGroup;

  loading = false;

  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    public popup: PopupService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {
    this.getCodeForm = this.fb.group({
      login: ['', [Validators.required]],
    });
    this.resetPasswordForm = this.fb.group({
      login: ['', [Validators.required]],
      uid: ['', [Validators.required]],
      code: ['', Validators.required],
      password: ['', [Validators.required]],
      confirm_password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }
  
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  getCode(){
    this.userService.userSendResetCode({body:this.getCodeForm.value})
    .pipe(
      tap((services)=>{}),
      takeUntil(this._destroy$),
    )
    .subscribe({
      next: (e) => {
        this.snackBar.open(
          `Код отправлен на вашу почту`,
          undefined,
          this.snackBarWithShortDuration
        );
        this.resetPasswordForm.patchValue({
          login: this.getCodeForm.value.login,
          uid: e.uid,
          // code: event.CODE.toString(),
        });
      },
      error: (err) => {
        this.snackBar.open(
          `Ошибка отправки проверочного кода: ` + err.error.error_message,
          undefined,
          this.snackBarWithShortDuration
        );
      }
    });
    
    // .subscribe((event: any) => {
    //   console.log(event);
    //   this.resetPasswordForm.patchValue({
    //     login: this.getCodeForm.value.login,
    //     uid: event.uid,
    //     // code: event.CODE.toString(),
    //   })
    // });
    
  }

  onResetPassword(){
    // this.resetPasswordForm.patchValue({
    //   code: this.resetPasswordForm.value.code.toString()
    // })
    this.userService.userResetPassword({body:this.resetPasswordForm.value})
    .pipe(
      tap((services)=>{}),
      takeUntil(this._destroy$),
    )
    .subscribe({
      next: (e) => {
        this.snackBar.open(
          `Пароль успешно изменен`,
          undefined,
          this.snackBarWithShortDuration
        );
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.snackBar.open(
          `Ошибка изменения пароля: ` + err.error.error_message,
          undefined,
          this.snackBarWithShortDuration
        );
      }
    });
    
  }

}

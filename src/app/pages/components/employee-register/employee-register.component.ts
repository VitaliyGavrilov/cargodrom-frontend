import { emailValidator, innValidator } from './../../../validators';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {PopupDialogData} from "../../../material/components/popup-dialog/popup-dialog-data";
import {PopupDialogComponent} from "../../../material/components/popup-dialog/popup-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import {PopupService} from "../../../material/services/popup.service";
import {finalize, Subject, takeUntil, tap} from "rxjs";
import { UserService } from 'src/app/api/services';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})

export class EmployeeRegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  errorMessage?: string;
  uid!: string;
  private _destroy$ = new Subject();
  hasOldPassword?:boolean=false;
  isEditMode=true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public popup: PopupService,
    public dialog: MatDialog,
    private userSevrice: UserService,
    private route: ActivatedRoute,
  ) {
    this.registerForm = this.fb.group({
      uid: [,[]],
      login: ['', []],
      old_password: ['', []],
      password: ['', [Validators.required] ],
      password_confirm: ['', [Validators.required] ],
    });
  }

  ngOnInit(): void {
    const segments = this.route.snapshot.url.map(s => s.path);
    this.uid=segments[1];
    this.registerForm.patchValue({
      uid: this.uid,
    });
    this.isEditMode = segments[0]==='employee_register' ? false : true;
    if(this.isEditMode){
      this.getUserData();
    }
  }
  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  doRegister() {
    console.log(this.registerForm);
    console.log(this.registerForm.valid);

    let error_message: string[] = [];

    // if ( this._email?.errors?.['email'] ) {
    //   error_message.push('E-mail введен не верно');
    // }

    // if ( this._inn?.errors?.['inn']  ) {
    //   error_message.push('ИНН введен не верно');
    // }

    if( error_message.length > 0 ){
      let err = {
        'error': {
          'error_message': error_message
        }
      }
      this.popup.error(err);
      return;
    }

    this.loading = true;

    this.registerUser();

    // this.register.save( { this.registerForm.value } )
    //   .pipe(
    //     finalize(() => this.loading = false)
    //   ).subscribe({
    //   next: ( uid ) => this.processConfirm(uid),
    //   error: err => this.popup.error(err)
    // });
  }

  processConfirm( uid:string ): void {
    this.router.navigate(['/confirm/'+uid]);
  }

  getUserData(){
    this.userSevrice.userInviteData({body:{uid:this.uid}})
      .pipe(
        tap((data)=> this.hasOldPassword=data.has_old_password),
        takeUntil(this._destroy$))
      .subscribe({
        next: (data:any) => {
          console.log(data);
          this.registerForm.patchValue({
            login: data.login,
          });
        },
        error: (err) => {}
      });
  }

  registerUser(){
    const body=this.registerForm.value;
    this.userSevrice.userRegisterInvite({body})
      .pipe(
        tap((data) => {}),
        takeUntil(this._destroy$))
      .subscribe({
        next: (data:any) => {
        },
        error: (err) => {}
      });
  }

}

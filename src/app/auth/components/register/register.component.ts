import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RegisterService} from "../../services/register.service";
import {PopupDialogData} from "../../../material/components/popup-dialog/popup-dialog-data";
import {PopupDialogComponent} from "../../../material/components/popup-dialog/popup-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {PopupService} from "../../../material/services/popup.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  errorMessage?: string;
  uid?: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private register: RegisterService,
    public popup: PopupService,
    public dialog: MatDialog
  ) {
    this.registerForm = this.fb.group({
      company: ['', [Validators.required] ],
      fio: ['', [Validators.required] ],
      phone: ['', [Validators.required] ],
      inn: ['', [Validators.required, Validators.pattern('/([0-9]{10,12})/') ] ],
      email: ['', [Validators.required, Validators.email] ],
      password: ['', [Validators.required] ],
      password_confirm: ['', [Validators.required] ],
    });

  }

  ngOnInit(): void {
  }

  get _email() {
    return this.registerForm.get('email')
  }
  get _inn() {
    return this.registerForm.get('inn')
  }

  doRegister() {

    if (this.registerForm.valid) {
      let err = {
        'error': {
          'error_message': 'Все поля обязательны к заполнению'
        }
      }
      this.popup.error(err);
      return;
    }

    let error_message = [];

    if ( this._email?.errors?.['email'] ) {
      error_message.push('E-mail введен не верно');
    }
    if ( this._inn?.errors?.['pattern'] ) {
      error_message.push('ИНН введен не верно');
    }

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
    const company = this.registerForm.controls['company'].value;
    const fio = this.registerForm.controls['fio'].value;
    const phone = this.registerForm.controls['phone'].value;
    const inn = this.registerForm.controls['inn'].value;
    const email = this.registerForm.controls['email'].value;
    const password = this.registerForm.controls['password'].value;
    const password_confirm = this.registerForm.controls['password_confirm'].value;

    this.register.save( { company, fio, phone, inn, email, password, password_confirm } )
      .pipe(
        finalize(() => this.loading = false)
      ).subscribe({
      next: ({ uid }) => this.processConfirm(uid),
      error: err => this.popup.error(err)
    });
  }

  processConfirm( uid:string ): void {
    this.router.navigate(['/confirm/'+uid]);
  }


}

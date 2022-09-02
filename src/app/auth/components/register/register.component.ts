import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {RegisterService} from "../../services/register.service";
import {PopupDialogData} from "../../../material/components/popup-dialog/popup-dialog-data";
import {PopupDialogComponent} from "../../../material/components/popup-dialog/popup-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {PopupService} from "../../../material/services/popup.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  errorMessage?: string;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private register: RegisterService,
    public popup: PopupService,
    public dialog: MatDialog
  ) {
    this.registerForm = this.fb.group({
      company: ['', [Validators.required] ],
      fio: ['', [Validators.required] ],
      phone: ['', [Validators.required] ],
      inn: ['', [Validators.required,
        Validators.pattern('/([0-9]{10,12})/') ] ],
      email: ['', [Validators.required, Validators.email] ],
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

    //console.log( this.registerForm.value );

    let error_message = [];
    error_message.push('ИНН введен не верно');
    error_message.push('E-mail  <b>введен</b> не верно');
    error_message.push('Просто проверка');

    if( error_message.length > 0 ){
      let err = {
        'error': {
          'error_message': error_message
        }
      }
      this.popup.error(err);
      return;
    }


    if ( this._email?.errors?.['email'] ) {
      let err = {
        'error': {
          'error_message': 'E-mail введен не верно'
        }
      }
      this.popup.error(err);
      return;
    }

    if (!this.registerForm.valid) {
      let err = {
        'error': {
          'error_message': 'Все поля обязательны к заполнению'
        }
      }
      this.popup.error(err);
      return;
    }

    this.register.userId = 1000;

  }


}

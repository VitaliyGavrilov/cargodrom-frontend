import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {PopupService} from "../../../material/services/popup.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    public popup: PopupService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  doLogin() {
    console.log(this.loginForm.valid)
    if (!this.loginForm.valid) {
      let err = {
        'error': {
          'error_message': 'Не заполнены обязательные поля'
        }
      }
      this.popup.error(err);
      return;
    }
    this.loading = true;
    const login = this.loginForm.controls['login'].value;
    const password = this.loginForm.controls['password'].value;
    this.auth.login(login, password)
      .pipe(
        finalize(() => this.loading = false)
      ).subscribe({
        next: () => this.processLogin(),
        error: err => this.popup.error(err)
      });
  }

  processLogin(): void {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'];
    if (returnUrl) {
      this.router.navigateByUrl(returnUrl);
    } else {
      this.router.navigate(['/pages']);
    }
  }

}

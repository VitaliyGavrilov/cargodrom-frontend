import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PopupService} from "../../../material/services/popup.service";
import {finalize} from "rxjs";
import {RegisterService} from "../../services/register.service";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})

export class ConfirmComponent implements OnInit {

  checkForm: FormGroup;
  uid?: string;
  id?: number;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public popup: PopupService,
    private register: RegisterService,

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

}

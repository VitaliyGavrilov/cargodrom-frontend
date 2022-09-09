import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})

export class ConfirmComponent implements OnInit {

  checkForm: FormGroup;
  uid?: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.checkForm = this.fb.group({
      uid: ['', [Validators.required] ],
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

  }
}

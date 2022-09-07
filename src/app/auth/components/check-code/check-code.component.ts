import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-check-code',
  templateUrl: './check-code.component.html',
  styleUrls: ['./check-code.component.scss']
})
export class CheckCodeComponent implements OnInit {

  checkForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.checkForm = this.fb.group({
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

  doCheck(){

  }

}

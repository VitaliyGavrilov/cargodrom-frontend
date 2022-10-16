import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personal-settings',
  templateUrl: './personal-settings.component.html',
  styleUrls: ['./personal-settings.component.scss']
})
export class PersonalSettingsComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.form = fb.group({
      fio: [''],
      email: [''],
      phone: [''],
    });
   }

  ngOnInit(): void {
    this.loadPersonalSettings();
  }
  
  loadPersonalSettings() {
    this.sorry();
  }
  
  save(): void {
    this.sorry();
  }

  private sorry() {
    this.snackBar.open(`Sorry, No API for personal settings implemented yet`);
  }
}

import { PopupService } from './../../../material/services/popup.service';
import { RegisterService } from './../../services/register.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from './../../../material/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmComponent } from './confirm.component';

describe('ConfirmComponent', () => {
  let component: ConfirmComponent;
  let fixture: ComponentFixture<ConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterTestingModule,
      ],
      providers: [
        {provide: PopupService, useValue: {}},
        {provide: RegisterService, useValue: {}},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

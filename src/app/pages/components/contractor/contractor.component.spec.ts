import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../../material/material.module';
import { ContactEditorComponent } from './../contact-editor/contact-editor.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ContractorFilterComponent } from '../contractor-filter/contractor-filter.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from '../paginator/paginator.component';

import { ContractorComponent } from './contractor.component';

describe('ContractorComponent', () => {
  let component: ContractorComponent;
  let fixture: ComponentFixture<ContractorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      declarations: [
        ContractorComponent,
        PaginatorComponent,
        ContractorFilterComponent,
        ContactEditorComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

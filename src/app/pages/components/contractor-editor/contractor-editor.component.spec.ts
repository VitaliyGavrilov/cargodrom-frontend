import { CompanyService } from 'src/app/api/services/company.service';
import { MaterialModule } from './../../../material/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingComponent } from '../rating/rating.component';

import { ContractorEditorComponent } from './contractor-editor.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, Observable } from 'rxjs';
import { TaxSystem } from 'src/app/api/custom_models';

describe('ContractorEditorComponent', () => {
  let component: ContractorEditorComponent;
  let fixture: ComponentFixture<ContractorEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatSnackBar, useValue: {} },
        {
          provide: CompanyService, useValue: <CompanyService>{
            companyTaxSystem: () => of([]) as Observable<any>
          }
        },
      ],
      declarations: [ContractorEditorComponent, RatingComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContractorEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@cargodrom/material/material.module';
import { of } from 'rxjs';
import { CompanyService } from './../../../../../api/services/company.service';

import { DepartmentEditorComponent } from './department-editor.component';

describe('DepartmentEditorComponent', () => {
  let component: DepartmentEditorComponent;
  let fixture: ComponentFixture<DepartmentEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentEditorComponent],
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: CompanyService, useValue: {
            companyDepartmentList: () => of([])
          }
        },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DepartmentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

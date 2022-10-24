import { NgxMaskModule } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@cargodrom/material/material.module';
import { of } from 'rxjs';
import { CompanyService } from 'src/app/api/services/company.service';

import { EmployeeEditorComponent } from './employee-editor.component';

describe('EmployeeEditorComponent', () => {
  let component: EmployeeEditorComponent;
  let fixture: ComponentFixture<EmployeeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeEditorComponent],
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        NgxMaskModule.forRoot({}),
      ],
      providers: [
        {
          provide: CompanyService, useValue: {
            companyDepartmentList: () => of({items: [], total: 0}),
            companyPositionList: () => of({items: [], total: 0}),
            companyList: () => of({items: [], total: 0}),
            companyEmployeeInfo: () => of({name_f: 'Last', name_i: 'First', name_o: 'Middle'})
          }
        },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EmployeeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

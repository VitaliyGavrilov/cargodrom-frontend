import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { CompanyService } from 'src/app/api/services/company.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentEmployeeComponent } from './department-employee.component';

describe('DepartmentEmployeeComponent', () => {
  let component: DepartmentEmployeeComponent;
  let fixture: ComponentFixture<DepartmentEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentEmployeeComponent],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: MatDialog, useValue: {} },
        {
          provide: CompanyService, useValue: {
            companyPositionList: () => of([]),
            companyEmployeeList: () => of([]),
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DepartmentEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

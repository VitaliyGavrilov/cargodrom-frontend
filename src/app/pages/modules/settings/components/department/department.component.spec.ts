import { RouterTestingModule } from '@angular/router/testing';
import { CompanyService } from './../../../../../api/services/company.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentComponent } from './department.component';
import { of } from 'rxjs';
import { MaterialModule } from '@cargodrom/material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DepartmentComponent', () => {
  let component: DepartmentComponent;
  let fixture: ComponentFixture<DepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentComponent],
      providers: [
        {
          provide: CompanyService,
          useValue: {
            companyDepartmentList: () => of({items: [], total: 0}),
            companyEmployeeList: () => of({items: [], total: 0}),
          }
        }
      ],
      imports: [
        RouterTestingModule,
        MaterialModule,
        NoopAnimationsModule,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

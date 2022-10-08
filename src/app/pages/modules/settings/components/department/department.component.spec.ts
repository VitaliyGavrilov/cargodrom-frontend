import { CompanyService } from './../../../../../api/services/company.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentComponent } from './department.component';
import { of } from 'rxjs';

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
            companyDepartmentList: () => of({})
          }
        }
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

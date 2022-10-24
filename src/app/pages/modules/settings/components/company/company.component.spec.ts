import { Company } from './../../../../../api/custom_models/company';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@cargodrom/material/material.module';
import { Observable, of } from 'rxjs';
import { CompanyService } from 'src/app/api/services/company.service';

import { CompanyComponent } from './company.component';

describe('CompanyComponent', () => {
  let component: CompanyComponent;
  let fixture: ComponentFixture<CompanyComponent>;
  const name = 'Company Name';
  let tableBody: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyComponent],
      imports: [
        MaterialModule,
        RouterTestingModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot({}),
      ],
      providers: [
        {
          provide: CompanyService,
          useValue: {
            companyList: () => of({items: [{name} as Company], total: 1}),
            companyEmployeeList: () => of({items: [], total: 0}),
          }
        },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompanyComponent);
    component = fixture.componentInstance;
    tableBody = fixture.nativeElement.querySelector('tbody');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should show company name', () => {
    expect(tableBody.textContent).toContain(name);
  });
});

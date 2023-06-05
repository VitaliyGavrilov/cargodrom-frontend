import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFilterComponent } from './client-filter.component';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { CustomerService } from 'src/app/api/services';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ClientFilterComponent', () => {
  let component: ClientFilterComponent;
  let fixture: ComponentFixture<ClientFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        NoopAnimationsModule,
      ],
      declarations: [ClientFilterComponent],
      providers: [
        {
          provide: CountryService, useValue: <Partial<CountryService>>{
            getCountries: () => of([]),
          }
        },
        {
          provide: CustomerService, useValue: <Partial<CustomerService>>{
            customerGroupList: () => of([]),
          }
        },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClientFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
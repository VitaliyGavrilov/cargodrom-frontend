import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEditorComponent } from './client-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CompanyService, CustomerService, FileService, SystemService } from 'src/app/api/services';
import { of } from 'rxjs';
import { EditorHeaderMockup } from '@cargodrom/material/components/editor-header/editor-header.mockup';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesComponent } from '../services/services.component';
import { NgxMaskModule } from 'ngx-mask';
import { FileListComponent } from '../file-list/file-list.component';

describe('ClientEditorComponent', () => {
  let component: ClientEditorComponent;
  let fixture: ComponentFixture<ClientEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatSelectModule,
        NoopAnimationsModule,
        NgxMaskModule.forRoot(),
      ],
      declarations: [ClientEditorComponent, EditorHeaderMockup, ServicesComponent, FileListComponent],
      providers: [
        { provide: MatSnackBar, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: SystemService, useValue: {} },
        {
          provide: CustomerService, useValue: <Partial<CustomerService>>{
            customerInfo: () => of({ id: 1, name: 'hello' }),
            customerGroupList: () => of([]),
          }
        },
        {
          provide: CityService, useValue: <Partial<CityService>>{
            getCities: () => of([{ id: 1, name: 'hello' }])
          }
        },
        {
          provide: CountryService, useValue: <Partial<CountryService>>{
            getCountries: () => of([{ id: 1, name: 'Страна' }])
          }
        },
        {
          provide: SystemService, useValue: <Partial<SystemService>>{
            systemHeadPosition: () => of([]),
            systemBusiness: () => of([]),
            systemInteraction: () => of([]),
            systemContactSource: () => of([]),
            systemCustomerStatus: () => of([]),
            systemCounterparty: () => of(),
            systemServices: () => of(),
            systemCurrency: () => of(),
          }
        },
        {
          provide: CompanyService, useValue: <Partial<CompanyService>>{
            companyEmployeeList: () => of([]),
          }
        },
        {
          provide: FileService, useValue: <Partial<FileService>>{
          }
        },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClientEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

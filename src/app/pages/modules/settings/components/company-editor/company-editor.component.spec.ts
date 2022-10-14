import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@cargodrom/material/material.module';
import { of } from 'rxjs';
import { CompanyService } from 'src/app/api/services/company.service';

import { CompanyEditorComponent } from './company-editor.component';

describe('CompanyEditorComponent', () => {
  let component: CompanyEditorComponent;
  let fixture: ComponentFixture<CompanyEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyEditorComponent ],
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
            companyInfo: () => of({name: 'Three Bears LLC'})
          }
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

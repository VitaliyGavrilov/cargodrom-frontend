import { CompanyService } from 'src/app/api/services/company.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@cargodrom/material/material.module';
import { of } from 'rxjs';

import { PositionEditorComponent } from './position-editor.component';

describe('PositionEditorComponent', () => {
  let component: PositionEditorComponent;
  let fixture: ComponentFixture<PositionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionEditorComponent ],
      imports: [
        MaterialModule,
        RouterTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: CompanyService, useValue: {
            companyPositionList: () => of([])
          }
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

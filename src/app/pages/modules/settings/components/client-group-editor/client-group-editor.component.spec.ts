import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGroupEditorComponent } from './client-group-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyService, SystemService } from 'src/app/api/services';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorHeaderMockup } from '@cargodrom/material/components/editor-header/editor-header.mockup';
import { RouterTestingModule } from '@angular/router/testing';
import { NEVER } from 'rxjs';

describe('ClientGroupEditorComponent', () => {
  let component: ClientGroupEditorComponent;
  let fixture: ComponentFixture<ClientGroupEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      declarations: [ClientGroupEditorComponent, EditorHeaderMockup],
      providers: [
        { provide: MatSnackBar, useValue: {} },
        {
          provide: CompanyService, useValue: {
            companyPositionInfo: () => NEVER,
          }
        },
        { provide: SystemService, useValue: {} },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClientGroupEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

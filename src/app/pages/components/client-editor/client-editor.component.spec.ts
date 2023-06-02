import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEditorComponent } from './client-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService, SystemService } from 'src/app/api/services';
import { of } from 'rxjs';
import { EditorHeaderMockup } from '@cargodrom/material/components/editor-header/editor-header.mockup';

describe('ClientEditorComponent', () => {
  let component: ClientEditorComponent;
  let fixture: ComponentFixture<ClientEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      declarations: [ClientEditorComponent, EditorHeaderMockup],
      providers: [
        { provide: MatSnackBar, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: SystemService, useValue: {} },
        {
          provide: CustomerService, useValue: <Partial<CustomerService>>{
            customerInfo: () => of({ id: 1, name: 'hello' })
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

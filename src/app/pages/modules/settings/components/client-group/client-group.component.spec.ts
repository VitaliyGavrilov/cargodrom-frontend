import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGroupComponent } from './client-group.component';
import { CompanyService, CustomerService } from 'src/app/api/services';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NEVER } from 'rxjs';
import { PaginatorMockup } from '@cargodrom/material/components/paginator/paginator.mockup';

describe('ClientGroupComponent', () => {
  let component: ClientGroupComponent;
  let fixture: ComponentFixture<ClientGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientGroupComponent, PaginatorMockup],
      providers: [
        { provide: CompanyService, useValue: {} },
        { provide: CustomerService, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: MatSnackBar, useValue: {} },
        { provide: Router, useValue: {} },
        {
          provide: ActivatedRoute, useValue: <Partial<ActivatedRoute>>{
            queryParamMap: NEVER
          }
        },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClientGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

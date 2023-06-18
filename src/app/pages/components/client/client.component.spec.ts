import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientComponent } from './client.component';
import { CustomerService } from 'src/app/api/services';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaginatorMockup } from '@cargodrom/material/components/paginator/paginator.mockup';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule } from '@angular/material/table';
import { FilterModule } from 'src/app/filter/filter.module';

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatTableModule,
        FilterModule,
      ],
      declarations: [ClientComponent, PaginatorMockup],
      providers: [
        {
          provide: CustomerService, useValue: <Partial<CustomerService>>{
            customerList: () => of({})
          }
        },
        { provide: MatDialog, useValue: {} },
        { provide: MatSnackBar, useValue: {} },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

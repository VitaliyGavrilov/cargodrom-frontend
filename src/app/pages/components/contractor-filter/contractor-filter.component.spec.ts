import { MaterialModule } from './../../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorFilterComponent } from './contractor-filter.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DirectionService } from '../../../api/services/direction.service';
import { of } from 'rxjs';

describe('ContractorFilterComponent', () => {
  let component: ContractorFilterComponent;
  let fixture: ComponentFixture<ContractorFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule
      ],
      providers: [
        {
        provide: DirectionService,
        useValue: {
          directionCountry: () => of([])
        }
      }
    ],
    declarations: [ContractorFilterComponent]
    })
  .compileComponents();

fixture = TestBed.createComponent(ContractorFilterComponent);
component = fixture.componentInstance;
fixture.detectChanges();
  });

it('should create', () => {
  expect(component).toBeTruthy();
});
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibilityMatrixComponent } from './responsibility-matrix.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('ResponsibilityMatrixComponent', () => {
  let component: ResponsibilityMatrixComponent;
  let fixture: ComponentFixture<ResponsibilityMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatAutocompleteModule,
      ],
      declarations: [ ResponsibilityMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsibilityMatrixComponent);
    component = fixture.componentInstance;
    component.homeCountry = {
      id: 1,
      name: 'Страна',
      name_from: 'Страны',
      name_to: 'Страну',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

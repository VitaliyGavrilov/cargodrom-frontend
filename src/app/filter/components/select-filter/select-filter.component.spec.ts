import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFilterComponent } from './select-filter.component';
import { FilterSelectControl } from 'src/app/api/custom_models';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SelectFilterComponent', () => {
  let component: SelectFilterComponent;
  let fixture: ComponentFixture<SelectFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSelectModule, MatFormFieldModule, NoopAnimationsModule],
      declarations: [ SelectFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectFilterComponent);
    component = fixture.componentInstance;
    component.filterControl = {
      field: 'ababa',
      name: 'ana',
      form: 'select',
      array: [
        { id: 1, name: 'ananana' }
      ]
    } as FilterSelectControl;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

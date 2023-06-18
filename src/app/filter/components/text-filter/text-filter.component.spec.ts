import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFilterComponent } from './text-filter.component';
import { FilterService } from '../../services/filter.service';
import { FilterTextControl } from 'src/app/api/custom_models';
import { FormsModule } from '@angular/forms';

describe('TextFilterComponent', () => {
  let component: TextFilterComponent;
  let fixture: ComponentFixture<TextFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ TextFilterComponent ],
      providers: [FilterService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextFilterComponent);
    component = fixture.componentInstance;
    component.filterControl = <FilterTextControl> {
      field: 'a',
      name: 'Имя',
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

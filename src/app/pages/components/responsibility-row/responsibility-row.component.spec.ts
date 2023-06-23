import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibilityRowComponent } from './responsibility-row.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('ResponsibilityRowComponent', () => {
  let component: ResponsibilityRowComponent;
  let fixture: ComponentFixture<ResponsibilityRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCheckboxModule,
      ],
      declarations: [ ResponsibilityRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsibilityRowComponent);
    component = fixture.componentInstance;
    component.homeCountry = {
      id: 1,
      name: 'Страна',
      name_from: 'Страны',
      name_to: 'Страну',
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

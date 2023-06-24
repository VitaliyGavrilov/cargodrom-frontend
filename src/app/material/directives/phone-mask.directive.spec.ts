import { Component } from '@angular/core';
import { PhoneMaskDirective } from './phone-mask.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  selector: 'test',
  template: `<input type="text" appPhoneMask>`
}) class DummyComponent {
  
}

describe('PhoneMaskDirective', () => {
  let component: DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummyComponent, PhoneMaskDirective ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

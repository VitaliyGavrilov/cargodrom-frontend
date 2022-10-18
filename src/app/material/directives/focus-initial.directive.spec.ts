import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FocusInitialDirective } from './focus-initial.directive';

@Component({
  selector: 'test',
  template: `<input type="text" appFocusInitial>`
}) class DummyComponent {
  
}

describe('FocusInitialDirective', () => {
  let component: DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummyComponent, FocusInitialDirective ]
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


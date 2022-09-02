import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PopupDialogComponent } from './popup-dialog.component';

describe('ErrorDialogComponent', () => {
  let component: PopupDialogComponent;
  let fixture: ComponentFixture<PopupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        }
      ],
      declarations: [PopupDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PopupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

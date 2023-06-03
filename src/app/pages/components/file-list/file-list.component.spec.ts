import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListComponent } from './file-list.component';
import { MatDialog } from '@angular/material/dialog';

describe('FileListComponent', () => {
  let component: FileListComponent;
  let fixture: ComponentFixture<FileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileListComponent],
      providers: [
        { provide: MatDialog, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

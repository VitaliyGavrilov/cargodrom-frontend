// base-component.ts
import { Directive, OnDestroy } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Directive()
export abstract class BaseComponent implements OnDestroy {
  protected destroy$ = new Subject<void>();

  snackBarWithShortDuration: MatSnackBarConfig = { duration: 2000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 4000 };
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
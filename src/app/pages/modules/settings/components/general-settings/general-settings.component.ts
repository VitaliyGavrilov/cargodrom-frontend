// add-popup.component.ts
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SettingsService, SystemService } from 'src/app/api/services';
import { MySettingsService } from 'src/app/pages/services/mySetting.service';
import { FilterListComponent } from '../filter-list/filter-list.component';
import { CurrencyService } from 'src/app/pages/services/сurrency/currency.service';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
})
export class GeneralSettingsComponent implements OnInit, OnDestroy {
  form: FormGroup;

  language: any[] = [];
  currency: any[] = [];
  timezone: any[] = [];

  snackBarWithShortDuration: MatSnackBarConfig = { duration: 2000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 4000 };

  private _destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private settingsSertvice: SettingsService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private mySettingService: MySettingsService,
    private router: Router,
    private systemService: SystemService,
    private currencyService: CurrencyService,
  ) {
    this.form = this.fb.group({
      lang: [, [Validators.required]],
      timezone: [, [Validators.required]],
      currency_1: [, [Validators.required]],
      currency_2: [, [Validators.required]],
      currency_3: [, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this.getSettings();
    this.initCurrencySubscription();
  }

  private initCurrencySubscription(): void {
    this.currencyService.currencies$
      .pipe(takeUntil(this._destroy$))
      .subscribe(currencies => {
        this.currency = currencies;
        // Если нужно обновить форму после получения валют
        // this.updateFormWithCurrencies();
      });
  }

  private getSettings() {
    this.settingsSertvice.settingsGet()
      .pipe(
        takeUntil(this._destroy$)
      ).subscribe({
        next: (data) => {
          if (data.language) this.language = data.language;
          if (data.timezone_list) this.timezone = data.timezone_list;
          this.form.patchValue(data);
          console.log(data);
        },
        error: (err) => {
          this.snackBar.open(`Ошибка получения настроек: ${err}`, undefined, this.snackBarWithShortDuration);
        },
      });
  }

  onSubmit() {
    this.postSettings();
  }

  private postSettings() {
    this.settingsSertvice.settingsUpdate({ body: this.form.value })
      .pipe(
        takeUntil(this._destroy$)
      ).subscribe({
        next: (data) => {
          this.snackBar.open(`Настройки сохранены`, undefined, this.snackBarWithShortDuration);
        },
        error: (err) => {
          this.snackBar.open(`Ошибка получения массивов для селекторов формы: ${err}`, undefined, this.snackBarWithShortDuration);
        },
      });
  }
}
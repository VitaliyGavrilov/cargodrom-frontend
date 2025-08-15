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

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
})
export class NotificationsComponent  implements OnInit, OnDestroy  {
  form: FormGroup;

  events:any[]=[];
  types:any[]=[];

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
  ) {
    this.form = this.fb.group({
      notify_type: [[], [Validators.required]],
      notify_event: [[] , [Validators.required]],
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
  ngOnInit(): void {
    // this.getCurrency();
    this.getSettings();
  }

  onSubmit(){
    this.postSettings();
  }

  private getSettings(){
    this.settingsSertvice.settingsGet()
    .pipe(
      takeUntil(this._destroy$)
    ).subscribe({
      next: (data) => {
        if(data.notify_events_list)this.events=data.notify_events_list;
        if(data.notify_types_list)this.types=data.notify_types_list;
        this.form.patchValue(data);
        console.log(data);
      },
      error: (err) => {
        this.snackBar.open(`Ошибка получения настроек: ${{err}}`, undefined, this.snackBarWithShortDuration);
      },
    });
  }
  private postSettings(){
    this.settingsSertvice.settingsUpdate({body:this.form.value})
    .pipe(
      takeUntil(this._destroy$)
    ).subscribe({
      next: (data) => {
        this.snackBar.open(`Настройки сохраннены`, undefined, this.snackBarWithShortDuration);
      },
      error: (err) => {
        this.snackBar.open(`Ошибка получения массивов для селекторов формы: ${{err}}`, undefined, this.snackBarWithShortDuration);
      },
    });
  }

    // Методы для управления чекбоксами
  onEventChange(event: any, id: number) {
    const eventsArray = this.form.get('notify_event')?.value as number[];
    if (event.checked) {
      // Добавляем id, если его нет в массиве
      if (!eventsArray.includes(id)) {
        this.form.get('notify_event')?.setValue([...eventsArray, id]);
      }
    } else {
      // Удаляем id из массива
      this.form.get('notify_event')?.setValue(eventsArray.filter(item => item !== id));
    }
  }
  onTypeChange(event: any, id: number) {
    const typesArray = this.form.get('notify_type')?.value as number[];
    if (event.checked) {
      // Добавляем id, если его нет в массиве
      if (!typesArray.includes(id)) {
        this.form.get('notify_type')?.setValue([...typesArray, id]);
      }
    } else {
      // Удаляем id из массива
      this.form.get('notify_type')?.setValue(typesArray.filter(item => item !== id));
    }
  }

  // Проверка, выбран ли чекбокс
  isEventSelected(id: number): boolean {
    return this.form.get('notify_event')?.value.includes(id);
  }
  isTypeSelected(id: number): boolean {
    return this.form.get('notify_type')?.value.includes(id);
  }
}
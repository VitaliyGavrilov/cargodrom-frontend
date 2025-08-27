// add-popup.component.ts
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { SettingsService } from 'src/app/api/services';
import { MySettingsService } from 'src/app/pages/services/mySetting.service';
import { FilterListComponent } from '../filter-list/filter-list.component';
import { LoaderService } from 'src/app/pages/services/loader.service';


@Component({
  selector: 'app-add-popup',
  templateUrl: './popap-table_filter-editor.component.html',
})
export class AddPopupComponent implements OnInit, OnDestroy {
  form: FormGroup;
  table: Table|any;

  filterTypes: any[] = [];
  filterPlaces: any[] = [];

  snackBarWithShortDuration: MatSnackBarConfig = { duration: 2000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 4000 };

  private _destroy$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<AddPopupComponent>,
    private fb: FormBuilder,
    private settingsSertvice: SettingsService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private mySettingService: MySettingsService,
    private router: Router,
    private loader: LoaderService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      id: [, []],
      table: [, [Validators.required]],
      name: [, [Validators.required]],
      type: [, [Validators.required]],
      // field: [ , [Validators.required]],
      show: [true, [Validators.required]],
      place: [, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
  ngOnInit(): void {
    console.log('popap data', this.data);
    this.form.patchValue(this.data.filter);
    this.tableNameDefinition();
    this.getData();
  }

  get currentPlace(){
    return this.filterPlaces.find((el:any)=>{
      return el.id==this.form.value.place;
    });
  }
  get currentType(){
    return this.filterTypes.find((el:any)=>{
      return el.id==this.form.value.type;
    });
  }

  get filteredPlace(){
    return this.filterPlaces.filter((el:any)=>{
      if(el.id=='header'){
        return this.table.header && this.currentType?.header
      } else {
        return true
      }
    });
  }

  private saveFilter(param: any) {
    console.log(param);
    this.settingsSertvice.settingsFilterSave({ body: param })
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (schema) => {
          this.snackBar.open(
            `Фильтр сохраннен`,
            undefined,
            this.snackBarWithShortDuration
          );
        },
        error: (err) => {
          this.snackBar.open(
            `Ошибка сохранения фильтра: ${{ err }}`,
            undefined,
            this.snackBarWithShortDuration
          );
        },
        complete: () => {
          this.onCancel();
        },
      });
  }
  private tableNameDefinition() {
    const currentUrl = this.router.url;
    const segments = currentUrl.split('/').filter((segment) => segment !== '');
    const lastSegment = segments[segments.length - 1];
    console.log(lastSegment);
    this.form.patchValue({
      table: lastSegment,
    });
  }
  private getData() {
    this.loader.wrapRequests<{ opt: FilterConfig }>({
        // Указываем явный тип для возвращаемого значения
        opt: this.settingsSertvice.settingsFilterFormParam({
          table: this.form.value.table,
        }),
      })
      .pipe(
        tap((schema) => {
          console.log(schema);
        }),
        takeUntil(this._destroy$)
      )
      .subscribe({
        next: (data) => {
          // Соответственно меняем тип здесь
          this.filterTypes = data.opt.types;
          this.filterPlaces = data.opt.places;
          this.table = data.opt.tables.find((el:any)=>{
            return el.id==this.form.value.table
          })
        },
        error: (err) => {
          this.snackBar.open(
            `Ошибка получения массивов для селекторов формы: ${err}`,
            undefined,
            this.snackBarWithShortDuration
          );
        },
      });
  }

  onCancel(): void {
    this.dialogRef.close();
    console.log(123);
    
  }
  onSubmit(): void {
    this.saveFilter(this.form.value);
  }
}

interface Table {
  id: string;
  name: string;
  header?: boolean;
}

interface FilterType {
  id: string;
  name: string;
  header?: boolean;
}

interface Place {
  id: string;
  name: string;
}

interface FilterConfig {
  tables: Table[];
  types: FilterType[];
  places: Place[];
}
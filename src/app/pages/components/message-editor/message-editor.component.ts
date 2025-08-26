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
import { forkJoin, map, Subject, takeUntil, tap } from 'rxjs';
import {
  CompanyService,
  ContractorService,
  MessageService,
  SettingsService,
} from 'src/app/api/services';
import { MySettingsService } from 'src/app/pages/services/mySetting.service';
import { LoaderService } from 'src/app/pages/services/loader.service';

@Component({
  selector: 'app-message-editor',
  templateUrl: './message-editor.component.html',
})
export class MessageEditorComponent implements OnInit, OnDestroy {
  form: FormGroup;
  table: Table | any;
  isEditMode:boolean=false;

  title: string = '';

  contractors: any[] = [];
  companys: any[] = [];
  users: any[] = [];

  messageStatus:any[]=[];

  snackBarWithShortDuration: MatSnackBarConfig = { duration: 2000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 4000 };

  private _destroy$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<MessageEditorComponent>,
    private fb: FormBuilder,
    private settingsSertvice: SettingsService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private mySettingService: MySettingsService,
    private router: Router,
    private loader: LoaderService,
    private companyService: CompanyService,
    private contractorService: ContractorService,
    private massegeService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      id: [, []],
      subject: [, [Validators.required]],
      text: [, [Validators.required]],
      data: [, [Validators.required]],
      to_user_id: ['', [Validators.required]],
      to_company_id: ['', [Validators.required]],
      to_contractor_id: ['', [Validators.required]],
      status: [, [Validators.required]],
      to: ['', [Validators.required]],
    });
  }

  onToChange(){
    this.form.controls['to_user_id'].reset();
    this.form.controls['to_contractor_id'].reset();
    this.form.controls['to_contractor_id'].reset();
  }
  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
  ngOnInit(): void {
    console.log('popap data', this.data);
    this.getData();
    if (this.data) {
      this.isEditMode=true;
      console.log('edit mode', this.data);
      this.form.patchValue(this.data.message)
    } else {
      console.log('create mode');
      this.isEditMode=false;
    }
  }

  private getData() {
    forkJoin({
      companys: this.companyService.companyList(),
      contractors: this.contractorService.contractorList(),
      message_status: this.massegeService.messageFormParam(),
      //users: this.directionService.directionCity({ country_id:this.currentRequest.arrival_country_id }),
    })
      .pipe(
        map(({ companys, contractors, message_status }) => ({
          companys: companys.items
            ? companys.items.map(({ id, name }) => ({ id, name }))
            : [],
          contractors: contractors.items
            ? contractors.items.map(({ id, name }) => ({ id, name }))
            : [],
          message_status: message_status.status?message_status.status:[],
        })),
        tap((schema) => {
          console.log(schema);
        }),
        takeUntil(this._destroy$)
      )
      .subscribe({
        next: ({ companys, contractors, message_status }) => {
          this.companys = companys;
          this.contractors = contractors;
          this.messageStatus = message_status;
        },
        error: (err) => {
          this.snackBar.open(
            `Ошибка загрузки данных: ${err.message}`,
            'Закрыть'
          );
        },
      });
  }

  private saveMessage() {
    console.log(this.form);
    this.massegeService
      .messageSave({ body: this.form.value })
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (schema) => {
          this.snackBar.open(
            `Сообщение сохраннено`,
            undefined,
            this.snackBarWithShortDuration
          );
        },
        error: (err) => {
          this.snackBar.open(
            `Ошибка сохранения сообщения: ${{ err }}`,
            undefined,
            this.snackBarWithShortDuration
          );
        },
        complete: () => {
          this.onCancel();
        },
      });
  }

  onCancel(): void {
    this.dialogRef.close(
      {reload_table:true}
    );
  }
  onSubmit(): void {
    this.saveMessage();
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

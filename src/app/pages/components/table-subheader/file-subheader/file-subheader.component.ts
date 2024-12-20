import { CountryService } from './../../../services/country.service';
import { environment } from './../../../../../environments/environment';
import { debounceTime, distinctUntilChanged, Subject, takeUntil, tap } from 'rxjs';
import { City } from './../../../../api/custom_models/city';
import { Association } from './../../../../api/custom_models/association';
import { Country } from './../../../../api/custom_models/country';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contractor, ContractorRequestFormat, ContractorType } from './../../../../api/custom_models/contractor';
import { ContractorService } from './../../../../api/services/contractor.service';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CityService } from '../../../services/city.service';
import { Location } from '@angular/common';
import { TaxSystem } from 'src/app/api/custom_models';
import { SystemService, TransportService } from 'src/app/api/services';
import { Counterparty } from 'src/app/api/custom_models/counterparty';
import { FilterService } from 'src/app/filter/services/filter.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table-sunheader-file',
  templateUrl: './file-subheader.component.html',
  styleUrls: ['./file-subheader.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableSubheaderFileComponent implements OnInit {

  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 5000 };

  readonly xlsxMimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  @Input() importMetods:any;


  @Output() import = new EventEmitter<any>();
  @Output() export = new EventEmitter<void>();
  @Output() exportTemplate = new EventEmitter<void>();
  // @Output() selectFile = new EventEmitter<void>();

  @ViewChild('file', { static: true }) file?: ElementRef;
  @ViewChild('exportDialogRef') exportDialogRef?: TemplateRef<void>;
  @ViewChild('importDialogRef') importDialogRef?: TemplateRef<{file: File, text: string}>;

  constructor(
    private route: ActivatedRoute,
    private contractorService: ContractorService,
    private countryService: CountryService,
    private cityService: CityService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location,
    private systemService: SystemService,
    private transportService: TransportService,
    public filterService: FilterService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {

  }

  confirmTableFileDownload(): void {
    if (!this.exportDialogRef) {
      return;
    }
    this.dialog.open(this.exportDialogRef, {
      data: 'Экспортировать данные о подрядчиках в Excel файл?'
    }).afterClosed().subscribe(res => {
      if (res) { this.export.emit();}
    });
  }

  confirmTemplateFileDownload(): void {
    if (!this.exportDialogRef) {
      return;
    }
    this.dialog.open(this.exportDialogRef, {
      data: 'Экспортировать форму для импорта в Excel файл?'
    }).afterClosed().subscribe(res => {
      if (res) { this.exportTemplate.emit();}
    });
  }




  exportTemplateChange(): void {
    this.exportTemplate.emit();
  }


  selectFileToImport(): void {
    const input = this.file?.nativeElement as HTMLInputElement | undefined;
    if (input) {
      input.value = '';
      input.click();
    }
  }

  selectFileToImportChange(): void {
    const files = this.file?.nativeElement.files as File[] | undefined;
    const file = files?.[0];
    if (file?.name.endsWith('.xlsx')) {
      this.snackBar.open('Требуется Excel file', undefined, this.snackBarWithShortDuration);
      return;
    }
    if (file?.size && file.size > 2 * 1024 * 1024) {
      this.snackBar.open('Слишком большой файл', undefined, this.snackBarWithShortDuration);
      return;
    }
    this.doImport(file as File);
  }

  resetPage(){
    this.router.navigate([])
  }

  startImport(){

  }

  private doImport(file: File): void {
    if (!this.importDialogRef) {
      return;
    }
    const fileName = file.name;
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      if (typeof event.target?.result === 'string') {
        const base64URL = event.target?.result;
        const suffix = `;base64,`;
        const index = base64URL.indexOf(suffix);
        const data = base64URL.substring(index + suffix.length);
        const payload = { data, name: fileName };
        this.importMetods.import(payload).subscribe({
          // next: ({ import_key, text }) => {
          next: (e:any) => {
            const text =e.text;
            const res =e.result;
            const import_key=e.import_key;
            this.dialog.open(this.importDialogRef!, { data: {...payload, text, res} }).afterClosed().subscribe(res => {
              if (res===2) {
                this.importMetods.import_res({ import_key }).subscribe({
                  next: (file:any) => {
                    const dataUri = `data:${this.xlsxMimeType};base64,${file.data}`;
                    const a = document.createElement('a');
                    a.href = dataUri;
                    a.download = file.name;
                    a.click();
                    this.snackBar.open('Данные импортированы успешно', undefined, this.snackBarWithShortDuration);
                    // this.onStartChange(0);
                    // this.resetPage();
                  },
                  error: (err:any) => this.snackBar.open(`Не удалось скачать файл с результатами обработки: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
                });
              }
              if (res===1) {
                this.importMetods.import_con({ import_key }).subscribe({
                  next: () => {
                    this.snackBar.open('Данные импортированы успешно', undefined, this.snackBarWithShortDuration);
                    // this.onStartChange(0);
                    this.resetPage();
                  },
                  error: (err:any) => this.snackBar.open(`Не удалось импортировать данные: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
                });
              }
            });
          },
          error: (err:any) => this.snackBar.open(`Не удалось импортировать данные: ` + err?.error.error_message, undefined, this.snackBarWithShortDuration)
        });
      }
    }, false);
    reader.addEventListener('error', () => this.snackBar.open(`Ошибка чтения файла ${fileName} `, undefined, this.snackBarWithShortDuration), false);
    reader.readAsDataURL(file);
  }

}

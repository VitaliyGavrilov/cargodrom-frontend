import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
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

  @Input() titles:any={title:'',subtitle:''};
  @Input() orderPage:boolean=false;
  @Input()  importMetods:any;
  @Output() export = new EventEmitter<void>();
  @Output() exportTemplate = new EventEmitter<void>();
  @Output() openAnalytics = new EventEmitter<void>();

  @ViewChild('file', { static: true }) file?: ElementRef;
  @ViewChild('exportDialogRef') exportDialogRef?: TemplateRef<void>;
  @ViewChild('importDialogRef') importDialogRef?: TemplateRef<{file: File, text: string}>;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    public filterService: FilterService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {

  }
  openPopapAnalytics(){
    this.openAnalytics.emit();
  }

  confirmTableFileDownload(): void {
    if (!this.exportDialogRef) {
      return;
    }
    this.dialog.open(this.exportDialogRef,
      { data: 'Экспортировать данные о подрядчиках в Excel файл?'}
    ).afterClosed().subscribe(res => {
      if (res) { this.export.emit();}
    });
  }

  confirmTemplateFileDownload(): void {
    if (!this.exportDialogRef) {
      return;
    }
    this.dialog.open(this.exportDialogRef,
      { data: 'Экспортировать форму для импорта в Excel файл?'}
    ).afterClosed().subscribe(res => {
      if (res) { this.exportTemplate.emit();}
    });
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
    if (file?.name.endsWith('.xls')) {
      this.snackBar.open('Требуется Excel файл в формате .xlsx', undefined, this.snackBarWithShortDuration);
      return;
    }
    if (file?.size && file.size > 2 * 1024 * 1024) {
      this.snackBar.open('Слишком большой файл', undefined, this.snackBarWithShortDuration);
      return;
    }
    this.doImport(file as File);
  }

  private importResulte(key:any){
    this.importMetods.import_res({ key }).subscribe({
      next: (file:any) => {
        const dataUri = `data:${this.xlsxMimeType};base64,${file.data}`;
        const a = document.createElement('a');
        a.href = dataUri;
        a.download = file.name;
        a.click();
        this.snackBar.open('Данные импортированы успешно', undefined, this.snackBarWithShortDuration);
      },
      error: (err:any) => this.snackBar.open(`Не удалось скачать файл с результатами обработки: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }
  private importConfirm(key:any){
    this.importMetods.import_con({ key }).subscribe({
      next: () => {
        this.snackBar.open('Данные импортированы успешно', undefined, this.snackBarWithShortDuration);
        this.router.navigate([]);
      },
      error: (err:any) => this.snackBar.open(`Не удалось импортировать данные: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
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
          next: (e:any) => {
            const text =e.text;
            const res =e.result;
            const import_key=e.import_key;
            this.dialog.open(this.importDialogRef!, { data: {...payload, text, res} }).afterClosed().subscribe(res => {
              if (res===2) { this.importResulte(import_key) }
              if (res===1) { this.importConfirm(import_key) }
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

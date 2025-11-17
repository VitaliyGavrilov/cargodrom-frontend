import { FileService } from './../../../api/services/file.service';
import { FileDocument } from './../../../api/custom_models';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map, of, zip } from 'rxjs';

export type FileDocumentExtended = Partial<FileDocument> & { added?: true, removed?: true };
export type ComponentsTypes = 'customer'|'request';
export type VarTypes = 'documents_file'|'cargo_file';

// Типы разрешенных файлов
const ALLOWED_FILE_TYPES = {
  // Изображения
  images: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/webp',
    'image/svg+xml'
  ],
  // Видео
  videos: [
    'video/mp4',
    'video/mpeg',
    'video/ogg',
    'video/webm',
    'video/quicktime',
    'video/x-msvideo'
  ],
  // Документы
  documents: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'text/csv',
    'application/rtf',
    'application/zip',
    'application/x-rar-compressed'
  ]
};

// Запрещенные типы файлов (исполняемые файлы)
const FORBIDDEN_FILE_TYPES = [
  'application/x-msdownload', // .exe
  'application/x-ms-dos-executable',
  'application/x-executable',
  'application/octet-stream', // может содержать исполняемые файлы
  'application/x-apple-diskimage', // .dmg
  'application/vnd.microsoft.portable-executable',
  'application/x-sh', // shell scripts
  'application/x-bat', // batch files
  'application/x-csh', // csh scripts
  'application/x-msdos-program'
];

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FileListComponent implements OnInit {

  @Input() isTitle:boolean=true;
  @Input() showLinks:boolean=true;
  @Input() isError:boolean=false;
  @Input() documents: FileDocumentExtended[] = [];
  @Input() component: ComponentsTypes = 'customer';
  @Input() var: VarTypes = 'documents_file';
  @Input() itemId: number = 0;

  @ViewChild('removeDialogRef') removeDialogRef!: TemplateRef<FileDocumentExtended>;

  @Input() documentsPath: string = '';
  @Output() onDocumentsPathChange = new EventEmitter<string>();

  constructor(
    private dialog: MatDialog,
    private fileService: FileService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file: File | null = input.files ? input.files[0] : null;

    if (file) {
      if (this.isFileTypeAllowed(file)) {
        this.documents.push({
          file_name: file.name,
          file: file,
          item_id: this.itemId,
          component: this.component,
          var: this.var,
          added: true
        });
        this.showSuccessMessage(`Файл "${file.name}" успешно добавлен`);
      } else {
        this.showFileTypeError(file);
      }

      // Сбрасываем значение input, чтобы можно было выбрать тот же файл снова
      input.value = '';
    }
  }

  /**
   * Проверяет, разрешен ли тип файла
   */
  private isFileTypeAllowed(file: File): boolean {
    const fileType = file.type;

    // Проверяем запрещенные типы
    if (FORBIDDEN_FILE_TYPES.includes(fileType)) {
      return false;
    }

    // Проверяем расширение файла для дополнительной безопасности
    const fileName = file.name.toLowerCase();
    const forbiddenExtensions = ['.exe', '.bat', '.cmd', '.com', '.msi', '.dmg', '.app', '.sh', '.bin', '.jar', '.pif', '.scr', '.vbs', '.ps1'];
    if (forbiddenExtensions.some(ext => fileName.endsWith(ext))) {
      return false;
    }

    // Проверяем разрешенные типы
    const allAllowedTypes = [
      ...ALLOWED_FILE_TYPES.images,
      ...ALLOWED_FILE_TYPES.videos,
      ...ALLOWED_FILE_TYPES.documents
    ];

    // Если тип файла пустой, проверяем по расширению
    if (!fileType || fileType === '') {
      return this.isFileExtensionAllowed(fileName);
    }

    return allAllowedTypes.includes(fileType);
  }

  /**
   * Проверяет расширение файла когда MIME тип недоступен
   */
  private isFileExtensionAllowed(fileName: string): boolean {
    const allowedExtensions = [
      // Изображения
      '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg',
      // Видео
      '.mp4', '.mpeg', '.ogg', '.webm', '.mov', '.avi', '.mkv',
      // Документы
      '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
      '.txt', '.csv', '.rtf', '.zip', '.rar', '.7z'
    ];

    return allowedExtensions.some(ext => fileName.endsWith(ext));
  }

  /**
   * Показывает ошибку типа файла через SnackBar
   */
  private showFileTypeError(file: File): void {
    const message = `Файл "${file.name}" имеет запрещенный тип.
Разрешены только изображения, видео и документы.
Исполняемые файлы (exe, bat, cmd и др.) запрещены.`;

    this.snackBar.open(message, undefined, {
      duration: 3000,
      panelClass: ['error-snackbar'],
      // horizontalPosition: 'center',
      // verticalPosition: 'top'
    });
  }

  /**
   * Показывает сообщение об успехе через SnackBar
   */
  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, undefined, {
      duration: 3000,
      panelClass: ['success-snackbar'],
      // horizontalPosition: 'center',
      // verticalPosition: 'top'
    });
  }

  remove(doc: FileDocumentExtended): void {
    if (doc.added) {
      const index = this.documents.indexOf(doc);
      if (index >= 0) {
        this.documents.splice(index, 1);
        this.showSuccessMessage(`Файл "${doc.file_name}" удален`);
      }
    } else {
      doc.removed = true;
    }
  }

  confirmRemove(doc: FileDocumentExtended): void {
    this.dialog.open(this.removeDialogRef, { data: doc }).afterClosed().subscribe(res => {
      if (res) {
        this.remove(doc);
      }
    });
  }

  get filteredDocuments(): FileDocumentExtended[] {
    return this.documents.filter(doc => !doc.removed);
  }

  update(): Observable<void> {
    const removedDocs = this.documents.filter(doc => doc.removed);
    const createdDocs = this.documents.filter(doc => doc.added);
    const create$ = createdDocs.map(doc => this.fileService.fileCreate({
      body: {
        component: this.component, var: this.var, item_id: doc.item_id!, file: doc.file!
      }
    }));
    const remove$ = removedDocs.map(doc => this.fileService.fileDelete({
      body: {
        component: this.component, var: this.var, item_id: doc.item_id!, id: doc.id!,
      }
    }));
    const actions$ = [...remove$, ...create$];
    if (actions$.length === 0) {
      return of(undefined);
    }
    return zip(...actions$).pipe(map(() => undefined));
  }

  create(id: number): Observable<void> {
    const create$ = this.filteredDocuments.map(doc => this.fileService.fileCreate({
      body: {
        component: this.component, var: this.var, item_id: id, file: doc.file!
      }
    }));
    return zip(create$).pipe(map(() => undefined))
  }

  delete(): Observable<void> {
    const docsWithId = this.documents.filter(doc => typeof doc.id === 'number');
    const remove$ = docsWithId.map(doc => this.fileService.fileDelete({
      body: {
        component: this.component, var: this.var, item_id: doc.item_id!, id: doc.id!,
      }
    }));
    return zip(remove$).pipe(map(() => undefined))
  }

  documentsPathChange(newPath: string): void {
    this.onDocumentsPathChange.emit(newPath);
  }
}
// import { FileService } from './../../../api/services/file.service';
// import { FileDocument } from './../../../api/custom_models';
// import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { Observable, map, of, zip } from 'rxjs';

// export type FileDocumentExtended = Partial<FileDocument> & { added?: true, removed?: true };
// export type ComponentsTypes = 'customer'|'request';
// export type VarTypes = 'documents_file'|'cargo_file';


// @Component({
//   selector: 'app-file-list',
//   templateUrl: './file-list.component.html',
//   styleUrls: ['./file-list.component.scss'],
//   encapsulation: ViewEncapsulation.None,
// })
// export class FileListComponent implements OnInit {

//   @Input() isTitle:boolean=true;

//   @Input() showLinks:boolean=true;

//   @Input() isError:boolean=false;

//   @Input() documents: FileDocumentExtended[] = [];

//   @Input() component: ComponentsTypes = 'customer';

//   @Input() var: VarTypes = 'documents_file';

//   @Input() itemId: number = 0;

//   @ViewChild('removeDialogRef') removeDialogRef!: TemplateRef<FileDocumentExtended>;

//   @Input() documentsPath: string = '';
//   @Output() onDocumentsPathChange = new EventEmitter<string>();

//   constructor(
//     private dialog: MatDialog,
//     private fileService: FileService,
//   ) {

//   }

//   ngOnInit(): void {

//   }

//   onFileSelected(event: Event) {
//     const file: File = (event.target! as HTMLInputElement).files![0];
//     if (file) {
//       this.documents.push({ file_name: file.name, file: file, item_id: this.itemId, component: this.component, var: this.var, added: true });
//     }
//   }

//   remove(doc: FileDocumentExtended): void {
//     if (doc.added) {
//       const index = this.documents.indexOf(doc);
//       if (index >= 0) {
//         this.documents.splice(index, 1);
//       }
//     } else {
//       doc.removed = true;
//     }
//   }

//   confirmRemove(doc: FileDocumentExtended): void {
//     this.dialog.open(this.removeDialogRef, { data: doc }).afterClosed().subscribe(res => {
//       if (res) {
//         this.remove(doc);
//       }
//     });
//   }

//   get filteredDocuments(): FileDocumentExtended[] {
//     return this.documents.filter(doc => !doc.removed);
//   }

//   update(): Observable<void> {
//     const removedDocs = this.documents.filter(doc => doc.removed);
//     const createdDocs = this.documents.filter(doc => doc.added);
//     const create$ = createdDocs.map(doc => this.fileService.fileCreate({
//       body: {
//         component: this.component, var: this.var, item_id: doc.item_id!, file: doc.file!
//       }
//     }));
//     const remove$ = removedDocs.map(doc => this.fileService.fileDelete({
//       body: {
//         component: this.component, var: this.var, item_id: doc.item_id!, id: doc.id!,
//       }
//     }));
//     const actions$ = [...remove$, ...create$];
//     if (actions$.length === 0) {
//       return of(undefined);
//     }
//     return zip(...actions$).pipe(map(() => undefined));
//   }

//   create(id: number): Observable<void> {
//     const create$ = this.filteredDocuments.map(doc => this.fileService.fileCreate({
//       body: {
//         component: this.component, var: this.var, item_id: id, file: doc.file!
//       }
//     }));
//     return zip(create$).pipe(map(() => undefined))
//   }

//   delete(): Observable<void> {
//     const docsWithId = this.documents.filter(doc => typeof doc.id === 'number');
//     const remove$ = docsWithId.map(doc => this.fileService.fileDelete({
//       body: {
//         component: this.component, var: this.var, item_id: doc.item_id!, id: doc.id!,
//       }
//     }));
//     return zip(remove$).pipe(map(() => undefined))
//   }

//   documentsPathChange(newPath: string): void {
//     this.onDocumentsPathChange.emit(newPath);
//   }
// }

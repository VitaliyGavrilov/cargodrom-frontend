import { FileService } from './../../../api/services/file.service';
import { FileDocument } from './../../../api/custom_models';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, of, zip } from 'rxjs';

export type FileDocumentExtended = Partial<FileDocument> & { added?: true, removed?: true };

@Component({
  selector: 'app-file-list-request',
  templateUrl: './request-file.component.html',
  styleUrls: ['./request-file.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RequestFileListComponent implements OnInit {
  @Input() documents: FileDocumentExtended[] = [];

  @Input() component!: string;

  @Input() var!: string ;

  @Input() itemId!: number;

  @ViewChild('removeDialogRef') removeDialogRef!: TemplateRef<FileDocumentExtended>;


  constructor(
    private dialog: MatDialog,
    private fileService: FileService,
  ) {

  }

  ngOnInit(): void {

  }

  onFileSelected(event: Event) {
    const file: File = (event.target! as HTMLInputElement).files![0];
    console.log(file,this.documents);
    if (file) {
      this.documents.push({ file_name: file.name, file: file, item_id: this.itemId, component: this.component, var: this.var, added: true });
    }
  }

  remove(doc: FileDocumentExtended): void {
    if (doc.added) {
      const index = this.documents.indexOf(doc);
      if (index >= 0) {
        this.documents.splice(index, 1);
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

  // documentsPathChange(newPath: string): void {
  //   this.onDocumentsPathChange.emit(newPath);
  // }
}

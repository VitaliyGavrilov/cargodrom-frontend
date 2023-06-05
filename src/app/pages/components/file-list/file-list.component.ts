import { FileService } from './../../../api/services/file.service';
import { FileDocument } from './../../../api/custom_models';
import { Component, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, of, zip } from 'rxjs';

export type FileDocumentExtended = Partial<FileDocument> & { formData?: FormData, removed?: true };

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FileListComponent implements OnInit {
  @Input() documents: FileDocumentExtended[] = [];

  @Input() component: 'customer' = 'customer';

  @Input() var: 'documents_file' = 'documents_file';

  @Input() itemId: number = 8;

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
    if (file) {
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('var', this.var);
      formData.append('component', this.component);
      formData.append('item_id', String(this.itemId));
      this.documents.push({ file_name: file.name, formData, item_id: this.itemId });
    }
  }

  remove(doc: FileDocumentExtended): void {
    doc.removed = true;
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
    const createdDocs = this.documents.filter(doc => !!doc.formData);
    const create$ = createdDocs.map(doc => this.fileService.fileCreate({
      body: {
        component: this.component, var: this.var, item_id: doc.item_id!, file: doc.formData as any
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
        component: this.component, var: this.var, item_id: id, file: doc.formData as any
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
}

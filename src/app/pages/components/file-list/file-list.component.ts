import { FileDocument } from './../../../api/custom_models';
import { Component, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

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
      this.documents.push({ file_name: file.name, formData });
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
  
  save(id?: number): Observable<void> {
    return of();
  }
}

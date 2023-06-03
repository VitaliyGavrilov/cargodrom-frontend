import { FileDocument } from './../../../api/custom_models';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FileListComponent implements OnInit {

  @Input()
  documents: FileDocument[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event: Event) {
    const file: File = (event.target! as HTMLInputElement).files![0];
    if (file) {
      this.documents.push({ file_name: file.name } as unknown as FileDocument);
    }
    const data = new FormData();
    data.append('file', file, file.name);
  }

}

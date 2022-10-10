import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss']
})
export class EditorHeaderComponent implements OnInit {

  @Input() backLink: string[] = [];
  @Input() title: string = '';
  @Output() save = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit(): void {
  }
  
  onSave(): void {
    this.save.emit();
  }
  
  onRemove(): void {
    this.remove.emit();
  }
  
}

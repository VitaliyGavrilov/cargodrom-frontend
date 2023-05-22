import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-editor-header',
  template: '',
})
export class EditorHeaderMockup {

  @Input() title: string = '';
  @Input() isEditMode = false;
  @Input() name?: string;
  @Output() save = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
}
import { Location } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss']
})
export class EditorHeaderComponent implements OnInit {

  @Input() title: string = '';
  @Input() isEditMode = false;
  @Input() name?: string;
  @Output() save = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  @Output() calc = new EventEmitter<void>();
  @Input() isCalck = false;
  @Input() content: boolean = false;
  @Input() request: any={};
  @Output() send = new EventEmitter<void>();
  @Input() isSend = false;

  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  onSave(): void {
    this.save.emit();
  }

  onRemove(): void {
    this.remove.emit();
  }

  goBack(): void {
    this.location.back();
  }

  goCalc():void{
    this.calc.emit();
  }

  onSend():void{
    this.send.emit();
  }

}

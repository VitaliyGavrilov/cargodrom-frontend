// grid-table.component.ts
import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, TemplateRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

export interface GridTableColumn {
  field: string;
  title: string;
  width?: string;
  class?: string;
  headerClass?: string;
}

@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.scss']
})
export class GridTableComponent {
  @Input() columns: GridTableColumn[] = [];
  @Input() rows: any[] = [];
  @Input() dragEnabled: boolean = false;
  @Input() dragHandleField: string = 'move';
  
  @Output() rowDropped = new EventEmitter<CdkDragDrop<any[]>>();
  @Output() filterShowChange = new EventEmitter<any>();
  @Output() editRow = new EventEmitter<any>();
  @Output() deleteRow = new EventEmitter<number>();

  @ContentChildren('cellTemplates') cellTemplates!: QueryList<TemplateRef<any>>;

  get gridTemplateColumns(): string {
    return this.columns.map(col => col.width || '1fr').join(' ');
  }

  getTemplateForField(field: string): TemplateRef<any> | null {
    const template = this.cellTemplates.find(t => {
      // @ts-ignore
      return t._declarationTContainer.localNames?.[0] === field;
    });
    return template || null;
  }

  onDrop(event: CdkDragDrop<any[]>): void {
    this.rowDropped.emit(event);
  }

  onFilterShow(row: any): void {
    this.filterShowChange.emit(row);
  }

  onEdit(row: any): void {
    this.editRow.emit(row);
  }

  onDelete(id: number): void {
    this.deleteRow.emit(id);
  }
}
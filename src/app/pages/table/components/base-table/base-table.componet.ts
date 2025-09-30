// base-table.component.ts
import {
  Component,
  Input,
  TemplateRef,
  ContentChild,
  ViewChild,
} from '@angular/core';
import { TableColumn } from './table.models';

@Component({
  selector: 'app-base-table',
  template: `
    <div class="table-container">
      <!-- Заголовок таблицы -->
      <div class="table-header">
        <div
          *ngFor="let column of columns"
          class="header-cell"
          [style.width]="column.width"
        >
          <div
            *ngFor="let subCol of column?.items"
            class="header-cell"
            [style.width]="subCol.width"
          >
            {{ subCol.title }}
          </div>
        </div>
      </div>

      <!-- Тело таблицы -->
      <div class="table-body">
        <div *ngFor="let row of rows" class="table-row">
          <div
            *ngFor="let column of columns"
            class="table-cell"
            [style.width]="column.width"
          >
            <div
              *ngFor="let subCol of column?.items"
              class="table-cell"
              [style.width]="subCol.width"
            >
              <ng-container
                *ngTemplateOutlet="
                  columnTemplate;
                  context: { $implicit: row, column: subCol }
                "
              ></ng-container>
            </div>
          </div>
        </div>
      </div>

      <!-- Пустое состояние -->
      <div *ngIf="!rows || rows.length === 0" class="empty-state">
        Данные отсутствуют
      </div>
    </div>
  `,
  styles: [
    `
      .table-container {
        border: 1px solid #ddd;
        border-radius: 4px;
        overflow: hidden;
        font-family: Arial, sans-serif;
      }

      .table-header {
        display: flex;
        background-color: #f5f5f5;
        font-weight: bold;
      }

      .header-cell {
        padding: 12px;
        border-right: 1px solid #ddd;
        display: flex;
        align-items: center;
        flex-grow: 1;
      }

      .table-body {
        display: flex;
        flex-direction: column;
      }

      .table-row {
        display: flex;
        border-bottom: 1px solid #ddd;
      }

      .table-row:hover {
        background-color: #f9f9f9;
      }

      .table-cell {
        padding: 12px;
        border-right: 1px solid #ddd;
        display: flex;
        flex-grow: 1;
      }

      .empty-state {
        padding: 40px;
        text-align: center;
        color: #666;
      }
    `,
  ],
})
export class BaseTableComponent {
  @Input() columns: any[] = [];
  @Input() rows: any[] = [];
  @ContentChild(TemplateRef) columnTemplate!: TemplateRef<any>;
}

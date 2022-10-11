import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Position } from './../../../../../api/custom_models/position';
import { CompanyService } from './../../../../../api/services/company.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: [
    './position.component.scss',
    '../../main-table.scss'
  ]
})
export class PositionComponent implements OnInit {

  positions: Position[] = [];
  total = 0;
  start = 0;
  limits = [25, 50, 100];
  count = this.limits[0];
  @ViewChild('removeDialogRef') removeDialogRef!: TemplateRef<Position>;

  constructor(
    private companyService: CompanyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadPositions();
  }

  loadPositions(): void {
    this.companyService.companyPositionList().subscribe(positions => {
      this.positions = positions ? positions as Position[] : [];
      this.total = this.positions.length;
    });
  }


  onStartChange(newStart: number): void {
    this.loadPositions();
  }

  onCountChange(newCount: number): void {
    this.loadPositions();
  }

  confirmRemove(position: Position): void {
    this.dialog.open(this.removeDialogRef, {data: position}).afterClosed().subscribe(res => {
      if (res) {
        this.removePosition(position);
      }
    });
  }

  removePosition(position: Position): void {
    const body = { id: position.id };
    this.companyService.companyPositionDelete({ body })
      .subscribe({
        next: () => {
          this.snackBar.open(`Должность ${position.name} удалена`, undefined, {duration: 1000});
          this.loadPositions();
        },
        error: (err) => this.snackBar.open(`Ошибка удаления должности: ` + err.error.error_message, undefined, {duration: 1000})
      });
  }

}

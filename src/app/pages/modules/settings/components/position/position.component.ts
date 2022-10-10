import { Position } from './../../../../../api/custom_models/position';
import { CompanyService } from './../../../../../api/services/company.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(
    private companyService: CompanyService,
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

}

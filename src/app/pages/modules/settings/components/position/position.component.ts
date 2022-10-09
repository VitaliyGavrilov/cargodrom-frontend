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
  
  positions: any;
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
      console.log(positions);
      this.positions = positions ? Object.values(positions) : [];
      this.total = this.positions.length;
      console.log(JSON.stringify(positions, null, 2));
      console.log(JSON.stringify(this.positions, null, 2));
    });  
  }
  
  
  onStartChange(newStart: number): void {
    this.loadPositions();
  }

  onCountChange(newCount: number): void {
    this.loadPositions();
  }

}

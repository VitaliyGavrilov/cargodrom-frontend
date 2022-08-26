import { ContractorFilter } from './../../../api/custom_models/contractor-filter';
import { ContractorService } from './../../../api/services/contractor.service';
import { Component, OnInit } from '@angular/core';
import { Contractor } from '../../../api/custom_models';

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.scss']
})

export class ContractorComponent implements OnInit {
  contractors: Contractor[] = [];
  total: number = 0;
  start = 0;
  limits = [10, 15, 25, 50, 100];
  count = this.limits[0];
  
  trackById = (index: number, contractor: Contractor) => contractor.id!;
  filter: ContractorFilter = {};

  constructor(
    private contractorService: ContractorService
  ) {

  }

  ngOnInit(): void {
    this.updateTable(this.start, this.count);
  }

  onStartChange(start: number): void {
    this.updateTable(start, this.count);
  }

  onCountChange(count: number): void {
    this.updateTable(0, count);
  }
  
  onFilterChange(filter: ContractorFilter): void {
    this.filter = filter;
    this.updateTable(0, this.count);
  }

  private updateTable(start: number, count: number): void {
    const params = { start, count, ...this.filter || {} };
    this.contractorService.contractorList(params).subscribe(
      ({ items, total }) => {
        this.start = start;
        this.count = count;
        this.contractors = items || [];
        this.total = total || 0;
      }
    );
  }
  
}

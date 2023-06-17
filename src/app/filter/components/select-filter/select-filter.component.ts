import { Component, Input, OnInit } from '@angular/core';
import { FilterSelectControl } from 'src/app/api/custom_models';

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.scss']
})
export class SelectFilterComponent implements OnInit {
  @Input() filterControl!: FilterSelectControl;

  constructor() { }

  ngOnInit(): void {
  }

}

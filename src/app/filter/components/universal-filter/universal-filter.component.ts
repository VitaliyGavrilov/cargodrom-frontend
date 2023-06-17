import { Component, Input, OnInit } from '@angular/core';
import { FilterControl } from 'src/app/api/custom_models';

@Component({
  selector: 'app-universal-filter',
  templateUrl: './universal-filter.component.html',
  styleUrls: ['./universal-filter.component.scss']
})
export class UniversalFilterComponent implements OnInit {

  @Input() filterControl!: FilterControl;

  constructor() { }

  ngOnInit(): void {
  }

}

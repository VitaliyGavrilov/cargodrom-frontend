import { Component, Input, OnInit } from '@angular/core';
import { FilterCheckboxControl } from 'src/app/api/custom_models';

@Component({
  selector: 'app-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.scss']
})
export class CheckboxFilterComponent implements OnInit {
  @Input() filterControl!: FilterCheckboxControl;

  constructor() { }

  ngOnInit(): void {
  }

}

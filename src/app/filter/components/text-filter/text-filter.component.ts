import { Component, Input, OnInit } from '@angular/core';
import { FilterTextControl } from 'src/app/api/custom_models';

@Component({
  selector: 'app-text-filter',
  templateUrl: './text-filter.component.html',
  styleUrls: ['./text-filter.component.scss']
})
export class TextFilterComponent implements OnInit {
  @Input() filterControl!: FilterTextControl;
   
  constructor() { }

  ngOnInit(): void {
  }

}

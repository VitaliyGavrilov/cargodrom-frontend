import { Component, Input, OnInit } from '@angular/core';
import { FilterSelectControl } from 'src/app/api/custom_models';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.scss']
})
export class SelectFilterComponent implements OnInit {
  @Input() filterControl!: FilterSelectControl;

  constructor(
    public filter: FilterService,
  ) { }

  ngOnInit(): void {
  }
}

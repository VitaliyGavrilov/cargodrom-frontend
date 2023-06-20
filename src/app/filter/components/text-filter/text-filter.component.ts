import { Component, Input, OnInit } from '@angular/core';
import { FilterTextControl } from 'src/app/api/custom_models';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-text-filter',
  templateUrl: './text-filter.component.html',
  styleUrls: ['./text-filter.component.scss']
})
export class TextFilterComponent implements OnInit {
  @Input() filterControl!: FilterTextControl;
   
  constructor(
    public filter: FilterService,
  ) { }

  ngOnInit(): void {
  }

}

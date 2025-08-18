import { Component, Input, OnInit } from '@angular/core';
import { FilterControl } from 'src/app/api/custom_models';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-universal-filter',
  templateUrl: './universal-filter.component.html',
  styleUrls: ['./universal-filter.component.scss']
})
export class UniversalFilterComponent implements OnInit {

  @Input() filterControl!: FilterControl;

  constructor(
    public filter: FilterService,
  ) { }

  ngOnInit(): void {
    // console.log(this.filterControl,this.filter.value[this.filterControl.field]);
    
    
  }

}

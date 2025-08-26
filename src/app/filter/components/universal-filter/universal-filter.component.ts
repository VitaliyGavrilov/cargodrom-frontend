import { Component, Input, OnInit } from '@angular/core';
import { FilterControl, FilterSelectControl } from 'src/app/api/custom_models';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-universal-filter',
  templateUrl: './universal-filter.component.html',
  styleUrls: ['./universal-filter.component.scss']
})
export class UniversalFilterComponent implements OnInit {

  @Input() filterControl!: FilterControl ;

  constructor(
    public filter: FilterService,
  ) { }

  ngOnInit(): void {
    if(this.filterControl.array){
      const value = this.filterControl.array.find((filter)=>{
        return this.filter.value[this.filterControl.field] == filter.id;
      })
      if(!value && this.filter.value[this.filterControl.field]!=''){
        if(this.filter.value[this.filterControl.field] instanceof Array ){
          this.filter.value[this.filterControl.field]=[];
        } else {
          this.filter.value[this.filterControl.field]='';
        }
      }
    }
  }
}

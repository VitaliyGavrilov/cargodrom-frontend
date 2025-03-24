import { Component, Input, OnInit } from '@angular/core';
import { FilterRadioControl, FilterSelectControl } from 'src/app/api/custom_models';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-radio-filter',
  templateUrl: './radio-filter.component.html',
  // styleUrls: ['./radio-filter.component.scss']
})
export class RadioFilterComponent implements OnInit {
  @Input() filterControl!: FilterRadioControl;

  constructor(
    public filter: FilterService,
  ) { }

  ngOnInit(): void {
    // console.log('filterControl',this.filterControl);
    this.filterControl.array.forEach((i)=>{
      if(i.name=='Любые'){
        this.filter.value[this.filterControl.field]=i.id;
      }
    })
  }

  change(id: string): void {
    if(id==this.filter.value[this.filterControl.field]){
      this.filter.value[this.filterControl.field]='';
    }
  }
}

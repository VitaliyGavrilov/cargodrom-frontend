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
  @Input() multi: boolean = false;

  constructor(
    public filter: FilterService,
  ) { }

  ngOnInit(): void {
    console.log('filter',this.filter);

  }

  returnPlacholder():string{
    if(this.multi){
      return this.filter.value[this.filterControl.field]?.length>0
        ? 'Выбранно эл.: ' + this.filter.value[this.filterControl.field]?.length
        : '—'
    } else {
      return '—'
    }

  }
}

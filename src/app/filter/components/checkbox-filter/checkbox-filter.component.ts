import { Component, Input, OnInit } from '@angular/core';
import { FilterCheckboxControl } from 'src/app/api/custom_models';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.scss']
})
export class CheckboxFilterComponent implements OnInit {
  @Input() filterControl!: FilterCheckboxControl;

  constructor(
    public filter: FilterService,
  ) { }

  ngOnInit(): void {
    
  }

  change(id: string): void {
    const array: string[] = this.filter.value[this.filterControl.field];
    if (!Array.isArray(array)) {
      return;
    }
    const index = array.indexOf(id);
    if (index >= 0) {
      array.splice(index, 1);
    } else {
      array.push(id);
    }
    
    
  }

  checked(id: string): boolean {
    const array: string[] = this.filter.value[this.filterControl.field];
    if (Array.isArray(array)) {
      return array.includes(id);
    }
    return false;
  }

}

import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FilterSelectControl } from 'src/app/api/custom_models';
import { FilterService } from '../../services/filter.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, skip, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-select-filter',
  templateUrl: './search-select-filter.component.html',
})
export class SearchSelectFilterComponent implements OnInit, OnDestroy {
  @Input() filterControl!: FilterSelectControl;

  test:any;

  form = new FormGroup({
    name: new FormControl(),
    id: new FormControl(),
  });

  unsubscribe$=new Subject<void>();

  constructor(
    public filter: FilterService,
    public chenge: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.filter.clearEmiter$
      .pipe(skip(1), takeUntil(this.unsubscribe$))
      .subscribe(()=> {this.form.reset()})

    const data=this.filter.value[this.filterControl.field];

    if(data){
      const currentItem = this.filterControl.array.find(option => option.id === data);

      this.form.patchValue({
        name: currentItem?.name,
        id: currentItem?.id
      })
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  change(item:any){
    this.filter.value[this.filterControl.field] = item.id;
    this.form.patchValue({
      id: item.id
    })
  }

  search(e:any){
    this.filter.value[this.filterControl.field]="";
    const filterValue = e.target.value.toLowerCase();
    this.test= this.filterControl.array.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}

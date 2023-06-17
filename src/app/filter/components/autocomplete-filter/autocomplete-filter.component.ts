import { Component, Input, OnInit } from '@angular/core';
import { FilterAutocompleteControl } from 'src/app/api/custom_models';

@Component({
  selector: 'app-autocomplete-filter',
  templateUrl: './autocomplete-filter.component.html',
  styleUrls: ['./autocomplete-filter.component.scss']
})
export class AutocompleteFilterComponent implements OnInit {
  @Input() filterControl!: FilterAutocompleteControl;

  constructor() { }

  ngOnInit(): void {
  }

}

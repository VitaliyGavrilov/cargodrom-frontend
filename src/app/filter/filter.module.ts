import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteFilterComponent } from './components/autocomplete-filter/autocomplete-filter.component';
import { PeriodFilterComponent } from './components/period-filter/period-filter.component';
import { SelectFilterComponent } from './components/select-filter/select-filter.component';
import { TextFilterComponent } from './components/text-filter/text-filter.component';
import { CheckboxFilterComponent } from './components/checkbox-filter/checkbox-filter.component';
import { UniversalFilterComponent } from './components/universal-filter/universal-filter.component';
import { MaterialModule } from '@cargodrom/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { RadioFilterComponent } from './components/radio-filter/radio-filter.component';
import { SearchSelectFilterComponent } from './components/search-select-filter/search-select-filter.component';



@NgModule({
  declarations: [
    AutocompleteFilterComponent,
    PeriodFilterComponent,
    SelectFilterComponent,
    TextFilterComponent,
    CheckboxFilterComponent,
    UniversalFilterComponent,
    TableFilterComponent,
    RadioFilterComponent,
    SearchSelectFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    UniversalFilterComponent,
    TableFilterComponent,
  ]
})
export class FilterModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteFilterComponent } from './components/autocomplete-filter/autocomplete-filter.component';
import { PeriodFilterComponent } from './components/period-filter/period-filter.component';
import { SelectFilterComponent } from './components/select-filter/select-filter.component';
import { TextFilterComponent } from './components/text-filter/text-filter.component';
import { CheckboxFilterComponent } from './components/checkbox-filter/checkbox-filter.component';
import { UniversalFilterComponent } from './components/universal-filter/universal-filter.component';
import { MaterialModule } from '@cargodrom/material/material.module';



@NgModule({
  declarations: [
    AutocompleteFilterComponent,
    PeriodFilterComponent,
    SelectFilterComponent,
    TextFilterComponent,
    CheckboxFilterComponent,
    UniversalFilterComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    UniversalFilterComponent,
  ]
})
export class FilterModule { }

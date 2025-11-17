import { NgModule } from '@angular/core';
import { IframeStyleDirective } from './iframe-style.directive';
import { CommonModule } from '@angular/common';
import { IconColorDirective } from './icon-color.directive';
import { AutocompleteDirective } from './autocomplete.directive';
import { SelectClearDirective } from './mat-select/mat-sel.dir';


@NgModule({
  declarations: [
    IframeStyleDirective,
    IconColorDirective,
    AutocompleteDirective,
    SelectClearDirective,
  ],
  imports: [

  ],
  exports: [
    IframeStyleDirective,
    IconColorDirective,
    AutocompleteDirective,
    SelectClearDirective,
  ]
})
export class DirectivesModule { }

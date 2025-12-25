import { NgModule } from '@angular/core';
import { IframeStyleDirective } from './iframe-style.directive';
import { CommonModule } from '@angular/common';
import { IconColorDirective } from './icon-color.directive';
import { AutocompleteDirective } from './autocomplete.directive';
import { SelectClearDirective } from './mat-select/mat-sel.dir';
import { FocusFirstInvalidDirective } from './focus-first-invalid.directive';


@NgModule({
  declarations: [
    IframeStyleDirective,
    IconColorDirective,
    AutocompleteDirective,
    SelectClearDirective,
    FocusFirstInvalidDirective,
  ],
  imports: [

  ],
  exports: [
    IframeStyleDirective,
    IconColorDirective,
    AutocompleteDirective,
    SelectClearDirective,
    FocusFirstInvalidDirective,
  ]
})
export class DirectivesModule { }

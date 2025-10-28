import { NgModule } from '@angular/core';
import { IframeStyleDirective } from './iframe-style.directive';
import { CommonModule } from '@angular/common';
import { IconColorDirective } from './icon-color.directive';


@NgModule({
  declarations: [
    IframeStyleDirective,
    IconColorDirective,
  ],
  imports: [
    
  ],
  exports: [
    IframeStyleDirective,
    IconColorDirective,
  ]
})
export class DirectivesModule { }
import { NgModule } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  imports: [
    ColorPickerModule
  ],
  exports: [
    ColorPickerModule
  ]
})
export class NgxColorPickerModule { }
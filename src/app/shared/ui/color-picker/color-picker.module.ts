// src/app/shared/ui/color-pickers/color-picker/color-picker.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerDemoComponent } from './color-picker-demo/color-picker-demo.component';
import { NgxColorModule } from './lib/ngx-color.module';
import { NgxColorPickerModule } from './lib/ngx-color-picker.module';
import { ColorPickerStandartComponent } from './color-picker-standart/color-picker-standart.component';
import { CdkModule } from '../cdk/cdk.module';

@NgModule({
  declarations: [
    ColorPickerDemoComponent,
    ColorPickerStandartComponent,
  ],
  imports: [
    CommonModule,
    NgxColorModule,
    NgxColorPickerModule,
    CdkModule,
  ],
  exports: [
    ColorPickerDemoComponent,
    ColorPickerStandartComponent,
    // NgxColorModule, 
    // NgxColorPickerModule,
  ]
})
export class ColorPickerModule { }
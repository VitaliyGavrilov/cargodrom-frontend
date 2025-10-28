import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { PopupComponent } from './popup/popup.component';
import { PanelComponent } from './panel/panel.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LayoutComponent,
    PopupComponent,
    PanelComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LayoutComponent,
    PopupComponent,
    PanelComponent,
  ]
})
export class CdkModule { }
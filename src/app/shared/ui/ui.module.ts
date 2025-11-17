import { NgModule } from '@angular/core';
import { ColorPickerModule } from './color-picker/color-picker.module';
import { AutocompleteModule } from './autocomplete/autocomplete.module';
import { LayoutComponent } from './cdk/layout/layout.component';
import { PopupComponent } from './cdk/popup/popup.component';
import { PanelComponent } from './cdk/panel/panel.component';
import { CdkModule } from './cdk/cdk.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
  ],
  imports: [
    ColorPickerModule,
    AutocompleteModule,
    NgSelectModule,
  ],
  exports: [
    ColorPickerModule,
    AutocompleteModule,
    NgSelectModule,
  ]
})
export class UiModule { }

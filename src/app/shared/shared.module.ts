import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from './ui/ui.module';
import { DirectivesModule } from './directives/directive.module';
import { MaterialModule } from '@cargodrom/material/material.module';

@NgModule({
  declarations: [
  ],
  imports: [
    UiModule,
    DirectivesModule,
    MaterialModule,
    
  ],
  exports: [
    CommonModule,
    UiModule,
    DirectivesModule,
    MaterialModule,
    
  ]
})
export class SharedModule { }
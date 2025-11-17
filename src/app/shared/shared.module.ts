import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from './ui/ui.module';
import { DirectivesModule } from './directives/directive.module';
import { MaterialModule } from '@cargodrom/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    UiModule,
    DirectivesModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    UiModule,
    DirectivesModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }

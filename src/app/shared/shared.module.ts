import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from './ui/ui.module';
import { DirectivesModule } from './directives/directive.module';
import { MaterialModule } from '@cargodrom/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterModule } from '../filter/filter.module';
import { TableSubheaderFileComponent } from '../pages/components/table-subheader/file-subheader/file-subheader.component';
import { RouterModule } from '@angular/router';
import { FileListComponent } from '../pages/components/file-list/file-list.component';
import { RequestInfoBlock } from '../pages/components/request-info-block/request-info-block.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    TableSubheaderFileComponent,
    FileListComponent,
    RequestInfoBlock,
  ],
  imports: [
    CommonModule,
    UiModule,
    DirectivesModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,

    FilterModule,
  ],
  exports: [
    CommonModule,
    UiModule,
    DirectivesModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,

    FilterModule,
    TableSubheaderFileComponent,
    FileListComponent,
    RequestInfoBlock,
  ]
})
export class SharedModule { }

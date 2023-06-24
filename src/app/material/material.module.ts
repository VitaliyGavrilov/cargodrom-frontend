import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PopupDialogComponent } from './components/popup-dialog/popup-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { EditorHeaderComponent } from './components/editor-header/editor-header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FocusInitialDirective } from './directives/focus-initial.directive';
import {MatTableModule} from '@angular/material/table';
import { PhoneMaskDirective } from './directives/phone-mask.directive';


@NgModule({
  declarations: [
    PopupDialogComponent,
    PaginatorComponent,
    EditorHeaderComponent,
    FocusInitialDirective,
    PhoneMaskDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
  ],
  exports: [
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCheckboxModule,
    PopupDialogComponent,
    PaginatorComponent,
    EditorHeaderComponent,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FocusInitialDirective,
    MatTableModule,
    PhoneMaskDirective,
  ]
})
export class MaterialModule { }

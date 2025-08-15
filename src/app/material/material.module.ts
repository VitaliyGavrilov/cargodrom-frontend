import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';

// CDK Modules
import { DragDropModule } from '@angular/cdk/drag-drop'; // <-- Добавьте этот импорт

// DateAdapter Configuration
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule
} from '@angular/material/core';
import { CustomDateAdapter } from '../adapters/custom-date.adapter';

// Components & Directives
import { PopupDialogComponent } from './components/popup-dialog/popup-dialog.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { EditorHeaderComponent } from './components/editor-header/editor-header.component';
import { FocusInitialDirective } from './directives/focus-initial.directive';
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

    // Material Modules
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    
    DragDropModule, // <-- Добавьте этот модуль в imports
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
  ],
  exports: [
    // Re-export all Material modules
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    
    DragDropModule, // <-- И экспортируйте его

    // Your custom components & directives
    PopupDialogComponent,
    PaginatorComponent,
    EditorHeaderComponent,
    FocusInitialDirective,
    PhoneMaskDirective,
  ]
})
export class MaterialModule {}

// import { Injectable, NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { MatDialogModule } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatSelectModule } from '@angular/material/select';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatInputModule } from '@angular/material/input';  // Добавлено
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatTableModule } from '@angular/material/table';
// import { MatButtonToggleModule } from '@angular/material/button-toggle';
// import { MatTabsModule } from '@angular/material/tabs';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// import { PopupDialogComponent } from './components/popup-dialog/popup-dialog.component';
// import { PaginatorComponent } from './components/paginator/paginator.component';
// import { EditorHeaderComponent } from './components/editor-header/editor-header.component';
// import { FocusInitialDirective } from './directives/focus-initial.directive';
// import { PhoneMaskDirective } from './directives/phone-mask.directive';
// import { MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';  // Опционально, если используется стандартный адаптер
// import {MatRadioModule} from '@angular/material/radio';

// @Injectable()
// export class AppDateAdapter extends NativeDateAdapter {
//   override getFirstDayOfWeek(): number {
//     return 1;
//   }
//   override parse(value: any,): Date | null {
//     if((typeof value === 'string') && (value.indexOf('/') > -1)) {
//       const str = value.split('/');
//       const year = Number(str[0]);
//       const month = Number(str[1]) - 1;
//       const date = Number(str[2]);
//       return new Date(year, month, date);
//     }
//     const timestamp = typeof value === 'number' ? value : Date.parse(value);
//     return isNaN(timestamp) ? null : new Date(timestamp);
//   }
//   override format(date: Date, displayFormat: string): string {
//     if(displayFormat === 'input') {
//       const day = date.getDate();
//       const month = date.getMonth() + 1;
//       const year = date.getFullYear();
//       return `${year}/${month}/${day}`;
//     } else if(displayFormat === 'inputMonth') {
//       const month = date.getMonth() + 1;
//       const year = date.getFullYear();
//       return `${year}/${month}`;
//     } else {
//       return date.toDateString();
//     }
//   }

// }

// @NgModule({
//   declarations: [
//     PopupDialogComponent,
//     PaginatorComponent,
//     EditorHeaderComponent,
//     FocusInitialDirective,
//     PhoneMaskDirective,
//   ],
//   imports: [
//     CommonModule,
//     RouterModule,
//     FormsModule,
//     ReactiveFormsModule,
//     MatDialogModule,
//     MatFormFieldModule,
//     MatSelectModule,
//     MatSnackBarModule,
//     MatAutocompleteModule,
//     MatInputModule,  // Добавлено
//     MatCheckboxModule,
//     MatButtonModule,
//     MatDatepickerModule,
//     MatTableModule,
//     MatButtonToggleModule,
//     MatTabsModule,
//     MatMenuModule,
//     MatProgressSpinnerModule,
//     MatNativeDateModule,  // Только если используете стандартный адаптер
//     MatRadioModule,
//   ],
//   exports: [
//     MatDialogModule,
//     MatFormFieldModule,
//     MatSelectModule,
//     MatSnackBarModule,
//     MatAutocompleteModule,
//     MatInputModule,
//     MatCheckboxModule,
//     PopupDialogComponent,
//     PaginatorComponent,
//     EditorHeaderComponent,
//     MatButtonModule,
//     MatDatepickerModule,
//     FocusInitialDirective,
//     MatTableModule,
//     PhoneMaskDirective,
//     MatButtonToggleModule,
//     MatTabsModule,
//     MatMenuModule,
//     MatProgressSpinnerModule,
//     MatNativeDateModule,
//     MatRadioModule,
//   ]
// })
// export class MaterialModule {}














// import { RouterModule } from '@angular/router';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatSelectModule } from '@angular/material/select';
// import { MatFormFieldModule } from '@angular/material/form-field';
// // import { MatNativeDateModule } from '@angular/material/core';
// // import { MatOptionModule } from '@angular/material/core';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { PopupDialogComponent } from './components/popup-dialog/popup-dialog.component';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatInputModule } from '@angular/material/input';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { PaginatorComponent } from './components/paginator/paginator.component';
// import { EditorHeaderComponent } from './components/editor-header/editor-header.component';
// import { MatButtonModule } from '@angular/material/button';
// // import { MatDateRangePicker, MatDatepickerModule } from '@angular/material/datepicker';
// import { FocusInitialDirective } from './directives/focus-initial.directive';
// import { MatTableModule} from '@angular/material/table';
// import { PhoneMaskDirective } from './directives/phone-mask.directive';
// // import { MatButtonToggleModule} from '@angular/material/button-toggle';
// import { MatTabsModule} from '@angular/material/tabs';
// import { MatMenuModule} from '@angular/material/menu';
// import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// // import { MatOptionModule } from '@angular/material/select';
// // import { MatNativeDateModule } from '@angular/material/datepicker';

// import { MatButtonToggleModule } from '@angular/material/button-toggle';
// import { MatDatepickerModule, MatDateRangePicker, MatNativeDateModule } from '@angular/material/datepicker';
// import { MatOptionModule } from '@angular/material/select';




// @NgModule({
//   declarations: [
//     PopupDialogComponent,
//     PaginatorComponent,
//     EditorHeaderComponent,
//     FocusInitialDirective,
//     PhoneMaskDirective,
//   ],
//   imports: [
//     CommonModule,
//     RouterModule,
//     FormsModule,
//     ReactiveFormsModule,
//     MatDialogModule,
//     MatFormFieldModule,
//     MatSelectModule,
//     MatOptionModule,
//     MatSnackBarModule,
//     MatAutocompleteModule,
//     MatCheckboxModule,
//     MatButtonModule,
//     MatDatepickerModule,
//     MatNativeDateModule,
//     MatTableModule,
//     MatButtonToggleModule,
//     MatTabsModule,
//     MatMenuModule,
//     MatProgressSpinnerModule,
//   ],
//   exports: [
//     MatDialogModule,
//     MatFormFieldModule,
//     MatSelectModule,
//     MatOptionModule,
//     MatSnackBarModule,
//     MatAutocompleteModule,
//     MatInputModule,
//     MatCheckboxModule,
//     PopupDialogComponent,
//     PaginatorComponent,
//     EditorHeaderComponent,
//     MatButtonModule,
//     MatDatepickerModule,
//     MatNativeDateModule,
//     FocusInitialDirective,
//     MatTableModule,
//     PhoneMaskDirective,
//     MatButtonToggleModule,
//     MatTabsModule,
//     MatMenuModule,
//     MatProgressSpinnerModule,

//   ]
// })
// export class MaterialModule { }

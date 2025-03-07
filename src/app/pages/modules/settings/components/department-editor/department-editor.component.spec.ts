// import { SystemService } from './../../../../../api/services/system.service';
// import { Component, Input } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterTestingModule } from '@angular/router/testing';
// import { MaterialModule } from '@cargodrom/material/material.module';
// import { Observable, of } from 'rxjs';
// import { CompanyService } from './../../../../../api/services/company.service';

// import { DepartmentEditorComponent } from './department-editor.component';

// @Component({
//   selector: 'app-department-employee',
//   template: ``
// }) class DepartmentEmployeeComponent {
//   @Input() departmentId?: number;
// }

// describe('DepartmentEditorComponent', () => {
//   let component: DepartmentEditorComponent;
//   let fixture: ComponentFixture<DepartmentEditorComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [DepartmentEditorComponent, DepartmentEmployeeComponent],
//       imports: [
//         MaterialModule,
//         FormsModule,
//         ReactiveFormsModule,
//         RouterTestingModule,
//         NoopAnimationsModule,
//       ],
//       providers: [
//         {
//           provide: CompanyService, useValue: {
//             companyDepartmentList: () => of({items: [], total: 0}),
//             companyDepartmentInfo: () => of({name: 'Title'}),
//           }
//         },
//         {
//           provide: SystemService, useValue: <SystemService>{
//             systemTaxSystem: () => of([]) as Observable<any>,
//             systemAssociation: () => of([]) as Observable<any>,
//           }
//         },
//       ]
//     })
//       .compileComponents();

//     fixture = TestBed.createComponent(DepartmentEditorComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

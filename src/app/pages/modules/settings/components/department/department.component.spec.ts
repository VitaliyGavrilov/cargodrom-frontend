// import { ReactiveFormsModule } from '@angular/forms';
// import { FormsModule } from '@angular/forms';
// import { Department } from './../../../../../api/custom_models/department';
// import { RouterTestingModule } from '@angular/router/testing';
// import { CompanyService } from './../../../../../api/services/company.service';
// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { DepartmentComponent } from './department.component';
// import { of } from 'rxjs';
// import { MaterialModule } from '@cargodrom/material/material.module';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// describe('DepartmentComponent', () => {
//   let component: DepartmentComponent;
//   let fixture: ComponentFixture<DepartmentComponent>;
//   const name = 'Department Name';
//   let tableBody: HTMLElement;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [DepartmentComponent],
//       providers: [
//         {
//           provide: CompanyService,
//           useValue: {
//             companyDepartmentList: () => of({items: [{name} as Department], total: 1}),
//             companyEmployeeList: () => of({items: [], total: 0}),
//           }
//         }
//       ],
//       imports: [
//         RouterTestingModule,
//         MaterialModule,
//         NoopAnimationsModule,
//         FormsModule,
//         ReactiveFormsModule,
//       ]
//     })
//       .compileComponents();

//     fixture = TestBed.createComponent(DepartmentComponent);
//     component = fixture.componentInstance;
//     tableBody = fixture.nativeElement.querySelector('tbody');
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should show department name', () => {
//     expect(tableBody.textContent).toContain(name);
//   });
// });

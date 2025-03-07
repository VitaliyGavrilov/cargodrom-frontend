// import { NgxMaskModule } from 'ngx-mask';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CompanyService } from 'src/app/api/services/company.service';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterTestingModule } from '@angular/router/testing';
// import { MaterialModule } from '@cargodrom/material/material.module';
// import { of } from 'rxjs';

// import { PositionEditorComponent } from './position-editor.component';
// import { SystemService } from 'src/app/api/services';

// describe('PositionEditorComponent', () => {
//   let component: PositionEditorComponent;
//   let fixture: ComponentFixture<PositionEditorComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ PositionEditorComponent ],
//       imports: [
//         MaterialModule,
//         FormsModule,
//         ReactiveFormsModule,
//         RouterTestingModule,
//         NoopAnimationsModule,
//         NgxMaskModule.forRoot({}),
//       ],
//       providers: [
//         {
//           provide: CompanyService, useValue: {
//             companyPositionList: () => of({items: [], total: 0}),
//             companyPositionInfo: () => of({name: 'Title'}),
//           }
//         },
//         {
//           provide: SystemService, useValue: <Partial<SystemService>>{
//           }
//         }
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(PositionEditorComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

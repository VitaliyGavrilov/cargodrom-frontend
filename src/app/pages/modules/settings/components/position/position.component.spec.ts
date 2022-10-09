import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CompanyService } from './../../../../../api/services/company.service';
import { MaterialModule } from './../../../../../material/material.module';
import { PositionComponent } from './position.component';

describe('PositionComponent', () => {
  let component: PositionComponent;
  let fixture: ComponentFixture<PositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PositionComponent,
      ],
      imports: [
        MaterialModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: CompanyService, useValue: {
            companyPositionList: () => of([])
          }
        },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

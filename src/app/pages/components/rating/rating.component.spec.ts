import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RatingComponent } from './rating.component';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [RatingComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show 4/10 score', () => {
    const score = 4;
    component.setScore(score);
    fixture.detectChanges();
    const ratingElement: HTMLElement = fixture.nativeElement;
    expect(ratingElement.textContent).toContain(`${score}/10`);
    expect(ratingElement.querySelectorAll('.sel').length).toEqual(score);
  });

  it('should show update score when 3th star clicked', fakeAsync(() => {
    const starNumberFromOne = 3;
    const starNumberFromZero = starNumberFromOne - 1;
    const expectedScore = starNumberFromOne;
    const ratingElement: HTMLElement = fixture.nativeElement;
    const stars = ratingElement.querySelectorAll('span.stars>span');
    const star = stars[starNumberFromZero] as HTMLElement;
    star.click();
    tick();
    fixture.detectChanges();
    expect(component.score).toEqual(expectedScore);
  }));

});

import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RatingComponent
    }
  ]
})
export class RatingComponent implements OnInit, ControlValueAccessor {
  @Input() total: number = 10;
  @Input() units: string = 'NPS';

  score: number = 0;
  stars = new Array<boolean>(this.total).fill(false);
  isDisabled = false;
  private touched = false;

  onChange = (value: number) => {};
  onTouched = () => {};
  
  constructor() { }

  ngOnInit(): void {
  }

  writeValue(score: number): void {
    this.score = +score;
    this.fillStars();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled; 
  }

  getAsText(): string {
    return `${this.score}/${this.total} ${this.units}`;
  }
  
  setScore(score: number): void {
    if (this.isDisabled) {
      return;
    }
    this.score = score;
    this.fillStars();
    this.onChange(this.score);
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }
  
  fillStars(): void {
    for (let i = 0; i < this.total; i++) {
      this.stars[i] = i < this.score;
    }
  }

}

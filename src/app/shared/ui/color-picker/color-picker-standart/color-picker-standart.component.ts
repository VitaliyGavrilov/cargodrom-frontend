import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-color-picker-standart',
  templateUrl: './color-picker-standart.component.html',
  styleUrls: ['./color-picker-standart.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerStandartComponent),
      multi: true
    }
  ]
})
export class ColorPickerStandartComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder: string = 'Выберите цвет';
  @Input() disabled: boolean = false;
  @Input() preferredPlacement: 'top' | 'bottom' = 'bottom';
  @Input() standartColor: string = '';
  
  color: string = '#000000';
  currentColor: any = '#000000';
  isOpen: boolean = false;
  history: string[] = [];
  
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    if (this.standartColor != '') this.history.push(this.standartColor);
    if (this.color != '') this.currentColor = this.color;
  }

  writeValue(value: string): void {
    if (value && this.isValidColor(value)) {
      this.color = value;
      this.currentColor = value;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleTouched(): void {
    this.onTouched();
  }

  togglePicker(): void {
    if (this.disabled) return;
    
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.handleTouched();
    }
  }

  closePicker(): void {
    this.isOpen = false;
  }

  apply(): void {
    this.onColorChange(this.currentColor);
  }

  onColorChange(colorEvent: string | any): void {
    if (colorEvent && colorEvent != this.color) {
      this.addColorInHistory(this.color);
      this.color = colorEvent;
      this.onChange(this.color);
    }
  }

  addColorInHistory(color: string): void {
    if (this.history[0] != color && !this.history.includes(color)) {
      this.history.splice(1, 0, color);
    }
    if (this.history.length > 9) this.history.pop();
  }

  private isValidColor(color: string): boolean {
    const s = new Option().style;
    s.color = color;
    return s.color !== '';
  }
}
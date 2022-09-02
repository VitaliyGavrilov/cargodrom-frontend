import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trade-direction',
  templateUrl: './trade-direction.component.html',
  styleUrls: ['./trade-direction.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TradeDirectionComponent
    }
  ]
})
export class TradeDirectionComponent implements OnInit, ControlValueAccessor {
  readonly directions = [
    { value: 'all', label: 'Все', checked: false },
    { value: 'import', label: 'Импорт', checked: false },
    { value: 'export', label: 'Экспорт', checked: false },
    { value: 'local', label: 'Перевозки внутри страны', checked: false },
  ];

  onChangeFn = (value: string[]) => { };
  onTouchedFn = () => { };

  constructor() {
  }

  ngOnInit(): void {
  }

  writeValue(value: string[]): void {
    if (!Array.isArray(value)) {
      return;
    }
    this.directions.forEach((direction) => {
      direction.checked = value.includes(direction.value);
    });
    this.directions[0].checked = this.directions.slice(1).every(r => r.checked);
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  onChange(i: number) {
    if (i === 0) {
      const checked = !this.directions[0].checked;
      this.directions.forEach(r => r.checked = checked);
    } else {
      this.directions[i].checked = !this.directions[i].checked;
      this.directions[0].checked = this.directions.slice(1).every(direction => direction.checked);
    }
    const value: string[] = this.directions.slice(1).filter(direction => direction.checked).map(r => r.value);
    this.onChangeFn(value);
  }

}

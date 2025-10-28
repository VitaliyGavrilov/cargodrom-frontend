import { Component, forwardRef, Input, HostListener, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type DropdownPlacement = 'top' | 'bottom';

@Component({
  selector: 'app-color-picker-demo',
  templateUrl: './color-picker-demo.component.html',
  styleUrls: ['./color-picker-demo.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerDemoComponent),
      multi: true
    }
  ]
})
export class ColorPickerDemoComponent implements ControlValueAccessor, AfterViewInit, OnDestroy, OnInit {
  @Input() placeholder: string = 'Выберите цвет';
  @Input() disabled: boolean = false;
  @Input() preferredPlacement: DropdownPlacement = 'bottom';
  @Input() standartColor:string=''
  
  @ViewChild('container') container!: ElementRef;

  color: string = '#000000';
  currentColor: any = '#000000';
  isOpen: boolean = false;
  placement: DropdownPlacement = 'bottom';
  history:string[]=[];
  
  private resizeObserver: ResizeObserver | null = null;
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    if(this.standartColor!='')this.history.push(this.standartColor);
    if(this.color!='')this.currentColor=this.color;
  }

  ngAfterViewInit(): void {
    this.setupResizeObserver();
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  // Публичный метод для вызова onTouched
  handleTouched(): void {
    this.onTouched();
  }

  private setupResizeObserver(): void {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.isOpen) {
          this.updateDropdownPosition();
        }
      });
      
      this.resizeObserver.observe(this.container.nativeElement);
    }
  }

  private updateDropdownPosition(): void {
    if (!this.container) return;

    const containerElement = this.container.nativeElement;
    const rect = containerElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownHeight = 320;
    
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (this.preferredPlacement === 'bottom' && spaceBelow >= dropdownHeight) {
      this.placement = 'bottom';
    } else if (this.preferredPlacement === 'top' && spaceAbove >= dropdownHeight) {
      this.placement = 'top';
    } else if (spaceBelow >= dropdownHeight) {
      this.placement = 'bottom';
    } else if (spaceAbove >= dropdownHeight) {
      this.placement = 'top';
    } else {
      this.placement = spaceBelow >= spaceAbove ? 'bottom' : 'top';
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!this.isOpen || !target) return;
    
    const clickedInside = target.closest('.color-picker-container');
    if (!clickedInside) {
      this.closePicker();
    }
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onWindowChange(): void {
    if (this.isOpen) {
      this.updateDropdownPosition();
    }
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

  togglePicker(): void {
    if (this.disabled) return;
    
    if (!this.isOpen) {
      this.updateDropdownPosition();
    }
    
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.handleTouched();
    }
  }

  closePicker(): void {
    this.isOpen = false;
  }

  apply(){
    this.onColorChange(this.currentColor)
  }

  onColorChange(colorEvent: string|any): void {
    if (colorEvent && colorEvent!=this.color) {
      this.addColorInHistory(this.color);
      this.color = colorEvent;
      this.onChange(this.color);
      
    }
  }

  addColorInHistory(color:string){
    // Проверяем, что цвет не равен первому элементу И не содержится в истории
    if(this.history[0] != color && !this.history.includes(color)) this.history.splice(1, 0, color); // Добавляет color на позицию с индексом 1
    // Удалем последний элемент из истории если история больше 9
    if(this.history.length>9) this.history.pop();
  }

  private isValidColor(color: string): boolean {
    const s = new Option().style;
    s.color = color;
    return s.color !== '';
  }
}
import { 
  Directive, 
  ElementRef, 
  Input, 
  Output, 
  EventEmitter, 
  HostListener, 
  OnInit,
  OnDestroy,
  Optional,
  Self,
  NgZone
} from '@angular/core';
import { NgControl, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[appAutocomplete]'
})
export class AutocompleteDirective implements OnInit, OnDestroy, ControlValueAccessor {
  @Input('appAutocomplete') data: any[] = [];
  @Input() valueField: string = '';
  @Input() displayField: string = '';
  @Input() selectorClass: string = '';

  @Output() valueChange = new EventEmitter<any>();

  private dropdown!: HTMLElement;
  private inputElement: HTMLInputElement;
  private isDropdownOpen = false;
  private filteredData: any[] = [];
  private selectedValue: any = null;

  // ControlValueAccessor methods
  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(
    private el: ElementRef,
    private ngZone: NgZone,
    @Optional() @Self() private ngControl: NgControl
  ) {
    this.inputElement = this.el.nativeElement;
    
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.createDropdown();
    this.filteredData = [...this.data];
  }

  ngOnDestroy() {
    this.closeDropdown();
    if (this.dropdown && this.dropdown.parentNode) {
      this.dropdown.parentNode.removeChild(this.dropdown);
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const value = this.inputElement.value.toLowerCase();
    this.filterData(value);
    this.openDropdown();
    
    if (value && this.selectedValue) {
      this.selectedValue = null;
      this.onChange(null);
    }
  }

  @HostListener('focus')
  onFocus() {
    this.ngZone.run(() => {
      if (this.filteredData.length > 0 || !this.inputElement.value) {
        this.filterData('');
        this.openDropdown();
      }
      this.onTouched();
    });
  }

  @HostListener('blur')
  onBlur() {
    this.ngZone.run(() => {
      setTimeout(() => this.closeDropdown(), 150);
      this.onTouched();
    });
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.isDropdownOpen) return;

    const items = this.dropdown.querySelectorAll('.autocomplete-item');
    const activeItem = this.dropdown.querySelector('.autocomplete-item.active');

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.navigateDropdown(items, 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.navigateDropdown(items, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (activeItem) {
          const value = JSON.parse(activeItem.getAttribute('data-value')!);
          this.ngZone.run(() => this.selectItem(value));
        }
        break;
      case 'Escape':
        this.closeDropdown();
        break;
    }
  }

  private createDropdown() {
    this.dropdown = document.createElement('div');
    this.dropdown.className = 'autocomplete-dropdown';
    
    if (this.selectorClass) {
      this.dropdown.classList.add(this.selectorClass);
    }

    this.positionDropdown();
    document.body.appendChild(this.dropdown);
    this.closeDropdown();
  }

  private positionDropdown() {
    const rect = this.inputElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    this.dropdown.style.position = 'absolute';
    this.dropdown.style.top = (rect.bottom + scrollTop) + 'px';
    this.dropdown.style.left = (rect.left + scrollLeft) + 'px';
    this.dropdown.style.width = rect.width + 'px';
    this.dropdown.style.zIndex = '1000';
  }

  private filterData(searchTerm: string) {
    if (!searchTerm) {
      this.filteredData = [...this.data];
      return;
    }

    this.filteredData = this.data.filter(item => {
      if (typeof item === 'object') {
        return Object.values(item).some(value => 
          String(value).toLowerCase().includes(searchTerm)
        );
      } else {
        return String(item).toLowerCase().includes(searchTerm);
      }
    });
  }

  private openDropdown() {
    if (this.filteredData.length === 0) {
      this.closeDropdown();
      return;
    }

    this.isDropdownOpen = true;
    this.positionDropdown();
    this.renderDropdown();
    this.dropdown.style.display = 'block';
  }

  private closeDropdown() {
    this.isDropdownOpen = false;
    if (this.dropdown) {
      this.dropdown.style.display = 'none';
    }
  }

  private renderDropdown() {
    this.dropdown.innerHTML = '';

    this.filteredData.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'autocomplete-item';
      
      const value = this.getValue(item);
      itemElement.setAttribute('data-value', JSON.stringify(value));
      itemElement.textContent = this.getDisplayText(item);

      itemElement.addEventListener('click', () => {
        this.ngZone.run(() => {
          this.selectItem(value);
        });
      });

      itemElement.addEventListener('mouseenter', () => {
        this.removeActiveClasses();
        itemElement.classList.add('active');
      });

      this.dropdown.appendChild(itemElement);
    });
  }

  private getValue(item: any): any {
    if (typeof item === 'object' && this.valueField) {
      return item[this.valueField];
    }
    return item;
  }

  private getDisplayText(item: any): string {
    if (typeof item === 'object') {
      if (this.displayField) {
        return item[this.displayField];
      } else if (this.valueField) {
        return item[this.valueField];
      } else {
        return Object.values(item)[0] as string;
      }
    }
    return String(item);
  }

  private selectItem(value: any) {
    const selectedItem = this.data.find(item => {
      const itemValue = this.getValue(item);
      return itemValue === value;
    });

    if (selectedItem) {
      this.inputElement.value = this.getDisplayText(selectedItem);
      this.selectedValue = value;
      
      this.onChange(value);
      this.valueChange.emit(value);
      
      if (this.ngControl && this.ngControl.control) {
        this.ngControl.control.setValue(value);
      }
    }

    this.closeDropdown();
  }

  private navigateDropdown(items: NodeListOf<Element>, direction: number) {
    const currentActive = this.dropdown.querySelector('.autocomplete-item.active');
    let nextIndex = 0;

    if (currentActive) {
      const currentIndex = Array.from(items).indexOf(currentActive);
      nextIndex = currentIndex + direction;
      
      if (nextIndex < 0) nextIndex = items.length - 1;
      if (nextIndex >= items.length) nextIndex = 0;
    }

    this.removeActiveClasses();
    if (items[nextIndex]) {
      items[nextIndex].classList.add('active');
      (items[nextIndex] as HTMLElement).scrollIntoView({
        block: 'nearest'
      });
    }
  }

  private removeActiveClasses() {
    this.dropdown.querySelectorAll('.autocomplete-item.active').forEach(item => {
      item.classList.remove('active');
    });
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.setDisplayValue(value);
    } else {
      this.inputElement.value = '';
      this.selectedValue = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.inputElement.disabled = isDisabled;
  }

  private setDisplayValue(value: any) {
    this.selectedValue = value;
    
    const displayItem = this.data.find(item => {
      const itemValue = this.getValue(item);
      return itemValue === value;
    });

    if (displayItem) {
      this.inputElement.value = this.getDisplayText(displayItem);
    } else {
      this.inputElement.value = String(value);
    }
  }
}
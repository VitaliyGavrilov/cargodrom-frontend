// focus-first-invalid.directive.ts
import { Directive, HostListener, Input, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Directive({
  selector: 'form[formGroup]'
})
export class FocusFirstInvalidDirective {
  @Input() formGroup!: FormGroup;

  constructor(private el: ElementRef) {}

  @HostListener('submit', ['$event'])
  onFormSubmit(event: Event) {
    if (this.formGroup.invalid) {
      event.preventDefault();
      event.stopPropagation();
      this.focusOnFirstInvalidControl();
    }
  }

  private focusOnFirstInvalidControl() {
    // Помечаем все контролы как touched
    this.markFormGroupTouched(this.formGroup);

    // Находим первый невалидный элемент
    const firstInvalidElement = this.el.nativeElement.querySelector(
      '.ng-invalid, [formControlName].ng-invalid, mat-form-field.ng-invalid'
    );

    if (firstInvalidElement) {
      // Фокусируемся на input внутри элемента
      const inputElement = firstInvalidElement.querySelector('input, select, textarea, ng-select, mat-select, app-contact-editor') || firstInvalidElement;

      if (inputElement.focus) {
        inputElement.focus();

        // Прокручиваем к элементу
        inputElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
      }
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormControl) {
        control.markAsTouched();
      }
    });
  }
}

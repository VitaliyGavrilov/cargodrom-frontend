import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  OnDestroy,
  Optional,
  Host
} from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appSelectClear]'
})
export class SelectClearDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private clearButton!: HTMLButtonElement;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Optional() @Host() private matSelect: MatSelect,
    @Optional() private ngControl: NgControl
  ) {}

  ngOnInit(): void {
    if (!this.matSelect) {
      console.warn('SelectClearDirective: MatSelect not found');
      return;
    }

    // Ждем пока mat-select инициализируется
    setTimeout(() => this.addClearButton(), 0);

    // Следим за изменениями значения
    this.matSelect.valueChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toggleClearButton();
      });
  }

  private addClearButton(): void {
    // Находим контейнер со стрелкой
    const arrowWrapper = this.elementRef.nativeElement.querySelector('.mat-mdc-select-arrow-wrapper');

    if (!arrowWrapper) {
      console.warn('SelectClearDirective: Arrow wrapper not found');
      return;
    }

    // Создаем кнопку для сброса
    this.clearButton = this.renderer.createElement('button');
    this.renderer.setAttribute(this.clearButton, 'type', 'button');
    this.renderer.addClass(this.clearButton, 'select-clear-button');

    // Добавляем крестик как SVG
    this.clearButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    `;

    // Обработчик клика
    this.renderer.listen(this.clearButton, 'click', (event) => {
      event.stopPropagation();
      this.clearValue();
    });

    // Вставляем перед стрелкой
    this.renderer.insertBefore(
      arrowWrapper.parentNode,
      this.clearButton,
      arrowWrapper
    );

    // Изначально скрываем кнопку
    this.toggleClearButton();
  }

  private clearValue(): void {
    if (this.matSelect) {
      this.matSelect.value = null;
    }

    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(null);
    }

    // Триггерим событие изменения
    this.matSelect.valueChange.emit(null);
  }

  private toggleClearButton(): void {
    if (!this.clearButton) return;

    const hasValue = this.matSelect?.value != null && this.matSelect.value !== '';

    if (hasValue) {
      this.renderer.removeClass(this.clearButton, 'hidden');
    } else {
      this.renderer.addClass(this.clearButton, 'hidden');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.clearButton) {
      this.clearButton.remove();
    }
  }
}

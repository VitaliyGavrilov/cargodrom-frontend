import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFocusInitial]'
})
export class FocusInitialDirective implements AfterViewInit {

  constructor(
    private element: ElementRef,
  ) { }

  ngAfterViewInit(): void {
    this.element.nativeElement.focus();
  }

}

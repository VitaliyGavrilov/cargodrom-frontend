// icon-color.directive.ts
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appIconColor]'
})
export class IconColorDirective implements OnInit {
  @Input('appIconColor') color: string = 'currentColor';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.applyStyles();
  }

  private applyStyles() {
    const element = this.el.nativeElement;
    
    // Устанавливаем CSS переменную
    element.style.setProperty('--icon-color', this.color);
    
    // Добавляем класс для применения стилей
    element.classList.add('icon-colored');
  }
}
// // icon-color.directive.ts
// import { Directive, ElementRef, Input, OnInit } from '@angular/core';

// @Directive({
//   selector: '[appIconColor]'
// })
// export class IconColorDirective implements OnInit {
//   @Input('appIconColor') color: string = 'currentColor';

//   constructor(private el: ElementRef) {}

//   ngOnInit() {
//     console.log('IconColorDirective',this.color);
//     this.applyStyles();
//   }

//   private applyStyles() {
//     const element = this.el.nativeElement;
    
//     element.style.maskImage = getComputedStyle(element).backgroundImage;
//     element.style.webkitMaskImage = getComputedStyle(element).backgroundImage;
//     element.style.backgroundImage = 'none';
//     element.style.backgroundColor = this.color;
//     element.style.maskRepeat = 'no-repeat';
//     element.style.webkitMaskRepeat = 'no-repeat';
//     element.style.maskPosition = 'center';
//     element.style.webkitMaskPosition = 'center';
//   }
// }
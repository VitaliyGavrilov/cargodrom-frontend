import { Component, Input } from '@angular/core';

export type IconName = 'defolt'
  | 'cancel' // крест 
  | 'repeat' // повтор
  | 'back' // назад
;

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
})
export class IconComponent {
  @Input() name: IconName = 'defolt';
  @Input() color: string = 'currentColor';
  @Input() width: string = '24px';
  @Input() height: string = '24px';
}
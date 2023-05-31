import { Component, Input } from '@angular/core';

@Component({
  template: '',
  selector: 'app-paginator',
})
export class PaginatorMockup {
  @Input() limits: any;
  @Input() start: number | undefined;
  @Input() count: number | undefined;
  @Input() total: number | undefined;
}

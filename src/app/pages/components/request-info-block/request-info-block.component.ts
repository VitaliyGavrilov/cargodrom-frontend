import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-request-info-block',
  templateUrl: './request-info-block.component.html',
  styleUrls: ['./request-info-block.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class RequestInfoBlock {
  @Input() request?: any;
  @Input() isExpandedRequestInfo: boolean=false;
  constructor(
  ) { }
}

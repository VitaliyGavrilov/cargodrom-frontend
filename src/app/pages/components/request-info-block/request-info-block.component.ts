import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-request-info-block',
  templateUrl: './request-info-block.component.html',
  styleUrls: ['./request-info-block.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class RequestInfoBlock implements OnInit {
  @Input() request?: any;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}

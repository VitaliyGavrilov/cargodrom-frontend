import { Component, Inject, OnInit, ViewEncapsulation  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupDialogData } from './popup-dialog-data';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class PopupDialogComponent implements OnInit {

  trustedMessages: SafeHtml[];

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: PopupDialogData
  ) {
    this.trustedMessages = data.messages.map(message => this.sanitizer.bypassSecurityTrustHtml( message ));
  }

  ngOnInit(): void {
  }


}

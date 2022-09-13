import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PopupDialogData} from "../components/popup-dialog/popup-dialog-data";
import {PopupDialogComponent} from "../components/popup-dialog/popup-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(
    public dialog: MatDialog
  ) { }

  alert( arr: any): void {
    const data: PopupDialogData = {
      title: ( arr.title ? arr.title : 'Сообщение системы' ),
      messages: ( Array.isArray( arr.message ) ? arr.message : [ arr.error.message ] )
    }
    this.dialog.open(PopupDialogComponent, {data});
  }

  error( arr: any): void {
    let errors;
    if( arr.error.error_message_description ){
      errors = {
        title: (
          arr.error.error_message ? arr.error.error_message :
            ( arr.title ? arr.title :
              'Сообщение системы')
        ),
        messages:  ( Array.isArray( arr.error.error_message_description ) ? arr.error.error_message_description : [ arr.error.error_message_description ] )
      }
    }else{
      errors = {
        title: ( arr.title ? arr.title : 'Сообщение системы' ),
        messages:  ( Array.isArray( arr.error.error_message ) ? arr.error.error_message : [ arr.error.error_message ] )
      }
    }

    const data: PopupDialogData = errors;
    this.dialog.open(PopupDialogComponent, {data});
  }

  note( str: any): void {
    let arr = {
        'message': str
    }
    this.alert(arr);
  }
}

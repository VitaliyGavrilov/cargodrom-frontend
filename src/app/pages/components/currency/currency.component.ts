import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  @Input() name?: string;
  @Input() code?: string;
  @Input() rate?: number;

  

  constructor() { }

  ngOnInit(): void {
  }

}

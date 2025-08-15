import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { interval, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { SystemService } from 'src/app/api/services';
import { CurrencyService } from '../../services/сurrency/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private _destroy$ = new Subject();

  // isVisiblePopap = false;

  currencyList:any[]=[];
  currencySummary:any={};

  // @ViewChild('currencyDialog') currencyDialog!: TemplateRef<void>;

  constructor(
    private systemService: SystemService,
    private matDialog: MatDialog,
    private currencyService: CurrencyService,
  ) { }

  ngOnInit(): void {
    // this.updateCurrency();
    this.subscribeCurrency();
    this.subscribeSummary();
  }

  private subscribeCurrency(){
    this.currencyService.currencies$  
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(currencies => {
      this.currencyList = currencies;
      console.log('currencies',currencies);
    });
  }
  private subscribeSummary(){
    this.currencyService.summary$  
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(summary => {
      this.currencySummary = summary;
      console.log('summary',summary);
    });
  }

  updateCurrency(){
    this.currencyService.refresh();
  }

  // openDialog() {
  //   // this.matDialog.open(this.currencyDialog);
  //   this.matDialog.open(this.currencyDialog).afterClosed().subscribe((res:any) => {
  //     console.log(123);
      
  //   });
  // }

  // getCurrency(){
  //   this.systemService.systemCurrency().pipe(
  //     tap((currencyList) => {
  //     }),
  //     takeUntil(this._destroy$)
  //   ).subscribe({
  //     next: (currencyList) => {
  //       console.log('currencyList',currencyList);
        
  //       this.currencyList=currencyList;
  //     },
  //     error: (err) => {
  //       console.log('ошибка получения валют в хеадере');
  //     }
  //   });
  // }

  // updateCurrency() {
  //   interval(600000)// Запускаем интервал каждые 10 минут (600000 миллисекунд)
  //   .pipe(
  //     startWith(0), // Начинаем сразу с первого вызова
  //     switchMap(() => this.systemService.systemCurrency()), // Отменяем предыдущий запрос и делаем новый
  //     takeUntil(this._destroy$)
  //   )
  //   .subscribe({
  //     next: (currencyList) => {
  //       console.log('currencyList', currencyList);
  //       this.currencyList = currencyList;
  //     },
  //     error: (err) => {
  //       console.log('Ошибка получения валют в хеадере', err);
  //     }
  //   });
  // }
} 

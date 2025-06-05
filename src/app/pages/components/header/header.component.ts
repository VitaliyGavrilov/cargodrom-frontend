import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { interval, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { SystemService } from 'src/app/api/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private _destroy$ = new Subject();

  isVisiblePopap = false;

  currencyList:any={};

  // @ViewChild('currencyDialog') currencyDialog!: TemplateRef<void>;

  constructor(
    private systemService: SystemService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.updateCurrency();
  }
  // openDialog() {
  //   // this.matDialog.open(this.currencyDialog);
  //   this.matDialog.open(this.currencyDialog).afterClosed().subscribe((res:any) => {
  //     console.log(123);
      
  //   });
  // }

  getCurrency(){
    this.systemService.systemCurrency().pipe(
      tap((currencyList) => {
      }),
      takeUntil(this._destroy$)
    ).subscribe({
      next: (currencyList) => {
        console.log('currencyList',currencyList);
        
        this.currencyList=currencyList;
      },
      error: (err) => {
        console.log('ошибка получения валют в хеадере');
      }
    });
  }

  updateCurrency() {
    interval(600000)// Запускаем интервал каждые 10 минут (600000 миллисекунд)
    .pipe(
      startWith(0), // Начинаем сразу с первого вызова
      switchMap(() => this.systemService.systemCurrency()), // Отменяем предыдущий запрос и делаем новый
      takeUntil(this._destroy$)
    )
    .subscribe({
      next: (currencyList) => {
        console.log('currencyList', currencyList);
        this.currencyList = currencyList;
      },
      error: (err) => {
        console.log('Ошибка получения валют в хеадере', err);
      }
    });
  }
} 

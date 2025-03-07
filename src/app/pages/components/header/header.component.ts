import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { SystemService } from 'src/app/api/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private _destroy$ = new Subject();

  currencyList:any[]=[];

  constructor(
    private systemService: SystemService,
  ) { }

  ngOnInit(): void {
    this.getCurrency();
  }

  getCurrency(){
      this.systemService.systemCurrency().pipe(
        tap((currencyList) => {
        }),
        takeUntil(this._destroy$)
      ).subscribe({
        next: (currencyList) => {
          this.currencyList=currencyList;
        },
        error: (err) => {
          console.log('ошибка получения валют в хеадере');

        }
      });
    }

}

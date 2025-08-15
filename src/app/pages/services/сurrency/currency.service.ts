import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, interval, Observable } from 'rxjs';
import {
  startWith,
  switchMap,
  takeUntil,
  tap,
  catchError,
} from 'rxjs/operators';
import { SystemService } from 'src/app/api/services/system.service';

import {
  Currency,
  CurrencyResponse,
  CurrencySummary,
} from './currency.interfaces';
import { LoaderService } from '../loader.service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService implements OnDestroy {
  private _destroy$ = new Subject<void>();

  private _currencies$ = new BehaviorSubject<Currency[]>([]);
  public currencies$ = this._currencies$.asObservable();

  private _summary$ = new BehaviorSubject<CurrencySummary | null>(null);
  public summary$ = this._summary$.asObservable();

  constructor(
    private systemService: SystemService,
    private loaderService: LoaderService
  ) {
    this.initCurrencyUpdates();
  }

  private initCurrencyUpdates(): void {
    interval(600000)
      .pipe(
        startWith(0),
        switchMap(() => this.loadCurrencyData()),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  private loadCurrencyData(): Observable<void> {
    return this.loaderService.wrapRequests<{ currencies: any }>({
      currencies: this.systemService.systemCurrency()
    }).pipe(
      tap((response) => {
        const normalizedResponse = this.normalizeResponse(response.currencies);
        this._currencies$.next(normalizedResponse.current);
        this._summary$.next(normalizedResponse.summary);
      }),
      catchError(err => {
        console.error('Currency update error', err);
        return [];
      }),
      // Явно указываем тип void для завершения цепочки
      switchMap(() => [])
    );
  }

  private normalizeResponse(response: any): CurrencyResponse {
    return {
      current: response?.current ?? [],
      summary: response?.summary ?? { title: '', rows: [] },
    };
  }

  public getCurrencies(): Currency[] {
    return this._currencies$.getValue();
  }

  public getSummary(): CurrencySummary | null {
    return this._summary$.getValue();
  }

  public refresh(): void {
    this.loadCurrencyData().pipe(takeUntil(this._destroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}

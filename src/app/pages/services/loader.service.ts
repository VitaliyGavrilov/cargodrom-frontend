import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { forkJoin, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private activeRequests: string[] = [];
  private isLoading = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoading.asObservable();

  // Основной метод для обработки объекта с запросами
  wrapRequests<T>(requestsObject: { [key: string]: Observable<any> }): Observable<T> {
    // Добавляем все ключи в активные запросы
    const requestKeys = Object.keys(requestsObject);
    this.addRequests(requestKeys);

    // Создаем обернутые observables с автоматическим удалением ключей
    const wrappedRequests = {} as { [key: string]: Observable<any> };
    
    for (const key of requestKeys) {
      wrappedRequests[key] = requestsObject[key].pipe(
        finalize(() => this.removeRequest(key))
      );
    }

    // Возвращаем forkJoin с обернутыми запросами
    return forkJoin(wrappedRequests) as Observable<T>;
  }

  private addRequests(keys: string[]) {
    this.activeRequests = [...this.activeRequests, ...keys];
    this.updateLoadingState();
    // console.log('Added requests:', keys);
  }

  private removeRequest(key: string) {
    this.activeRequests = this.activeRequests.filter(k => k !== key);
    this.updateLoadingState();
    // console.log('Removed request:', key);
  }

  private updateLoadingState() {
    const shouldBeLoading = this.activeRequests.length > 0;
    if (shouldBeLoading !== this.isLoading.value) {
      this.isLoading.next(shouldBeLoading);
    }
    // console.log('Current active requests:', this.activeRequests);
  }
}
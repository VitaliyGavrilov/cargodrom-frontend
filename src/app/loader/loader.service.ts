import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private activeRequests = 0;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();

  show(): void {
    this.activeRequests++;
    if (this.activeRequests === 1) {
      this.isLoadingSubject.next(true);
    }
  }

  hide(): void {
    if (this.activeRequests > 0) this.activeRequests--;
    if (this.activeRequests === 0) {
      setTimeout(() => {
        if (this.activeRequests === 0) {
          this.isLoadingSubject.next(false);
        }
      }, 1500); // Задержка скрытия
    }
  }
}
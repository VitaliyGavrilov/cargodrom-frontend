import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  showLoader() {
    this.isLoading.next(true);
    console.log('loader true');
  }

  hideLoader() {
    console.log('loader false');
    setTimeout(() => this.isLoading.next(false), 1000);
  }
}


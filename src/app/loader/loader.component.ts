import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { LoaderService } from './loader.service';

// loader.component.ts
@Component({
  selector: 'app-global-loader',
  template: `
    <div *ngIf="isLoading" class="global-loader">
      <div class="spinner"></div>
      <!-- <div class="debug-info">
        Debug: {{ debugInfo }}
      </div> -->
    </div>
  `,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  isLoading = false;
  debugInfo = '';
  private subscription?: Subscription;

  constructor(
    public loadingService: LoaderService,
  ) {}

  ngOnInit() {
    console.log('[LoaderComponent] Component initialized');
    this.subscription = this.loadingService.isLoading$.subscribe(loading => {
      console.log(`[LoaderComponent] Loading state changed: ${loading}`);
      this.isLoading = loading;
      this.debugInfo = `Active: ${loading}`;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}

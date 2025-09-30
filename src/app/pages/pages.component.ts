import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { Observable } from 'rxjs';
import { BrandingService } from './pages.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PagesComponent implements OnInit {
  isLoading$!: Observable<boolean>;

  colors$: Observable<string>;

  constructor(
    private loaderService: LoaderService,
    private cdRef: ChangeDetectorRef , // ← Добавляем
    private pageService: BrandingService,
  ) {
    this.colors$ = this.pageService.getColors(); 
  }

  ngOnInit(): void {
    this.isLoading$ = this.loaderService.isLoading$;
    
    // Если сервис сразу эмитит значение, можно вручную запустить проверку
    this.cdRef.detectChanges();
  }
}

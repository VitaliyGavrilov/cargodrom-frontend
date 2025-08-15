import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PagesComponent implements OnInit {
  isLoading$!: Observable<boolean>;

  constructor(
    private loaderService: LoaderService,
    private cdRef: ChangeDetectorRef  // ← Добавляем
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.loaderService.isLoading$;
    
    // Если сервис сразу эмитит значение, можно вручную запустить проверку
    this.cdRef.detectChanges();
  }
}

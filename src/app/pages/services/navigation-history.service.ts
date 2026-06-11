// src/app/pages/services/navigation-history.service.ts
import { Injectable } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface NavigationHistoryEntry {
  url: string; // Полный URL с query параметрами
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationHistoryService {
  private history: NavigationHistoryEntry[] = [];
  private maxHistoryLength = 50;

  constructor(private router: Router) {
    this.setupNavigationTracking();
  }

  private setupNavigationTracking(): void {
    this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.addToHistory(event.urlAfterRedirects);
        this.printHistoryToConsole();
      });
  }

  private addToHistory(fullUrl: string): void {
    if (!this.isPagesModuleUrl(fullUrl)) {
      return;
    }

    // Получаем путь без query параметров для сравнения
    const pathWithoutParams = this.removeQueryParams(fullUrl);

    // Проверяем, не является ли этот путь дублем последней записи (без учета query параметров)
    if (this.isSamePath(pathWithoutParams)) {
      // Обновляем последнюю запись с новыми query параметрами
      this.updateLastEntry(fullUrl);
      return;
    }

    // Если путь изменился - добавляем новую запись
    const navigationEntry: NavigationHistoryEntry = {
      url: fullUrl,
      timestamp: new Date()
    };

    this.history.push(navigationEntry);

    if (this.history.length > this.maxHistoryLength) {
      this.history.shift();
    }
  }

  private isPagesModuleUrl(url: string): boolean {
    return true; // Записывать все URL
    // return url.startsWith('/pages') || url === '/pages';
  }

  private removeQueryParams(url: string): string {
    return url.split('?')[0];
  }

  private isSamePath(currentPath: string): boolean {
    if (this.history.length === 0) return false;

    const lastEntry = this.history[this.history.length - 1];
    const lastEntryPath = this.removeQueryParams(lastEntry.url);
    return lastEntryPath === currentPath;
  }

  private updateLastEntry(newUrl: string): void {
    if (this.history.length > 0) {
      this.history[this.history.length - 1].url = newUrl;
      this.history[this.history.length - 1].timestamp = new Date();
    }
  }

  private printHistoryToConsole(): void {
    console.log('📜 Navigation History Array:', this.history);
  }

  /**
   * Возвращает на предыдущую страницу
   * @param fallbackUrl - альтернативный URL, используется только если история пустая
   */
  back(fallbackUrl: string): void {
    if (this.history.length > 1) {
      // Удаляем текущую страницу из истории
      this.history.pop();

      // Получаем предыдущую страницу
      const previousEntry = this.history[this.history.length - 1];
      this.router.navigateByUrl(previousEntry.url);
    } else if (this.history.length === 1) {
      // Если в истории только одна запись - удаляем ее и переходим на fallback
      this.history.pop();
      this.router.navigateByUrl(fallbackUrl);
    } else {
      // Если история полностью пустая - используем fallback
      this.router.navigateByUrl(fallbackUrl);
    }
  }

  /**
   * Получить всю историю навигации
   */
  getHistory(): NavigationHistoryEntry[] {
    return [...this.history];
  }

  /**
   * Получить последнюю запись в истории
   */
  getLastEntry(): NavigationHistoryEntry | null {
    return this.history.length > 0 ? this.history[this.history.length - 1] : null;
  }

  /**
   * Очистить историю навигации
   */
  clearHistory(): void {
    this.history = [];
    console.log('🗑️ Navigation history cleared');
  }

  /**
   * Получить количество записей в истории
   */
  getHistoryLength(): number {
    return this.history.length;
  }
  //TODO: обьединить сервис истории навигации с сервисом навигации или настроить их взаимодействие 
}

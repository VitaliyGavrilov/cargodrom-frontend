import { Injectable } from '@angular/core';
import { SettingsService } from 'src/app/api/services';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

/**
 * Сервис для работы с настройками приложения (брендинг, темы, настройки страниц)
 */
@Injectable({
  providedIn: 'root'
})
export class BrandingService {
  private readonly baseLink = environment.production?'https://cargodrom.com/':'https://dev.cargodrom.com/';

  // Subject для хранения ссылки на логотип
  private logoLinkSubject = new BehaviorSubject<string>('');

  // Subject для хранения CSS переменных цветов
  private colorsSubject = new BehaviorSubject<string>('');

  // Public observables для подписки на изменения
  public logoLink$ = this.logoLinkSubject.asObservable();
  public colors$ = this.colorsSubject.asObservable();

  constructor(private settingsService: SettingsService) {
    this.init();
  }

  /**
   * Инициализация сервиса - загрузка настроек
   */
  private init(): void {
    this.getSettings();
  }

  /**
   * Получить полную ссылку на логотип как Observable
   * @returns {Observable<string>} - Observable с полной ссылкой на логотип
   */
  getLogoLink(): Observable<string> {
    return this.logoLink$.pipe(
      map(logoLink => logoLink !== '' ? this.baseLink + logoLink : '')
    );
  }

  /**
   * Получить полную ссылку на логотип как синхронное значение
   * @returns {string} - Текущая полная ссылка на логотип
   */
  getLogoLinkSync(): string {
    const logoLink = this.logoLinkSubject.value;
    return logoLink !== '' ? this.baseLink + logoLink : '';
  }

  /**
   * Получить CSS переменные цветов как Observable
   * @returns {Observable<string>} - Observable с CSS переменными для применения в стилях
   */
  getColors(): Observable<string> {
    return this.colors$;
  }

  /**
   * Получить CSS переменные цветов как синхронное значение
   * @returns {string} - Текущие CSS переменные в виде строки
   */
  getColorsSync(): string {
    return this.colorsSubject.value;
  }

  /**
   * Загрузка настроек с сервера
   */
  private getSettings(): void {
    this.settingsService.settingsGet().subscribe({
      next: (data) => {
        // Обработка логотипа
        if (data.branding_logo && data.branding_logo !== '') {
          this.logoLinkSubject.next(data.branding_logo);
        }

        // Обработка цветов
        if (data.branding_colors) {
          // const cssVariables = this.convertColorsToCssVariables(data.branding_colors);
          const cssVariables = data.branding_logo && data.branding_logo !== ''
            ?this.convertColorsToCssVariables(data.branding_colors) +` --logo_url:url(${this.getLogoLinkSync()}); --bg_size: cover;`
            :this.convertColorsToCssVariables(data.branding_colors);
          this.colorsSubject.next(cssVariables);
        }

        console.log('Branding service initialized:', {
          logoLink: this.logoLinkSubject.value,
          colors: this.colorsSubject.value
        });
      },
      error: (err) => {
        console.error('Ошибка загрузки настроек:', err);
      }
    });
  }

  /**
   * Конвертация объекта цветов в строку CSS переменных
   * @param {Object} colors - Объект с цветами (ключ-значение)
   * @returns {string} - Строка с CSS переменными для применения в атрибуте style
   */
  private convertColorsToCssVariables(colors: any): string {
    const cssVariables: string[] = [];

    Object.entries(colors).forEach(([key, value]) => {
      if (value && typeof value === 'string') {
        // Преобразуем ключ в kebab-case для CSS переменных
        const cssVarName = `--user-brend_${key.replace(/_/g, '_')}`;
        cssVariables.push(`${cssVarName}: ${value};`);
      }
    });

    return cssVariables.join(' ');
  }

  /**
   * Метод для ручного обновления логотипа
   * @param {string} newLogoLink - Новая ссылка на логотип (относительный путь)
   */
  updateLogoLink(newLogoLink: string): void {
    this.logoLinkSubject.next(newLogoLink);
  }

  /**
   * Метод для ручного обновления цветов
   * @param {Object} colors - Новый объект с цветами
   */
  updateColors(colors: any): void {
    const cssVariables = this.convertColorsToCssVariables(colors);
    this.colorsSubject.next(cssVariables);
  }

  /**
   * Получить все текущие настройки синхронно
   * @returns {Object} - Объект с текущими настройками
   */
  getCurrentSettings(): { logoLink: string; colors: string } {
    return {
      logoLink: this.getLogoLinkSync(),
      colors: this.getColorsSync()
    };
  }
}

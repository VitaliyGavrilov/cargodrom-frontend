import { Component, Injectable } from '@angular/core';
import { SettingsService as ApiSettingsService } from 'src/app/api/services';
import { takeUntil, tap } from 'rxjs/operators';
import { AddPopupComponent } from '../modules/settings/components/popap-table_filter-editor/popap-table_filter-editor.component';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

/**
 * Сервис для работы с меню настроек приложения
 * Предоставляет методы для загрузки и управления структурой меню настроек
 */
@Injectable({
  providedIn: 'root'
})
export class MySettingsService {
  private _menuGroups: MenuGroup[] = [];
  private _tableRows$ = new BehaviorSubject<any[]>([]); // Subject для хранения и передачи строк таблицы
  private _destroy$ = new Subject<void>(); // Subject для отписки

  constructor(
    private apiSettingsService: ApiSettingsService,
    private route: ActivatedRoute
  ) {}

  /**
   * Возвращает текущие группы меню настроек
   * @returns Массив групп меню с их элементами
   */
  getMenuGroups(): MenuGroup[] {
    return this._menuGroups;
  }

  /**
   * Загружает данные для меню настроек с сервера и инициализирует структуру меню
   * @returns Observable, который завершается после успешной загрузки и инициализации меню
   */
  loadMenuGroups() {
    return this.apiSettingsService.settingsFilterFormParam().pipe(
      tap(response => {
        this._menuGroups = this.buildMenuGroups(response.tables);
      })
    );
  }

  /**
   * Создает полную структуру меню настроек на основе данных с сервера
   * @param tables Массив таблиц, полученных с сервера, для раздела "Фильтры на формах"
   * @returns Полная структура меню настроек с статичными и динамическими разделами
   */
  private buildMenuGroups(tables: any[]): MenuGroup[] {
    return [
      this.createCommonSettingsGroup(),
      this.createCompanyStructureGroup(),
      this.createSystemGroup(),
      this.createTableFiltersGroup(tables),
      this.createDirectoriesGroup()
    ];
  }

  /**
   * Создает группу "Общие настройки"
   * @returns Группа меню с общими настройками приложения
   */
  private createCommonSettingsGroup(): MenuGroup {
    return {
      title: 'Общие настройки',
      cssClass: 'settings-common',
      expanded: false,
      items: [
        {
          title: 'Личные настройки',
          link: './personal'
        },
        {
          title: 'Организации',
          link: './company',
          canAdd: true,
          addButtonTitle: 'Добавить организацию'
        }
      ]
    };
  }

  /**
   * Создает группу "Структура организации"
   * @returns Группа меню с элементами структуры организации
   */
  private createCompanyStructureGroup(): MenuGroup {
    return {
      title: 'Структура организации',
      cssClass: 'settings-company-structure',
      expanded: false,
      items: [
        {
          title: 'Подразделения',
          link: './department',
          canAdd: true,
          addButtonTitle: 'Добавить подразделение'
        },
        {
          title: 'Должности',
          link: './position',
          canAdd: true,
          addButtonTitle: 'Добавить должность'
        },
        {
          title: 'Сотрудники',
          link: './employee',
          canAdd: true,
          addButtonTitle: 'Добавить сотрудника'
        }
      ]
    };
  }

  /**
   * Создает группу "Система"
   * @returns Группа меню с элементами системы
   */
  private createSystemGroup(): MenuGroup {
    return {
      title: 'Система',
      cssClass: 'settings-system',
      expanded: false,
      items: [
        {
          title: 'Общие настройки',
          link: './general-settings',
          canAdd: false,
          // addButtonTitle: 'Добавить подразделение'
        },
        {
          title: 'Брендирование',
          link: './branding',
          canAdd: false,
        },
        {
          title: 'Уведомления',
          link: './notifications',
          canAdd: false,
          // addButtonTitle: 'Добавить сотрудника'
        },
        // {
        //   title: 'Рассылки',
        //   link: './mailings',
        //   canAdd: false,
        //   // addButtonTitle: 'Добавить сотрудника'
        // }
      ]
    };
  }

  /**
   * Создает группу "Фильтры на формах" с динамическими элементами из API
   * @param tables Массив таблиц для преобразования в элементы меню
   * @returns Группа меню с фильтрами таблиц
   */
  private createTableFiltersGroup(tables: any[]): MenuGroup {
    return {
      title: 'Фильтры на формах',
      cssClass: 'settings-table-filter',
      expanded: false,
      items: this.transformTablesToMenuItems(tables)
    };
  }

  /**
   * Создает группу "Справочники"
   * @returns Группа меню со справочниками системы
   */
  private createDirectoriesGroup(): MenuGroup {
    return {
      title: 'Справочники',
      cssClass: 'settings-directory',
      expanded: false,
      items: [
        {
          title: 'Группы клиентов',
          link: './client-group',
          canAdd: true,
          addButtonTitle: 'Добавить группу'
        }
      ]
    };
  }

  /**
   * Преобразует массив таблиц из API в элементы меню
   * Обрабатывает формирование корректных URL и названий для множественного числа
   * @param tables Массив таблиц для преобразования
   * @returns Массив элементов меню для раздела фильтров таблиц
   */
  private transformTablesToMenuItems(tables: any[]): MenuItem[] {
    return tables.map(table => {
      // Формируем URL в множественном числе с обработкой исключений
      const pluralId = table.id;
      
      return {
        title: table.name,
        link: `./table-filter/${pluralId}`,
        canAdd: false,
        // addButtonTitle: 'Добавить новый фильтр',
        // addPopap: true,
        // popap: AddPopupComponent,
      };
    });
  }

  // /**
  //  * Преобразует идентификатор таблицы в форму множественного числа
  //  * @param tableId Идентификатор таблицы в единственном числе
  //  * @returns Идентификатор таблицы во множественном числе
  //  */
  // private getPluralTableId(tableId: string): string {
  //   // Обработка специальных случаев
  //   if (tableId === 'customer') {
  //     return 'customers';
  //   }
    
  //   // Стандартное правило - добавление 's' в конец
  //   if (!tableId.endsWith('s')) {
  //     return tableId + 's';
  //   }
    
  //   return tableId;
  // }

  /**
   * Загружает строки таблицы и обновляет BehaviorSubject
   * @param tableName Название таблицы для загрузки
   */
  loadTableRows(tableName: string) {
    this.apiSettingsService.settingsFilterList({ table: tableName }).pipe(
      takeUntil(this._destroy$)
    ).subscribe(rows => {
      if (rows.items != undefined) {
        this._tableRows$.next(rows.items);
      }
    });
  }
  

  /**
   * Возвращает Observable для подписки на изменения строк таблицы
   * @returns Observable с массивом строк таблицы
   */
  getTableRows$() {
    return this._tableRows$.asObservable();
  }

  /**
   * Обновляет данные в BehaviorSubject вручную
   * @param rows Новые данные для таблицы
   */
  updateTableRows(rows: any[]) {
    this._tableRows$.next(rows);
  }

  /**
   * Очищает ресурсы при уничтожении сервиса
   */
  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
    this._tableRows$.complete();
  }
}

/**
 * Интерфейс группы меню настроек
 */
interface MenuGroup {
  title: string;
  cssClass: string;
  expanded: boolean;
  items: MenuItem[];
}

/**
 * Интерфейс элемента меню настроек
 */
interface MenuItem {
  title: string;
  link: string;
  canAdd?: boolean;
  addPopap?: boolean;
  addButtonTitle?: string;
  popap?: any
}

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { MySettingsService } from '../../services/mySetting.service';
import { MatDialog } from '@angular/material/dialog';

interface MenuGroup {
  title: string;
  cssClass: string;
  expanded: boolean;
  items: MenuItem[];
}
interface MenuItem {
  title: string;
  link: string;
  canAdd?: boolean;
  addPopap?: boolean;
  addButtonTitle?: string;
  popap?:any;
}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject();
  settings: MenuGroup[] = [];
  activeMenuItem?: MenuItem;
  activeMenuGroup?: MenuGroup;
  routerEventSubscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private mySettingService: MySettingsService,
    private dialog: MatDialog,
    
  ) {
    this.routerEventSubscription = router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        this.detectMenuItemAndGroup();
      }
    });
  }

  ngOnInit(): void {
    this.mySettingService.loadMenuGroups().subscribe({
      next: () => {
        this.settings = this.mySettingService.getMenuGroups();
        this.detectMenuItemAndGroup();
      },
      error: (err) => console.error('Ошибка загрузки меню настроек', err)
    });
  }
  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
    this.routerEventSubscription.unsubscribe();
  }

  openPopap(popap:any){
    // this.dialog.open(popap, {data: { table: 'test',}
    //   // width: '500px',
    //   // data: { table: this.route.snapshot.params['table'],filter:filter }
    // });
    // Открываем диалоговое окно (AddPopupComponent) и передаем в него данные
    const dialogRef = this.dialog.open(popap);

    // Подписываемся на событие закрытия диалога
    dialogRef.afterClosed().subscribe(result => {
      // this.getTableRows();  // Обновляем данные таблицы после закрытия
      if(result){
        this.mySettingService.loadTableRows(result);
      }
      
    });
  }

  toggleGroup(group: MenuGroup): void {
    group.expanded = !group.expanded;
  }

  private detectMenuItemAndGroup(): void {
    for (const group of this.settings) {
      for (const item of group.items) {
        const urlTree = this.router.createUrlTree([item.link], { relativeTo: this.activatedRoute });
        const isActive = this.router.isActive(urlTree, { 
          paths: 'subset', 
          matrixParams: 'ignored', 
          queryParams: 'ignored', 
          fragment: 'ignored' 
        });
        
        if (isActive) {
          this.activeMenuItem = item;
          this.activeMenuGroup = group;
          this.activeMenuGroup.expanded = true;
          return;
        }
      }
    }
  }
}
// import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
// import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
// import { Subject, Subscription, takeUntil, tap } from 'rxjs';
// import { SettingsService } from 'src/app/api/services';

// interface MenuGroup {
//   title: string;
//   cssClass: string;
//   expanded: boolean;
//   items: MenuItem[];
// }

// interface MenuItem {
//   title: string;
//   link: string;
//   canAdd?: boolean;
//   addButtonTitle?: string;
// }
// interface Table {
//   id: string;
//   name: string;
// }

// @Component({
//   selector: 'app-settings',
//   templateUrl: './settings.component.html',
//   styleUrls: ['./settings.component.scss'],
//   encapsulation: ViewEncapsulation.None,
// })
// export class SettingsComponent implements OnInit, OnDestroy {
//   private _destroy$ = new Subject();

//   tableList:MenuItem[]=[];

//   settings: MenuGroup[] = [
//     {
//       title: 'Общие настройки',
//       cssClass: 'settings-common',
//       expanded: false,
//       items: [
//         {
//           title: 'Личные настройки',
//           link: './personal'
//         },
//         {
//           title: 'Организации',
//           link: './company',
//           canAdd: true,
//           addButtonTitle: 'Добавить организацию'
//         }
//       ]
//     },
//     {
//       title: 'Структура организации',
//       cssClass: 'settings-company-structure',
//       expanded: false,
//       items: [
//         {
//           title: 'Подразделения',
//           link: './department',
//           canAdd: true,
//           addButtonTitle: 'Добавить подразделение'
//         },
//         {
//           title: 'Должности',
//           link: './position',
//           canAdd: true,
//           addButtonTitle: 'Добавить должность'
//         },
//         {
//           title: 'Сотрудники',
//           link: './employee',
//           canAdd: true,
//           addButtonTitle: 'Добавить сотрудника'
//         }
//       ]
//     },
//     {
//       title: 'Фильтры на формах',
//       cssClass: 'settings-table-filter',
//       expanded: false,
//       items: this.tableList ,
//       // [
//       //   {
//       //     title: 'Запросы',
//       //     link: './table-filter/requests',
//       //     canAdd: true,
//       //     addButtonTitle: 'Добавить новый фильтр'
//       //   },
//       //   {
//       //     title: 'Подрядчики',
//       //     link: './table-filter/contractors',
//       //     canAdd: true,
//       //     addButtonTitle: 'Добавить новый фильтр'
//       //   },
//       //   {
//       //     title: 'Клиенты',
//       //     link: './table-filter/customer',
//       //     canAdd: true,
//       //     addButtonTitle: 'Добавить новый фильтр'
//       //   },
//       //   {
//       //     title: 'Заказы',
//       //     link: './table-filter/orders',
//       //     canAdd: true,
//       //     addButtonTitle: 'Добавить новый фильтр'
//       //   },
//       //   {
//       //     title: 'Ставки',
//       //     link: './table-filter/rates',
//       //     canAdd: true,
//       //     addButtonTitle: 'Добавить новый фильтр'
//       //   },
//       //   {
//       //     title: 'Тарифы',
//       //     link: './table-filter/tariffs',
//       //     canAdd: true,
//       //     addButtonTitle: 'Добавить новый фильтр'
//       //   },
      
//       // ]
//     },
//     {
//       title: 'Справочники',
//       cssClass: 'settings-directory',
//       expanded: false,
//       items: [
//         {
//           title: 'Группы клиентов',
//           link: './client-group',
//           canAdd: true,
//           addButtonTitle: 'Добавить группу'
//         },
//       ]
//     },
//   ];
//   activeMenuItem?: MenuItem;
//   activeMenuGroup?: MenuGroup;
//   routerEventSubscription: Subscription;

//   constructor(
//     private router: Router,
//     private activatedRoute: ActivatedRoute,
//     private settingService: SettingsService,
//   ) {
//     this.routerEventSubscription = router.events.subscribe(s => {
//       if (s instanceof NavigationEnd) {
//         this.detectMenuItemAndGroup();
//       }
//     });
//   }

//   ngOnInit(): void {
//     this.getSettingsTableFilterParam();
//   }

//   ngOnDestroy(): void {
//     this.routerEventSubscription.unsubscribe();
//   }

//   toggleGroup(group: MenuGroup): void {
//     group.expanded = !group.expanded;
//   }

//   private detectMenuItemAndGroup(): void {
//     for (const group of this.settings) {
//       for (const item of group.items) {
//         const urlTree = this.router.createUrlTree([item.link], { relativeTo: this.activatedRoute, });
//         const isActive = this.router.isActive(urlTree, { paths: 'subset', matrixParams: 'ignored', queryParams: 'ignored', fragment: 'ignored' });
//         if (isActive) {
//           this.activeMenuItem = item;
//           this.activeMenuGroup = group;
//           this.activeMenuGroup.expanded = true;
//           return;
//         }
//       }
//     }
//   }

//   private getSettingsTableFilterParam(){
//     this.settingService.settingsFilterFormParam()
//       .pipe(
//         tap((data)=> {
//           console.log('настройки фильтров таблиц',data)
//         }),
//         takeUntil(this._destroy$),
//       )
//       .subscribe({
//         next: (test) => {
//           const list = test.tables;
//           this.tableList = this.transformTablesToMenuItems(list);
//           console.log(this.tableList );
          

//         },
//         error: (err) => {console.log('ошибка получения данных для настроек фильтров таблиц ')}
//       })
//   }

//   transformTablesToMenuItems(tables: any[]): MenuItem[] {
//   return tables.map(table => {
//     // Формируем link: добавляем 's' к id для множественного числа (кроме исключений)
//     let pluralId = table.id;
    
//     // Обработка исключений для множественного числа
//     if (table.id === 'customer') {
//       pluralId = 'customers';
//     } else if (!table.id.endsWith('s')) {
//       pluralId = table.id + 's';
//     }
    
//     return {
//       title: table.name,
//       link: `./table-filter/${pluralId}`,
//       canAdd: true,
//       addButtonTitle: 'Добавить новый фильтр'
//     };
//   });
// }

// }

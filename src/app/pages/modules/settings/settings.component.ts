import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

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
  addButtonTitle?: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit, OnDestroy {

  settings: MenuGroup[] = [
    {
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
    },
    {
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
    },
    {
      title: 'Справочники',
      cssClass: 'settings-directory',
      expanded: false,
      items: [
        {
          title: 'Группы клиентов',
          link: './client-group',
          canAdd: true,
          addButtonTitle: 'Добавить группу'
        },
      ]
    },
  ];
  activeMenuItem?: MenuItem;
  activeMenuGroup?: MenuGroup;
  routerEventSubscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.routerEventSubscription = router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        this.detectMenuItemAndGroup();
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
  }

  toggleGroup(group: MenuGroup): void {
    group.expanded = !group.expanded;
  }

  private detectMenuItemAndGroup(): void {
    for (const group of this.settings) {
      for (const item of group.items) {
        const urlTree = this.router.createUrlTree([item.link], { relativeTo: this.activatedRoute, });
        const isActive = this.router.isActive(urlTree, { paths: 'subset', matrixParams: 'ignored', queryParams: 'ignored', fragment: 'ignored' });
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

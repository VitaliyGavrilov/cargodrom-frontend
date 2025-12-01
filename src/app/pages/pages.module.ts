import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from './components/header/header.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { TestPage } from './places/test-page/test-page.component';
import { TableList } from './table-list/table-list.component';
import { BaseTableComponent } from './table/components/base-table/base-table.componet';
import { CustomersTableComponent } from './table/components/base-table/customers-table.component';
import { NavigationHistoryService } from './services/navigation-history.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({

  declarations: [
    PagesComponent,
    HeaderComponent,
    CurrencyComponent,

    // EmployeeRegisterComponent,

    BaseTableComponent,
    CustomersTableComponent,
    TableList,
    TestPage,
  ],
  imports: [
    PagesRoutingModule,
    SharedModule,
  ],
  providers: [
    NavigationHistoryService,// Сервис будет доступен в рамках PagesModule
  ],
})
export class PagesModule { }

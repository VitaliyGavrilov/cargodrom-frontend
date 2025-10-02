import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from './components/header/header.component';
import { RequestComponent } from './components/request/request.component';
import { RequestEditorComponent } from './components/request-editor/request-editor.component';
import { OrderComponent } from './components/order/order.component';
import { BitComponent } from './components/bit/bit.component';
import { TariffComponent } from './components/tariff/tariff.component';
import { ReportComponent } from './components/report/report.component';
import { ClientComponent } from './components/client/client.component';
import { GuideComponent } from './components/guide/guide.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { ContractorComponent } from './components/contractor/contractor.component';
import { ContractorEditorComponent } from './components/contractor-editor/contractor-editor.component';
import { RatingComponent } from './components/rating/rating.component';
import { ContactEditorComponent } from './components/contact-editor/contact-editor.component';
import { TradeDirectionComponent } from './components/trade-direction/trade-direction.component';
import { MaterialModule } from '@cargodrom/material/material.module';
import { ClientEditorComponent } from './components/client-editor/client-editor.component';
import { ServicesComponent } from './components/services/services.component';
import { FileListComponent } from './components/file-list/file-list.component';
import { FilterModule } from '../filter/filter.module';
import { ResponsibilityMatrixComponent } from './components/responsibility-matrix/responsibility-matrix.component';
import { ResponsibilityRowComponent } from './components/responsibility-row/responsibility-row.component';
import { PlaceEditorComponent } from './components/place-editor/place-editor.component';
import { RequestServicesComponent } from './components/request-services-editor/request-services-editor.component';
import { ResponsibilityComponent } from './components/responsibility/responsibility.component';
import { RequestEditorTranslateComponent } from './components/request-editor-translate/request-editor-translate.component';
import { RequestRateComponent } from './components/request-rate/request-rate.component';
import { RateEditorComponent } from './components/rate-editor/rate-editor.component';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestInfoBlock } from './components/request-info-block/request-info-block.component';
import { RequestDetails } from './components/request-details/request-details.component';
import { RateInfoRow } from './components/request-details/rate-info-row/rate-info-row.component';
import { RateAddPoint } from './components/request-details/rate-add-point/rate-add-point.component';
import { RateAddTransporter } from './components/request-details/rate-add-transporter/rate-add-transporter.component';
import { RateAddCustoms } from './components/request-details/rate-add-customs/rate-add-customs.component';
import { OfferEditorComponent } from './components/offer-editor/offer-editor.component';
// import { RequestPage } from './places/request/request.component';
import { RequestTableComponent } from './components/request-table/request-table.component';
import { TableSubheaderFileComponent } from './components/table-subheader/file-subheader/file-subheader.component';

import { EmployeeRegisterComponent } from './components/employee-register/employee-register.component';
import { RateAddOther } from './components/request-details/rate-add-other/rate-add-other.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { OrderEditorComponent } from './components/order-editor/order-editor.component';
import { TestPage } from './places/test-page/test-page.component';
import { GridTableComponent } from './table/components/simple-table/grid-table.component';
import { LoadingInterceptor } from '../interceptors/loader.interceptor';
import { MessagePage } from './components/message/message.page';
import { MessageEditorComponent } from './components/message-editor/message-editor.component';
import { TableList } from './table-list/table-list.component';
import { BaseTableComponent } from './table/components/base-table/base-table.componet';
import { CustomersTableComponent } from './table/components/base-table/customers-table.component';
import { SettingsModule } from './modules/settings/settings.module';
import { IconComponent } from './icon/icon.component';
import { NavigationHistoryService } from './services/navigation-history.service';





@NgModule({
  
  declarations: [
    DashboardComponent,
    PagesComponent,
    HeaderComponent,
    RequestComponent,
    RequestEditorComponent,
    OrderComponent,
    OrderEditorComponent,
    BitComponent,
    TariffComponent,
    ReportComponent,
    ClientComponent,
    GuideComponent,
    CurrencyComponent,
    ContractorComponent,
    ContractorEditorComponent,
    RatingComponent,
    ContactEditorComponent,
    TradeDirectionComponent,
    ClientEditorComponent,
    ServicesComponent,
    FileListComponent,
    ResponsibilityMatrixComponent,
    ResponsibilityRowComponent,
    ResponsibilityComponent,
    PlaceEditorComponent,
    RequestServicesComponent,
    RequestEditorTranslateComponent,
    RequestRateComponent,
    RequestDetails,

    RateEditorComponent,


    RequestInfoBlock,
    RateInfoRow,
    RateAddPoint,
    RateAddTransporter,
    RateAddCustoms,
    RateAddOther,

    OfferEditorComponent,

    // RequestPage,
    //   RequestTableComponent,

    TableSubheaderFileComponent,
    // TableComponent,
    EmployeeRegisterComponent,

    TestPage,
    MessagePage,
    MessageEditorComponent,
    TableList,
    

    // SimpleTableComponent,
    BaseTableComponent,
    CustomersTableComponent,
    IconComponent

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FilterModule,
    NgScrollbarModule,
  ],
  providers: [
    NavigationHistoryService,// Сервис будет доступен в рамках PagesModule
  ],
  exports: [HeaderComponent, RequestComponent, IconComponent]
})
export class PagesModule { }

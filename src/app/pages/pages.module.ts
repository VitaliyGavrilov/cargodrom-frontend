import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from './components/header/header.component';
import { RequestComponent } from './components/request/request.component';
import { OrderComponent } from './components/order/order.component';
import { BitComponent } from './components/bit/bit.component';
import { TariffComponent } from './components/tariff/tariff.component';
import { ReportComponent } from './components/report/report.component';
import { ClientComponent } from './components/client/client.component';
import { GuideComponent } from './components/guide/guide.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { ContractorComponent } from './components/contractor/contractor.component';
import { ContractorFilterComponent } from './components/contractor-filter/contractor-filter.component';
import { ContractorEditorComponent } from './components/contractor-editor/contractor-editor.component';
import { RatingComponent } from './components/rating/rating.component';
import { ContactEditorComponent } from './components/contact-editor/contact-editor.component';
import { TradeDirectionComponent } from './components/trade-direction/trade-direction.component';
import { ResponsibilityEditorComponent } from './components/responsibility-editor/responsibility-editor.component';
import { MaterialModule } from '@cargodrom/material/material.module';
import { ClientFilterComponent } from './components/client-filter/client-filter.component';
import { ClientEditorComponent } from './components/client-editor/client-editor.component';
import { ServicesComponent } from './components/services/services.component';
import { NgxMaskModule } from 'ngx-mask';
import { FileListComponent } from './components/file-list/file-list.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    HeaderComponent,
    RequestComponent,
    OrderComponent,
    BitComponent,
    TariffComponent,
    ReportComponent,
    ClientComponent,
    GuideComponent,
    CurrencyComponent,
    ContractorComponent,
    ContractorFilterComponent,
    ContractorEditorComponent,
    RatingComponent,
    ContactEditorComponent,
    TradeDirectionComponent,
    ResponsibilityEditorComponent,
    ClientFilterComponent,
    ClientEditorComponent,
    ServicesComponent,
    FileListComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMaskModule.forChild(),
  ]
})
export class PagesModule { }

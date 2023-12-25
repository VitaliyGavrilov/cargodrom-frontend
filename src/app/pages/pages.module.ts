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
import { RequestFileListComponent } from './components/request-file/request-file.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    HeaderComponent,
    RequestComponent,
    RequestEditorComponent,
    OrderComponent,
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
    PlaceEditorComponent,
    RequestServicesComponent,
    RequestFileListComponent,

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FilterModule,
  ]
})
export class PagesModule { }

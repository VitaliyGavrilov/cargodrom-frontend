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
import { HttpClientModule } from '@angular/common/http';
import { RequestInfoBlock } from './components/request-info-block/request-info-block.component';
import { RequestDetails } from './components/request-details/request-details.component';
import { RateInfoRow } from './components/request-details/rate-info-row/rate-info-row.component';
import { RateAddPoint } from './components/request-details/rate-add-point/rate-add-point.component';
import { RateAddTransporter } from './components/request-details/rate-add-transporter/rate-add-transporter.component';
import { RateAddCustoms } from './components/request-details/rate-add-customs/rate-add-customs.component';




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

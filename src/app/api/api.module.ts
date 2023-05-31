/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { CargoService } from './services/cargo.service';
import { CompanyService } from './services/company.service';
import { ContractorService } from './services/contractor.service';
import { CustomerService } from './services/customer.service';
import { DirectionService } from './services/direction.service';
import { FileService } from './services/file.service';
import { RequestService } from './services/request.service';
import { SettingsService } from './services/settings.service';
import { SystemService } from './services/system.service';
import { TransportService } from './services/transport.service';
import { UserService } from './services/user.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    CargoService,
    CompanyService,
    ContractorService,
    CustomerService,
    DirectionService,
    FileService,
    RequestService,
    SettingsService,
    SystemService,
    TransportService,
    UserService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}

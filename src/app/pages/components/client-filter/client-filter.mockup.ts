import { Component, Input } from "@angular/core";
import { ClientFilter } from "src/app/api/custom_models";

@Component({
  selector: 'app-client-filter',
  template: ''
})
export class ClientFilterMockup {
  @Input() filter?: ClientFilter;
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ContractorRequestFormat, TaxSystem } from "../../custom_models";

@Injectable({
  providedIn: 'root'
})

export class VitRequestService {
  constructor(private readonly _http: HttpClient) {}

  public requestFormat():Observable<ContractorRequestFormat[]> {
    return this._http.get<ContractorRequestFormat[]>('https://cargodrom.com/api/1.0/request_type')
  }
}

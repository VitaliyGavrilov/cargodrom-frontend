import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject} from 'rxjs';
import { CargoService, CustomerService, DirectionService, RequestService, SystemService, TransportService } from 'src/app/api/services';
import { Location } from '@angular/common';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-request-editor-translate',
  templateUrl: './request-editor-translate.component.html',
  styleUrls: ['./request-editor-translate.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class RequestEditorTranslateComponent implements OnInit, OnDestroy {
  requestFormTranslateRu: FormGroup;
  requestFormTranslateNoRu: FormGroup;

  requestId:number=0;
  translateAuto:string[]=[];

  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 3000 };

  private _destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private requestService: RequestService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.requestFormTranslateRu = this.fb.group({
      departure_country_name: [, []],
      departure_city_name: [, []],
      departure_address: [, []],
      departure_point_name: [, []],
      arrival_country_name: [, []],
      arrival_city_name: [, []],
      arrival_address: [, []],
      arrival_point_name: [, []],
      incoterms_name: [, []],
      incoterms_city_name:[,[]],
      departure_flight_name: [, []],
      cargo_description: [, []],
      cargo_type_name: [, []],
      cargo_condition_carriage: [, []],
      cargo_places_count: [, []],
      cargo_places_volume: [, []],
      cargo_places_weight: [, []],
      cargo_places_density: [, []],
      cargo_places_paid_weight: [, []],
      cargo_dimensions: [, []],
      comment: [, []],
    });
    this.requestFormTranslateNoRu = this.fb.group({
      departure_country_name: [, []],
      departure_city_name: [, []],
      departure_address: [, []],
      departure_point_name: [, []],
      arrival_country_name: [, []],
      arrival_city_name: [, []],
      arrival_address: [, []],
      arrival_point_name: [, []],
      incoterms_name: [, []],
      incoterms_city_name:[,[]],
      departure_flight_name: [, []],
      cargo_description: [, []],
      cargo_type_name: [, []],
      cargo_condition_carriage: [, []],
      cargo_places_count: [, []],
      cargo_places_volume: [, []],
      cargo_places_weight: [, []],
      cargo_places_density: [, []],
      cargo_places_paid_weight: [, []],
      cargo_dimensions: [, []],
      comment: [, []],
    });
  }
  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this.requestId = Number(this.route.snapshot.paramMap.get('id'));
    this.getRequestTraqnslate(this.requestId);
  }

  test(e:string){
    return this.translateAuto?.includes(e)
  }

  private getRequestTraqnslate(id:number){
    this.requestService.requestTranslate({id}).pipe().subscribe({
      next: (translate:any) => {
        console.log('get',translate);

        this.requestFormTranslateRu.patchValue(translate.ru);
        this.requestFormTranslateNoRu.patchValue(translate.en );
        this.translateAuto=translate.translate_auto.en;
      },
      error: (err) => this.snackBar.open(`Ошибка получения перевода запроса: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }

  private updateRequestTraqnslate(){
    console.log('save',{id:this.requestId, ru:this.requestFormTranslateRu.value, en:this.requestFormTranslateNoRu.value});

    const body:any={id:this.requestId, ru:this.requestFormTranslateRu.value, en:this.requestFormTranslateNoRu.value}
    this.requestService.requestTranslateSave({body:body}).pipe().subscribe({
      next: () => {
        this.snackBar.open(`Перевод изменен`, undefined, this.snackBarWithShortDuration);
        window.location.reload();
      },
      error: (err) => this.snackBar.open(`Ошибка изменения перевода запроса: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }

  save(){
    this.updateRequestTraqnslate();
  }
  send(){
    this.router.navigate(['pages/request/bidding', this.requestId]);
  }
  remove():void {
    window.location.reload();
  }
}

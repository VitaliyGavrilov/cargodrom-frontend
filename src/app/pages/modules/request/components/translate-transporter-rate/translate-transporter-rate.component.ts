import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject} from 'rxjs';
import { RequestService } from 'src/app/api/services';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NavigationHistoryService } from '../../../../services/navigation-history.service';
import { BaseComponent } from 'src/app/shared/classes/base-component';

@Component({
  selector: 'editor-translate-transporter-rate',
  templateUrl: './translate-transporter-rate.component.html',
  styleUrls: ['./translate-transporter-rate.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})

export class TranslateTransporterRateComponent extends BaseComponent implements OnInit {
  rateId: number|null=null;
  requestId!: number;
  form: FormGroup;
  autoTranslateFilds:any;
  tKinds:any[]=[];
  transportKindKey!:string;
  activeServices:any[]=[];
  activeCustomServices:any[]=[];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private requestService: RequestService,
    private snackBar: MatSnackBar,
    private router: Router,
    private navigationHistoryService: NavigationHistoryService,
  ) {
    super();
    this.form = this.fb.group({
      request_id: [],
      en: this.createFormGroup(),
      ru: this.createFormGroup(),
    });
  }
  //form create metods
  createFormGroup(): FormGroup {
    return this.fb.group({
      transport_type: [''],
      departure_city: [''],
      departure_point: [''],
      departure_point_address: [''],
      arrival_city: [''],
      arrival_point: [''],
      arrival_address: [''],
      cargo: this.fb.group({
        cargo_description: [''],
        cargo_type_name: [''],
        cargo_condition_carriage: [''],
        cargo_places_count: [''],
        cargo_places_volume: [''],
        cargo_places_weight: [''],
        cargo_places_density: [''],
        cargo_places_paid_weight: [''],
        cargo_dimensions: ['']
      }),
      charges: this.fb.group({}),
      custom_services: this.fb.array([]),
      comment: ['']
    });
  }
  //ng metods
  ngOnInit(): void {
    // this.rateId = Number(this.route.snapshot.paramMap.get('rateId'));
    this.requestId = Number(this.route.snapshot.paramMap.get('requestId'));
    this.form.patchValue({request_id:this.requestId})
    this.getTranslate();
  }
  //form mtds
  private patchForms(data:any){
    this.form.patchValue(data);

    const ruForm = this.form.get('ru') as FormGroup;
    const ruCharge = ruForm.get('charges') as FormGroup;
    const enForm = this.form.get('en') as FormGroup;
    const enCharge = enForm.get('charges') as FormGroup;

      // Правильное заполнение custom_services через FormArray
    if (data.en?.custom_services && Array.isArray(data.en.custom_services)) {
      const enCustomServices = this.getCustomServices('en');
      enCustomServices.clear(); // Очищаем существующие значения

      data.en.custom_services.forEach((element: any) => {
        // Добавляем как FormControl с значением
        enCustomServices.push(this.fb.control(element));
      });
    }

    if (data.ru?.custom_services && Array.isArray(data.ru.custom_services)) {
      const ruCustomServices = this.getCustomServices('ru');
      ruCustomServices.clear();

      data.ru.custom_services.forEach((element: any) => {
        ruCustomServices.push(this.fb.control(element));
      });
    }


    this.updateCharges(ruCharge, data.ru.charges);
    this.updateCharges(enCharge, data.en.charges);

    console.log('form value',this.form);
  }
  private updateCharges(chargesForm:FormGroup, chargesData:any){
    if (!chargesData) return;
    // Очищаем существующие контролы
    Object.keys(chargesForm.controls).forEach(key => {
      chargesForm.removeControl(key);
    });
    // Добавляем новые контролы из данных
    Object.keys(chargesData).forEach(key => {
      chargesForm.addControl(key, this.fb.control(chargesData[key] || ''));
    });
  }
  //private metods
  private getTranslate(){
    this.requestService.requestRateTransporterTranslate({request_id:this.requestId}).pipe().subscribe({
      next: (translate:any) => {
        console.log('translate',translate);
        this.patchForms(translate);
        this.autoTranslateFilds=translate?.auto_translate;
        this.tKinds=translate?.param?.kinds;
        this.transportKindKey=translate?.param?.transport_kind_key;
        this.activeServices=translate?.param?.services;
        this.activeCustomServices=translate?.param?.custom_services;
      },
      error: (err) => this.snackBar.open(`Ошибка получения перевода запроса: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }
  private updateTraqnslate(){
    this.requestService.requestRateTransporterTranslateSave({body:this.form.value}).pipe().subscribe({
      next: () => {
        this.snackBar.open(`Перевод изменен`, undefined, this.snackBarWithShortDuration);
        // window.location.reload();
        // this.send();

        this.router.navigate(['/request/bidding/delivery', this.requestId]);

      },
      error: (err) => this.snackBar.open(`Ошибка изменения перевода запроса: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }
  // Геттер для удобного доступа к FormArray
  getCustomServices(lang: 'en' | 'ru'): FormArray {
    return this.form.get(`${lang}.custom_services`) as FormArray;
  }
  //publick metods
  getChargeKeys(lang: 'en' | 'ru'): string[] {
    const chargesForm = this.form.get(`${lang}.charges`) as FormGroup;
    return Object.keys(chargesForm?.controls || {});
  }
  isServiceActive(id: string | number): boolean {
    const numId = typeof id === 'string' ? parseInt(id, 10) : id;
    return Array.isArray(this.activeServices)
      ?this.activeServices.includes(numId)
      :false;
  }
  // returnHeight(text:string){
  //   const lineText = (text?.match(/\n/g) || []).length;
  //   const height = lineText>1? lineText * 20 : 20
  //   return height+'px';
  // }
  //interface
  save(){
    this.updateTraqnslate();
    // console.log(this.form.value);

  }
  remove():void {
    // window.location.reload();
    this.navigationHistoryService.back(`/request/details/final/${this.requestId}`);
  }
}
//форма запроса ставки
// потом перевод

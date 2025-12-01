import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, tap, debounceTime, distinctUntilChanged } from 'rxjs';
import { OrderService, RequestService, SystemService } from 'src/app/api/services';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-offer-editor',
  templateUrl: './offer-editor.component.html',
  styleUrls: ['./offer-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class OfferEditorComponent implements OnInit, OnDestroy {
  //ПЕРЕМЕННЫЕ
  kpForm!: FormGroup;
  offer!:any;
  offerId!: number;

  request!:any;

  readonly xlsxMimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  customExpansionRow:any=-1;
  deliveryExpansionRow:any=-1;
  storageExpansionRow:any=-1;

  currencyList:any=[];

  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 3000 };

  private _destroy$ = new Subject();

  calckStatus:boolean=false;

  @ViewChild('delRateDialogRef') delRateDialogRef!: TemplateRef<void>;

  //КОНСТРУКТОР
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private requestService: RequestService,
    private systemService: SystemService,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
    private orderService: OrderService,
  ) {
    this.kpForm = this.fb.group({
      uid: ['', Validators.required],
      param: this.fb.group({
        custom: this.createParamGroup(),
        storage: this.createParamGroup(),
        delivery: this.createParamGroup()
      }),
      valid: ['', Validators.required],
      status: [0, Validators.required],
      comment: ['']
    });
  }

  ngOnInit(): void {
    const segments = this.route.snapshot.url.map(s => s.path);
    this.offerId = segments[1] as unknown as number ;


    this.getOffer();
    this.getCurrency();

    this.subscribeForm();



  }
  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  subscribeForm(){
    this.kpForm.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged(),
      takeUntil(this._destroy$),
    )
    .subscribe((e:any) => {
      if(this.calckStatus) {
        console.log('lalala',e);
        this.getCalckOffer(e)
      } else {
        console.log('no lalala');
      }
    })
  }

  returnVisibilityOrdBtn():boolean{
    // Функция для проверки, есть ли элемент с полем main, равным true
    function hasMain(arr:any) {
      return arr.some((item:any) => item.main === true);
    }
    // Проверяем каждый массив
    return (hasMain(this.customRows.value) || !this.offer?.param?.custom.title) && (hasMain(this.storageRows.value) || !this.offer?.param?.storage.title) && (hasMain(this.deliveryRows.value) || !this.offer?.param?.delivery.title);
  }

  onMainFieldChange(rows:any, i:number, { checked }: MatCheckboxChange){
    if(checked){
      rows.controls.forEach((value:any, index:any) => {
        this.log(value)
        if(index!==i) value.patchValue({main: false})
      })
    }
  }

  log(any:any){
    console.log('log',any)
  }

  onValidChange(event:any){
    this.kpForm.patchValue({
      valid: formatDate(this.kpForm.value.valid,'yyyy-MM-dd','en-US')
    })
  }

  validReset(){
    // this.kpForm.controls['valid'].reset();
    this.kpForm.value.valid='';
  }

  returnValid():string{
    return this.kpForm.value.valid && this.kpForm.value.valid!='' && this.kpForm.value.valid!="0000-00-00"? formatDate(this.kpForm.value.valid,'dd MMMM yyyy','ru-US'): '';
  }

  getVal(obj: any, path: string ): any {
    if (!path.includes('/')) {
        return obj[path] !== undefined ? obj[path] : null;
    }
    const keys = path.split('/');
    for (const key of keys) {
      if (obj && obj.hasOwnProperty(key)) {
          obj = obj[key];
      } else {
          return null; // Если ключ не найден, возвращаем null
      }
    }
    return obj !== undefined ? obj : null; // Проверка на undefined
  }

  setChange(row?:any, bol?: boolean){
    this.calckStatus=true;
    //1 патчу текущую строку
    if(row && bol){
      row.patchValue({
        profit_changed: bol,
      })
    }

    if(row){
      //2 длеаю фолс во всех дугих строках во всех таблицах
      this.customRows.controls.forEach((value, index, array) => {
        if(value!==row) value.patchValue({ profit_changed: false })
      })
      this.storageRows.controls.forEach((value, index, array) => {
        if(value!==row) value.patchValue({ profit_changed: false })
      })
      this.deliveryRows.controls.forEach((value, index, array) => {
        if(value!==row) value.patchValue({ profit_changed: false })
      })
    }

  }
  resetAmount(table:any){
    table.controls['one_profit_amount'].reset();
  }
  resetPercent(table:any){
    table.controls['one_profit_percent'].reset();
  }

  onExpansionRowClick(){

  }
  onDelRowChange(rows: any, i:number){
    this.matDialog.open(this.delRateDialogRef).afterClosed().subscribe(res => {
      if (res) {
        this.delRate(rows.value[i].id);
        rows.removeAt(i);
      }
    });
  }


  // Form
  createParamGroup(): FormGroup {
    return this.fb.group({
      one_profit: [true],
      one_profit_amount: [0],
      one_profit_amount_currency: [0],
      one_profit_percent: [0],
      detail_items: [true],
      rows: this.fb.array([this.createRow()])
    });
  }
  createRow(): FormGroup {
    return this.fb.group({
      id: [0],
      main: [false],
      income_total_cost: [0],
      profit_amount: [0],
      profit_percent: [0],
      total_cost: [0],
      profit_changed: [false],
      services: this.fb.array([this.createService()])
    });
  }
  createService(): FormGroup {
    return this.fb.group({
      cost:[0],
      field: [''],
      profit_amount: [0],
      profit_percent: [0],
      total_cost: [0],
      select: [true]
    });
  }

  resetPage(){
    // this.router.navigate([]);
    location.reload()
  }

  //Rows
  get customRows(): FormArray {
    return (this.kpForm.get('param.custom.rows') as FormArray);
  }
  get storageRows(): FormArray {
    return (this.kpForm.get('param.storage.rows') as FormArray);
  }
  get deliveryRows(): FormArray {
    return (this.kpForm.get('param.delivery.rows') as FormArray);
  }

  returnRows(table_name:string): any {
    return this.kpForm.get(`param.${table_name}.rows`);
  }

  //Serv
  returnServiceControls(row:any): any {
    return (row.get('services').controls as FormArray);
  }

  //Add row
  // Добавление новой строки в 'rows' для custom
  addCustomRow(): void {
    const newRow = this.createRow();
    this.customRows.push(newRow);
  }
  // Добавление новой строки в 'rows' для storage
  addStorageRow(): void {
    const newRow = this.createRow();
    this.storageRows.push(newRow);
  }
  // Добавление новой строки в 'rows' для delivery
  addDeliveryRow(): void {
    const newRow = this.createRow();
    this.deliveryRows.push(newRow);
  }

  //Add serv
  // Добавление нового сервиса в 'services' внутри строки custom
  addServiceCustom(rowIndex: number): void {
    const row = this.customRows.at(rowIndex); // Получаем нужную строку
    const services = row.get('services') as FormArray;
    const newService = this.createService(); // Создаем новый элемент
    services.push(newService); // Добавляем новый элемент в 'services'
  }
  // Добавление нового сервиса в 'services' внутри строки storage
  addServiceStorage(rowIndex: number): void {
    const row = this.storageRows.at(rowIndex); // Получаем нужную строку
    const services = row.get('services') as FormArray;
    const newService = this.createService(); // Создаем новый элемент
    services.push(newService); // Добавляем новый элемент в 'services'
  }
  // Добавление нового сервиса в 'services' внутри строки delivery
  addServiceDelivery(rowIndex: number): void {
    const row = this.deliveryRows.at(rowIndex); // Получаем нужную строку
    const services = row.get('services') as FormArray;
    const newService = this.createService(); // Создаем новый элемент
    services.push(newService); // Добавляем новый элемент в 'services'
  }


  onSubmit(): void {
    this.saveOffer();
    if (this.kpForm.valid) {
      console.log(this.kpForm.value);
    } else {
      console.log('Form is invalid',this.kpForm.value);
    }
  }

  onCreateOrder(){
    this.requestService.requestOfferSave({body:this.kpForm.value}).pipe(
      tap((offer) => {
        console.log(offer);
      }),
      takeUntil(this._destroy$)
    ).subscribe({
      next: (offer) => {
        this.createOrder();
      },
      error: (err) => {
        this.snackBar.open(`Ошибка создания заказа: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }

  createOrder(){
    this.orderService.orderMakeFromOffer({body:{id: this.offer.id}}).pipe(
      tap((offer) => {
        console.log(offer);
      }),
      takeUntil(this._destroy$)
    ).subscribe({
      next: (offer) => {
        this.snackBar.open(`Заказ успешно создан`, undefined, this.snackBarWithShortDuration);
      },
      error: (err) => {
        this.snackBar.open(`Ошибка создания заказа: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }

  saveOffer(){
    this.requestService.requestOfferSave({body:this.kpForm.value}).pipe(
      tap((offer) => {
        console.log(offer);
      }),
      takeUntil(this._destroy$)
    ).subscribe({
      next: (offer) => {
        this.snackBar.open(`Кп уцспешно отредактированно`, undefined, this.snackBarWithShortDuration);
      },
      error: (err) => {
        this.snackBar.open(`Ошибка редактирования кп: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }

  delRate(rate_id:number){
    this.requestService.requestOfferDelRate({id: this.offer.id, rate_id:rate_id}).pipe(
      tap((offer) => {
        console.log(offer);
      }),
      takeUntil(this._destroy$)
    ).subscribe({
      next: (offer) => {
        this.snackBar.open(`Кп уцспешно отредактированно`, undefined, this.snackBarWithShortDuration);
      },
      error: (err) => {
        this.snackBar.open(`Ошибка редактирования кп: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }

  getOffer() {
    this.requestService.requestOfferInfo({id: this.offerId}).pipe(
      tap((offer) => {
        this.offer=offer;
        console.log(offer);
        this.calckStatus=false;
        this.fillFormWithData(offer);  // Метод для заполнения формы данными
        this.getRequest();

      }),
      takeUntil(this._destroy$)
    ).subscribe({
      next: (offer) => {

        console.log('Data loaded successfully');


      },
      error: (err) => {
        this.snackBar.open(`Ошибка получения кп: ` + err?.error?.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }

  getCalckOffer(offer:any) {
    this.requestService.requestOfferCalc({body:offer}).pipe(
      tap((offer) => {
        console.log(offer);
        this.calckStatus=false;
        this.fillFormWithData(offer);  // Метод для заполнения формы данными
      }),
      takeUntil(this._destroy$)
    ).subscribe({
      next: (offer) => {
        console.log('Data loaded successfully');

      },
      error: (err) => {
        this.snackBar.open(`Ошибка расчета кп: ` + err.error?.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }

  getRequest(){
    this.requestService.requestInfo({id:this.offer.request_id}).pipe(
      tap((currencyList) => {
        this.request=currencyList;
        console.log(this.request);

      }),
      takeUntil(this._destroy$)
    ).subscribe({
      next: (req) => {


      },
      error: (err) => {
        console.log('err');
        this.snackBar.open(`Ошибка получения запроса: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }

  getCurrency(){
    this.systemService.systemCurrency().pipe(
      tap((currencyList) => {
      }),
      takeUntil(this._destroy$)
    ).subscribe({
      next: (currencyList) => {
        this.currencyList=currencyList.current;
      },
      error: (err) => {
        this.snackBar.open(`Ошибка получения валют: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }

  getOfferTxt(){
    this.requestService.requestOfferTxt({body:{id:this.offer.id}}).pipe(
      tap((currencyList) => {
      }),
      takeUntil(this._destroy$)
    ).subscribe({
      next: ({name, data}) => {
        const dataUri = `data:${this.xlsxMimeType};base64,${data}`;
        const a = document.createElement('a');
        a.href = dataUri;
        a.download = name!;
        a.click();
      },
      error: (err) => {
        this.snackBar.open(`Ошибка получения валют: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }

  getOfferPdf(){
    this.requestService.requestOfferPdf({body:{id:this.offer.id}}).pipe(
      tap((currencyList) => {
      }),
      takeUntil(this._destroy$)
    ).subscribe({
      next: ({name, data}) => {
        const dataUri = `data:${this.xlsxMimeType};base64,${data}`;
        const a = document.createElement('a');
        a.href = dataUri;
        a.download = name!;
        a.click();
      },
      error: (err) => {
        this.snackBar.open(`Ошибка получения валют: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
      }
    });
  }

  fillFormWithData(offer: any): void {
    // Используем patchValue для заполнения формы
    this.kpForm.patchValue({
      uid: offer.uid,
      valid: offer.valid,
      status: offer.status,
      comment: offer.comment
    });
    // Заполняем вложенные объекты в param
    this.kpForm.get('param')?.patchValue({
      custom: offer.param.custom,
      storage: offer.param.storage,
      delivery: offer.param.delivery
    });
    // Заполняем строки в каждом разделе
    this.loadRowsData(this.customRows, offer.param.custom.rows);
    this.loadRowsData(this.storageRows, offer.param.storage.rows);
    this.loadRowsData(this.deliveryRows, offer.param.delivery.rows);
  }

  loadRowsData(rowsArray: FormArray, rowsData: any[]): void {
    // Очищаем текущие строки
    while (rowsArray.length) {
      rowsArray.removeAt(0);
    }
    // Добавляем новые строки на основе данных
    rowsData.forEach((row) => {
      const rowGroup = this.fb.group({
        id: [row.id],
        income_total_cost:[row.income_total_cost],
        profit_percent: [row.profit_percent],
        profit_amount: [row.profit_amount],
        total_cost: [row.total_cost],
        profit_changed: [false],
        main: [row.main],
        services: this.fb.array(row.services.map((service:any) => this.fb.group({
          field: [service.field],
          profit_amount: [service.profit_amount],
          profit_percent: [service.profit_percent],
          select: [service.select],
          cost: [service.cost],
          total_cost: [service.total_cost],
        })))
      });
      rowsArray.push(rowGroup);
    });
  }
}

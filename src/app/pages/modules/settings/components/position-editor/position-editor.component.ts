import { SettingsEditor } from './../../classes/settings-editor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Position } from './../../../../../api/custom_models/position';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../../../api/services/company.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { SystemService } from '../../../../../api/services';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-position-editor',
  templateUrl: './position-editor.component.html',
  styleUrls: ['./position-editor.component.scss']
})
export class PositionEditorComponent extends SettingsEditor<Position> implements OnInit {
  private entity = 'Должность';
  editTitle = 'Информация о должности';
  newTitle = 'Добавление должности';
  savedMessage = `${this.entity} сохранена`;
  removedMessage = `${this.entity} удалена`;
  createdMessage = `${this.entity} создана`;
  notFoundMessage = `${this.entity} не найдена`;

  // permissionSchema:any={
  //   columns: [
  //     {name: "Запросы", field:'request'},
  //     {name: "Ставки", field:'rate'},
  //     {name: "Заказы", field:'order'},
  //     {name: "Тарифы", field:'tariff'},
  //     {name: "Подрядчики", field:'contractor'},
  //     {name: "Отчеты", field:'report'},
  //     {name: "Клиенты", field:'customer'},
  //     {name: "Справочник", field:'data'},
  //   ],
  //   row:[
  //     {
  //       name:'Просмотр',
  //       rules: ["all","dep","self"],
  //       value:{
  //         request:'self',
  //         rate:'self',
  //         order:'dep',
  //         tariff:'all',
  //         contractor:'dep',
  //         report:'dep',
  //         customer:'all',
  //         data:'dep',
  //       }
  //     },
  //     {
  //       name: 'Редактирование',
  //       rules: ["all","dep","self"],
  //       value:{
  //         request:'self',
  //         rate:'all',
  //         order:'dep',
  //         tariff:'all',
  //         contractor:'',
  //         report:'',
  //         customer:'',
  //         data:'dep',
  //       }
  //     },
  //     {
  //       name:'Удаление',
  //       rules: ["all","dep","self"],
  //       value:{
  //         request:'',
  //         rate:'self',
  //         order:'',
  //         tariff:'dep',
  //         contractor:'',
  //         report:'all',
  //         customer:'',
  //         data:'all',
  //       }
  //     },
  //     {
  //       name:'Создание',
  //       rules: ["all"],
  //       value:{
  //         request:'',
  //         rate:'',
  //         order:'',
  //         tariff:'all',
  //         contractor:'all',
  //         report:'all',
  //         customer:'all',
  //         data:'all',
  //       }
  //     },
  //     {
  //       name:'Экспорт',
  //       rules: ["all"],
  //       value:{
  //         request:'',
  //         rate:'all',
  //         order:'all',
  //         tariff:'all',
  //         contractor:'all',
  //         report:'',
  //         customer:'',
  //         data:'',
  //       }
  //     },
  //   ],

  //   rule: {
  //     all: "Все элементы",
  //     dep: "Своего отдела",
  //     self: "Только свои",
  //   }
  // }

  constructor(
    private fb: FormBuilder,
    snackBar: MatSnackBar,
    companyService: CompanyService,
    systemService: SystemService,
    route: ActivatedRoute,
    location: Location,
    router: Router,
  ) {
    super(location, companyService, systemService, route, snackBar, router);
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      permission: this.fb.array([this.createRow()]),
    });
  }

  // override ngOnInit(): void {
  //   super.ngOnInit();  // Вызов ngOnInit родительского класса
  //   console.log('ngOnInit from ChildComponent');
  //   // Логика дочернего компонента
  //   this.loadRowsData(this.permissionSchema.row);  // Вызов метода родительского класса
  // }

  override patchForm(): void {
    this.form.patchValue({
      id: this.data.id,
      name: this.data.name
    });
    this.loadRowsData(this.data.permission.row);
  }

  protected create(params: {body: Omit<Position, 'id'>}) {
    return this.companyService.companyPositionCreate(params as any);
   }

   protected read(params: { id: number; }): Observable<Position> {
     return this.companyService.companyPositionInfo(params) as Observable<Position>;
   }

   protected update(params: { body: Partial<Position>; }): Observable<void> {
     return this.companyService.companyPositionUpdate(params as any) as unknown as Observable<void>;
   }

   protected delete(params: {body: { id: number; }}): Observable<void> {
     return this.companyService.companyPositionDelete(params) as unknown as Observable<void>;
   }

   protected getNameForHeader(body: Position): string {
    return body.name;
  }

  loge(){
    console.log(this.form.value);
  }

  get permission(): FormArray {
    return (this.form.get('permission') as FormArray);
  }

  createRow(): FormGroup {
    return this.fb.group({
      name: ['', []],
      rules: [[], []],
      field: ['',],
      values: this.fb.group({
        request: ['', []],
        rate: ['', []],
        order: ['', []],
        tariff: ['', []],
        contractor: ['', []],  // Строка, а не пустой массив
        report: ['', []],
        customer: ['', []],
        data: ['', []],
      })
    });
  }

  loadRowsData(rowsData: any[]): void {
    console.log('loadRowsData',rowsData);

    // Очищаем текущие строки
    while (this.permission.length) {
      this.permission.removeAt(0);
    }
    // Добавляем новые строки на основе данных
    rowsData.forEach((row:any) => {
      const rowGroup = this.fb.group({
        name: [row.name],
        field: [row.field],
        rules: [row.rules],
        values: this.fb.group(row.values),
      });
      this.permission.push(rowGroup);
    });
  }
  isCheckedRow(obj: { [key: string]: string }, rule:string): boolean {
    return Object.values(obj).every(value => value == rule);
  }
  isIndeterminateRow(obj: { [key: string]: string}, rule:string ): boolean {
    const values = Object.values(obj);
    // Если все значения true, возвращаем false
    if (values.every(value => value == rule)) {
      return false;
    }
    // Если хотя бы одно значение true, возвращаем true
    return values.some(value => value == rule);
  }
  onChangeCheckboxRow({ checked }: MatCheckboxChange, rule: string, row: any) {
    const newValue = checked ? rule : '';
    row.controls.values.patchValue({
      request: newValue,
      rate: newValue,
      order: newValue,
      tariff: newValue,
      contractor: newValue,
      report: newValue,
      customer: newValue,
      data: newValue,
    });
  }

  onChangeRadioBtnRow(row:any,field:any, rule:string){
    if(row.value.values[field]===rule) {
      row.controls.values.patchValue({
        [field]: '',
      })
    }
  }

  //FullPermission Checkbox
  onChangeCheckboxFullPermission({ checked }: MatCheckboxChange) {
    const newValue = checked ? 'all' : '';
    this.permission.controls.forEach((row: any) => {
      row.controls.values.patchValue({
        request: newValue,
        rate: newValue,
        order: newValue,
        tariff: newValue,
        contractor: newValue,
        report: newValue,
        customer: newValue,
        data: newValue,
      });
    });
  }
  isIndeterminateFullPermission(): boolean{
    const arr:any[]=[]
    this.permission.controls.forEach((row:any) => {
      arr.push(this.isCheckedRow(row.value.values,'all'))
    });
    if (arr.every(value => value === true)) {
      return false;
    };
    return arr.some(value => value === true);
  }
  isCheckedFullPermission(): boolean {
    const arr:any[]=[];
    this.permission.controls.forEach((row:any) => {
      arr.push(this.isCheckedRow(row.value.values,'all'))
    });
    return arr.every(element => element === true);
  }

  //col checkbox
  onChangeCheckboxCol({ checked }: MatCheckboxChange, field:any){
    const newValue = checked ? 'all' : '';
    this.permission.controls.forEach((row: any) => {
      row.controls.values.patchValue({
        [field]: newValue,
      });
    });
  }
  isIndeterminateCol(field:string){
    if (this.permission.value.every((value:any) => value.values[field] === 'all')) {
      return false;
    };
    return this.permission.value.some((value:any) => value.values[field] === 'all');
  }
  isCheckedCol(field:string){
    return this.permission.value.every((value:any) => value.values[field] === 'all');
  }

}

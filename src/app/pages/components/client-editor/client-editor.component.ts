import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/app/api/custom_models';
import { CustomerService, SystemService } from 'src/app/api/services';
import { Editor } from 'src/app/classes/editor';
import { Location } from '@angular/common';

@Component({
  selector: 'app-client-editor',
  templateUrl: './client-editor.component.html',
  styleUrls: ['./client-editor.component.scss']
})
export class ClientEditorComponent extends Editor<Client> {
  private entity = 'Клиент';
  editTitle = 'Информация о клиенте';
  newTitle = 'Добавление клиента';
  savedMessage = `${this.entity} сохранен`;
  removedMessage = `${this.entity} удален`;
  createdMessage = `${this.entity} создан`;
  notFoundMessage = `${this.entity} не найден`;
  
  constructor(
    private fb: FormBuilder,
    snackBar: MatSnackBar,
    route: ActivatedRoute,
    systemService: SystemService,
    location: Location,
    router: Router,
    private customerService: CustomerService,
  ) {
    super(location, systemService, route, snackBar, router);
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      name_full: ['', [Validators.required]],
    });
  }

  protected override create(params: { body: Omit<Client, 'id'>; }): Observable<{ id: number; }> {
    return this.customerService.customerCreate(params as any);
  }

  protected override read(params: { id: number; }): Observable<Client> {
    return this.customerService.customerInfo(params) as Observable<Client>
  }

  protected override update(params: { body: Partial<Client>; }): Observable<void> {
    return this.customerService.customerUpdate(params as any) as unknown as Observable<void>;
  }

  protected override delete(params: { body: { id: number; }; }): Observable<void> {
    return this.customerService.customerDelete(params as any) as unknown as Observable<void>;
  }

  protected override getNameForHeader(body: Client): string {
    return `${body.name}`;
  }
}

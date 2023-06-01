import { byField } from '../constants/sort-predicate';
import { Directive, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { Currency, TaxSystem } from "src/app/api/custom_models";
import { Location } from '@angular/common';
import { phoneMask } from 'src/app/constants';
import { SystemService } from 'src/app/api/services';

@Directive()
export abstract class Editor<T> implements OnInit {
  id?: number;
  form!: FormGroup;
  isEditMode = false;
  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 5000 };
  taxSystems: TaxSystem[] = [];
  currencies: Currency[] = [];
  isFormSubmitted = false;
  phoneMask = phoneMask;
  data: Partial<T> = {};
  abstract editTitle: string;
  abstract newTitle: string;
  abstract savedMessage: string;
  abstract removedMessage: string;
  abstract createdMessage: string;
  abstract notFoundMessage: string;
  nameForHeader?: string;

  private currentTitle = '';
  protected abstract create(params: { body: Omit<T, 'id'> }): Observable<{id: number}>;
  protected abstract read(params: { id: number }): Observable<T>;
  protected abstract update(params: { body: Partial<T> }): Observable<void>;
  protected abstract delete(params: { body: { id: number } }): Observable<void>;
  
  protected abstract getNameForHeader(body: T): string;

  constructor(
    protected location: Location,
    protected systemService: SystemService,
    protected route: ActivatedRoute,
    protected snackBar: MatSnackBar,
    protected router: Router,
  ) { }

  ngOnInit(): void {
    this.detectEditMode();
    if (this.isEditMode) {
      this.load();
    }
    this.currentTitle = this.isEditMode ? this.editTitle : this.newTitle;
  }

  get title(): string {
    return this.currentTitle;
  }

  goBack(): void {
    this.location.back();
  }

  loadTaxSystems(): void {
    this.systemService.systemTaxSystem().subscribe(
      taxSystems => this.taxSystems = taxSystems ? (taxSystems as TaxSystem[]).sort(byField('name', 'asc', 'case-insensitive')) : []
    );
  }

  loadCurrencies(): void {
    this.systemService.systemCurrency().subscribe(
      currencies => this.currencies = currencies ? (currencies as Currency[]).sort(byField('code', 'asc', 'case-insensitive')) : []
    );
  }

  hasError(controlName: string): boolean {
    const control = this.form.get(controlName) as FormControl;
    return control.invalid;
  }

  getError(controlName: string): string {
    const control = this.form.get(controlName) as FormControl;
    if (control.errors?.['required']) {
      return 'Поле обязательно';
    }
    if (control.errors?.['email']) {
      return 'Невалидный email';
    }
    if (control.errors?.['inn']) {
      return 'Неверный формат ИНН';
    }
    if (control.errors?.['mask']) {
      return 'Неверный формат';
    }
    return '';
  }


  showMessage(message: string): void {
    this.snackBar.open(message, undefined, this.snackBarWithShortDuration);
  }

  showMessageAndGoBack(message: string): void {
    this.showMessage(message);
    this.goBack();
  }
  
  showMessageAndSwitchToEditMode(message: string, id: number): void {
    this.showMessage(message);
    this.router.navigate(['..', id], {replaceUrl: true, relativeTo: this.route});
  }

  showMessageAndReload(message: string): void {
    this.showMessage(message);
    this.load();
  }

  showError(message: string, err?: any): void {
    if (typeof err?.error?.error_message === 'string') {
      const hasDescription = typeof err.error?.error_message_description === 'string';
      if (hasDescription) {
        this.snackBar.open(`${message}: ` + err.error?.error_message + ':' + err.error?.error_message_description, undefined, this.snackBarWithLongDuration);
      } else {
        this.snackBar.open(`${message}: ` + err.error?.error_message, undefined, this.snackBarWithLongDuration);
      }
    } else {
      this.snackBar.open(message, undefined, this.snackBarWithLongDuration);
    }
  }

  showErrorAndGoBack(err: any, message: string): void {
    this.showError(message, err);
    this.goBack();
  }

  load(): void {
    const id = this.getIdParam();
    this.read({ id })
      .pipe(tap(data => {
        // currently, when entity doesn't exist the service returns HTTP 200 with empty response body instead of HTTP 404
        // therefore we have to handle that case manually
        if (!data) {
          throw ({ error: { error_message: `запись не существует` } });
        }
      }))
      .subscribe({
        next: data => {
          this.data = data as T;
          this.form.patchValue(this.data);
          this.nameForHeader = this.getNameForHeader(data as T);
        },
        error: (err: any) => this.showErrorAndGoBack(err, this.notFoundMessage)
      });
  }

  save(): void {
    this.isFormSubmitted = true;
    if (!this.form.valid) {
      this.showError('Не все поля заполнены корректно');
      return;
    }
    const body = this.form.value;
    if (typeof (this.data as any).id === 'number') {
      this.updateData(body);
    } else {
      this.createData(body);
    }
  }

  remove(): void {
    const body = { id: (this.data as any).id as number };
    this.delete({ body })
      .subscribe({
        next: () => this.showMessageAndGoBack(this.removedMessage),
        error: (err) => this.showError('Ошибка', err)
      });
  }

  private createData(body: any) {
    this.create({ body }).pipe().subscribe({
      next: ({id}) => this.showMessageAndSwitchToEditMode(this.createdMessage, id),
      error: (err) => this.showError(`Ошибка`, err)
    });
  }

  private updateData(body: any) {
    this.update({ body }).pipe().subscribe({
      next: () => this.showMessageAndReload(this.savedMessage),
      error: (err) => this.showError(`Ошибка`, err)
    });
  }

  private detectEditMode(): void {
    const segments = this.route.snapshot.url.map(s => s.path);
    this.isEditMode = segments[1] !== 'add';
  }

  private getIdParam(): number {
    return Number(this.route.snapshot.paramMap.get('id'));
  }
}

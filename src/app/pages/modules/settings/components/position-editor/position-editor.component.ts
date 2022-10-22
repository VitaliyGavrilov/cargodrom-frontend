import { SettingsEditor } from './../../classes/settings-editor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Position } from './../../../../../api/custom_models/position';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../../../api/services/company.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-position-editor',
  templateUrl: './position-editor.component.html',
  styleUrls: ['./position-editor.component.scss']
})
export class PositionEditorComponent extends SettingsEditor implements OnInit {
  position: Partial<Position> = {};

  constructor(
    private fb: FormBuilder,
    snackBar: MatSnackBar,
    companyService: CompanyService,
    route: ActivatedRoute,
    location: Location,
  ) {
    super(location, companyService, route, snackBar);
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.detectEditMode();
    if (this.isEditMode) {
      this.getPosition();
    }
    this.title = this.isEditMode ? 'Редактирование должности' : 'Добавление должности';
  }

  getPosition(): void {
    const id = this.getIdParam();
    this.companyService.companyPositionInfo({ id })
      .pipe(tap(position => {
        // currently, when position doesn't exist the service returns HTTP 200 with empty response body instead of HTTP 404
        // therefore we have to handle that case manually
        if (!position) {
          throw ({ error: { error_message: `должность не существует` } });
        }
      }))
      .subscribe({
        next: position => {
          this.position = position as Position;
          this.form.patchValue(this.position);
        },
        error: (err: any) => this.showErrorAndGoBack(err, `Должность не найдена`)
      });
  }

  save(): void {
    this.isFormSubmitted = true;
    if (!this.form.valid) {
      this.showError('Не все поля заполнены корректно');
      return;
    }
    const body = this.form.value;
    if (typeof this.position.id === 'number') {
      this.updatePosition(body);
    } else {
      this.createPosition(body);
    }
  }

  private createPosition(body: any) {
    this.companyService.companyPositionCreate({ body }).pipe().subscribe({
      next: () => this.showMessageAndGoBack(`Должность создана`),
      error: (err) => this.showError('Ошибка создания должности', err)
    });
  }

  updatePosition(body: any) {
    this.companyService.companyPositionUpdate({ body }).pipe().subscribe({
      next: () => this.showMessageAndGoBack('Должность сохранена'),
      error: (err) => this.showError(`Ошибка сохранения должности`, err)
    });
  }

  remove(): void {
    const body = { id: this.position.id! };
    this.companyService.companyPositionDelete({ body })
      .subscribe({
        next: () => this.showMessageAndGoBack(`Должность ${this.position.name} удалена`),
        error: (err) => this.showError(`Ошибка удаления должности`, err)
      });
  }

}

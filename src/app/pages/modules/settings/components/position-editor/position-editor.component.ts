import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Position } from './../../../../../api/custom_models/position';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../../../api/services/company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-position-editor',
  templateUrl: './position-editor.component.html',
  styleUrls: ['./position-editor.component.scss']
})
export class PositionEditorComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  position: Partial<Position> = {};
  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 5000 };
  title = '';

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const segments = this.route.snapshot.url.map(s => s.path);
    this.isEditMode = segments[1] === 'edit';
    if (this.isEditMode) {
      this.getPosition();
    }
    this.title = this.isEditMode ? 'Редактирование должности' : 'Добавление должности';
  }

  getPosition(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
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
        error: (err: any) => {
          this.snackBar.open(`Должность не найдена: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
          this.goToPositions();
        }
      });
  }

  goToPositions(): void {
    this.router.navigate(['/pages/settings/position']);
  }
  save(): void {
    if (!this.form.valid) {
      this.snackBar.open('Не все поля заполнены корректно', undefined, this.snackBarWithLongDuration);
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
      next: ({ id }) => {
        this.goToPositions();
        this.snackBar.open(`Должность создана`, undefined, this.snackBarWithShortDuration)
      },
      error: (err) => this.snackBar.open(`Ошибка создания должности: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }

  updatePosition(body: any) {
    this.companyService.companyPositionUpdate({ body }).pipe().subscribe({
      next: () => {
        this.snackBar.open(`Должность сохранена`, undefined, this.snackBarWithShortDuration);
        this.goToPositions();
      },
      error: (err) => this.snackBar.open(`Ошибка сохранения должности: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }
  
  remove(): void {
    const body = { id: this.position.id! };
    this.companyService.companyPositionDelete({ body })
      .subscribe({
        next: () => {
          this.snackBar.open(`Должность ${this.position.name} удалена`, undefined, {duration: 1000});
          this.goToPositions();
        },
        error: (err) => this.snackBar.open(`Ошибка удаления должности: ` + err.error.error_message, undefined, {duration: 1000})
      });
  }

}

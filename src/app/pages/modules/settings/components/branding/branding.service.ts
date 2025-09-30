// history.service.ts
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

interface HistoryState {
  formData: any;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class FormHistoryService {
  private history: HistoryState[] = [];
  private currentIndex = -1;
  private maxHistoryLength = 50;

  // Добавить состояние в историю
  pushState(form: FormGroup): void {
    const formData = this.getFormData(form);
    
    // Удаляем все состояния после текущего индекса (если мы откатились назад и делаем новое изменение)
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }

    this.history.push({
      formData: JSON.parse(JSON.stringify(formData)),
      timestamp: new Date()
    });

    // Ограничиваем размер истории
    if (this.history.length > this.maxHistoryLength) {
      this.history.shift();
    }

    this.currentIndex = this.history.length - 1;
  }

  // Отменить изменение
  undo(form: FormGroup): boolean {
    if (this.canUndo()) {
      this.currentIndex--;
      this.applyState(form, this.history[this.currentIndex].formData);
      return true;
    }
    return false;
  }

  // Повторить изменение
  redo(form: FormGroup): boolean {
    if (this.canRedo()) {
      this.currentIndex++;
      this.applyState(form, this.history[this.currentIndex].formData);
      return true;
    }
    return false;
  }

  canUndo(): boolean {
    return this.currentIndex > 0;
  }

  canRedo(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  clearHistory(): void {
    this.history = [];
    this.currentIndex = -1;
  }

  private getFormData(form: FormGroup): any {
    return form.getRawValue();
  }

  private applyState(form: FormGroup, formData: any): void {
    form.patchValue(formData, { emitEvent: false });
  }
}
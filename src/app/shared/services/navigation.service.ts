// navigation.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root' // Будет создан один экземпляр на все приложение
})
export class NavigationService {

  constructor(private router: Router) {}

  // Переход к списку продуктов
  toProducts(): void {
    this.router.navigate(['/products']);
  }

  // Переход к деталям продукта
  toProductDetail(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  // Переход к редактированию продукта (например, в админке)
  toProductEdit(productId: number): void {
    this.router.navigate(['/admin', 'products', productId, 'edit']);
  }

  // Назад по истории
  back(): void {
    this.router.navigate(['..']); // Или использовать Location.back()
  }
}
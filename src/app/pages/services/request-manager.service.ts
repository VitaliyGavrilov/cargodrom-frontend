import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestManagerService {
  constructor(
    private loaderService: LoaderService
  ) {}
  // * Метод для выполнения запросов по очередям.
  // * @param queues Массив очередей запросов. Каждая очередь — это массив Observable.
  // * @returns Promise с результатами всех очередей.
  async executeQueues(queues: Observable<any>[][]): Promise<any[][]> {
    // Показываем лоадер
    this.loaderService.showLoader();
    try {
      const results: any[][] = [];
      // Выполняем очереди последовательно
      for (const queue of queues) {
        // Пропускаем пустые очереди
        if (queue.length === 0) {
          results.push([]); // Добавляем пустой массив для пустой очереди
          continue;
        }
        // Выполняем все запросы в текущей очереди одновременно
        const queueResults = await lastValueFrom(forkJoin(queue));
        results.push(queueResults);
      }
      return results;
    } catch (error) {
      console.error('Ошибка при выполнении запросов:', error);
      throw error;
    } finally {
      // Скрываем лоадер
      this.loaderService.hideLoader();
    }
  }
}

// import { Injectable } from '@angular/core';
// import { forkJoin, Observable, of } from 'rxjs';
// import { catchError, finalize, map } from 'rxjs/operators';
// import { LoaderService } from './loader.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class RequestManagerService {
//   constructor(private loaderService: LoaderService) {}

//   // * Метод для выполнения запросов по очередям.
//   // * @param queues Массив очередей запросов. Каждая очередь — это массив Observable.
//   // * @returns Observable с результатами всех очередей.
//   executeQueues(queues: Observable<any>[][]): Observable<any[][]> {
//     // Показываем лоадер
//     this.loaderService.showLoader();

//     // Создаем массив Observables для каждой очереди
//     const queueObservables = queues.map(queue => {
//       if (queue.length === 0) {
//         // Если очередь пустая, возвращаем Observable с пустым массивом
//         return of([]);
//       }
//       // Выполняем все запросы в очереди одновременно с помощью forkJoin
//       return forkJoin(queue).pipe(
//         catchError(error => {
//           console.error('Ошибка при выполнении запросов:', error);
//           // Возвращаем Observable с ошибкой
//           throw error;
//         })
//       );
//     });

//     // Выполняем очереди последовательно с помощью concat
//     return forkJoin(queueObservables).pipe(
//       finalize(() => {
//         // Скрываем лоадер после завершения всех запросов
//         this.loaderService.hideLoader();
//       })
//     );
//   }
// }



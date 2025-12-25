import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function responsibilityValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const directions: any[] = control.value || [];

    // Если массив пустой - ошибка
    if (directions.length === 0) {
      return {
        requiredDirection: 'Необходимо указать хотя бы одно направление'
      };
    }

    // Проверка каждого направления
    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];

      // Проверка, что поля не пустые
      if (!direction.direction_departure || !direction.direction_arrival) {
        return {
          incompleteDirection: {
            index: i,
            message: 'Заполните страны отправления и назначения'
          }
        };
      }

      // Проверка, что массив транспортов существует и содержит хотя бы 1 элемент
      if (!direction.direction_items || direction.direction_items.length < 1) {
        return {
          emptyItems: {
            index: i,
            message: 'Выберите хотя бы один вид транспорта для направления'
          }
        };
      }
    }

    return null;
  };
}

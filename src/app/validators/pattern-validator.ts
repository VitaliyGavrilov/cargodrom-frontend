import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function patternValidator(what: string, pattern: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (isEmptyInputValue(control.value)) {
      return null;
    }
    const allowed = pattern.test(control.value);
    return allowed ? null : { [what]: true };
  };
}

export const innValidator = patternValidator('inn', /^([0-9]{10,12})$/);
export const emailValidator = patternValidator('email', /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);


function isEmptyInputValue(value: any): boolean {
  return value == null ||
    ((typeof value === 'string' || Array.isArray(value)) && value.length === 0);
}
import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function innValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const allowed = /^([0-9]{10,12})$/.test(control.value);
    return allowed ? null : { inn: true };
  };
}
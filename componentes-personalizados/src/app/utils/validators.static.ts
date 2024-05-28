import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export class MyValidatorsFunctions extends Validators {
  /** Validación del campo email, si la tarea lo requiere **Obligatorio para OCAPPDS** */
  static override email(c: AbstractControl): ValidationErrors | null {
    const isValid = () => {
      if (c.value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/))
        return null;
      else return { invalid: true };
    };
    // if (Tareas.listaTareas[0].endesaDigital > 1 || Tareas.ruta === Rutas.pds) {
    //     return isValid()
    // } else if (c.value)
    //     return isValid()
    if (c.value) return isValid();

    return null;
  }
}

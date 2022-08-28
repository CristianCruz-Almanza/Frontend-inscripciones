import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  messageError(error: any, isNumber: boolean): string {
    if(error?.hasOwnProperty('required')){
      return 'El campo es requerido';
    }
    if(error?.hasOwnProperty('minlength')){
      return `El minimo de caracteres es ${error?.['minlength']?.requiredLength}`;
    }
    if(error?.hasOwnProperty('maxlength')){
      return `El maximo de caracteres es ${error?.['maxlength']?.requiredLength}`;
    }
    if(error?.hasOwnProperty('min') && isNumber){
      return `El cantidad minima es ${error?.['min']?.min}`;
    }
    if(error?.hasOwnProperty('max') && isNumber){
      return `La cantidad maxima es de ${error?.['max']?.max}`;
    }
    return '';
  }

  isSpacesInDinamicTxt(control: AbstractControl): ValidationErrors | null {
    const txt = control.value;
    return !txt || txt.trim().length === 0 ? { isSpacesInTxt: true } : null;
  }
  isSpacesInPassword(control: AbstractControl): ValidationErrors | null {
    const txt = control.value;
    return !txt || txt.trim().length < 8 ? { isSpacesInPassword: true } : null;
  }
}

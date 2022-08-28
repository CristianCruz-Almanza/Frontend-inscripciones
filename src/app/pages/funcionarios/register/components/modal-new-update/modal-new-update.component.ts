import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ErrorLogsService } from 'src/app/services/error-logs.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import Swal from 'sweetalert2';
import { RegisterService } from '../../../services/register.service';

@Component({
  selector: 'app-modal-new-update',
  templateUrl: './modal-new-update.component.html',
  styles: [
  ]
})
export class ModalNewUpdateComponent implements OnInit {

  expRegValid: RegExp = /^[^<>*!$~@%^&.`'¡":;+¥¿?=]/;
  formFuncionario: UntypedFormGroup = this.fb.group({
    ci: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(15)]],
    name: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(125),this.validatorsService.isSpacesInDinamicTxt]],
    paternal: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(125),this.validatorsService.isSpacesInDinamicTxt]],
    maternal: ['',[Validators.minLength(4),Validators.maxLength(125),this.validatorsService.isSpacesInDinamicTxt]],
    cargo: [{value: '', disabled: true},[Validators.minLength(4),Validators.maxLength(125),this.validatorsService.isSpacesInDinamicTxt]],
    unidad: [{value: '', disabled: true},[Validators.minLength(4),Validators.maxLength(175),this.validatorsService.isSpacesInDinamicTxt]],
  });
  public imagenSubir?: File;
  public imgTemp: any = null;
  loading: boolean = false;
  loadingSearch: boolean = false;
  constructor(
    private validatorsService: ValidatorsService,
    public registerService:RegisterService,
    public errorLogService:ErrorLogsService,
    private notificationsService: NotificationsService,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
  }


  messageError(campo: string, isNumber: boolean = false): string{
    const error = this.formFuncionario.get(campo)?.errors;
    return this.validatorsService.messageError(error, isNumber);
  }

  inputValid(campo: string) : boolean {
    if(this.formFuncionario.get(campo)?.invalid && this.formFuncionario.get(campo)?.touched){
      return true;
    } else {
      return false;
    }
  }

  searchFuncionariByCi() {
    this.formFuncionario.get('ci')?.markAsTouched();
    if(this.formFuncionario.get('ci')?.invalid) {return;}
    this.loadingSearch = true;
    this.registerService.getFuncionariExist(this.formFuncionario.get('ci')?.value)
          .subscribe({
            next: (resp) => {
              if(resp.status) {
                const names = resp.data[0].empleado.split(' ');
                this.formFuncionario.get('name')?.setValue(names[names.length - 1]);
                this.formFuncionario.get('paternal')?.setValue(names[0]);
                this.formFuncionario.get('maternal')?.setValue(names[1]);
                this.formFuncionario.get('cargo')?.setValue(resp.data[0]?.cargo ??  '');
                this.formFuncionario.get('unidad')?.setValue(resp.data[0]?.unidad ?? '');
                this.notificationsService.notifications('Encontrado - Llenamos el formulario por ti','success','form');
              } else {
                this.formFuncionario.get('name')?.setValue('');
                this.formFuncionario.get('paternal')?.setValue('');
                this.formFuncionario.get('maternal')?.setValue('');
                this.formFuncionario.get('cargo')?.setValue('');
                this.formFuncionario.get('unidad')?.setValue('');
                this.notificationsService.notifications('No encontramos tus datos - Llena el formulario','warning','form');
              }
              this.loadingSearch = false;
              //this.viewInputsCitizen=  true;
            },
            error: (err) => {
              this.notificationsService.notifications('No encontramos tus datos - Llena el formulario','warning','form');
              this.formFuncionario.get('fullname')?.touched;
              this.loadingSearch = false;
             // this.viewInputsCitizen=  true;
            },
          })
  }


  newFuncionari() {
    this.formFuncionario.markAllAsTouched();
    if( this.formFuncionario.invalid){
      return;
    }
    const funcionari = {
      ci: this.formFuncionario.get('ci')?.value,
      name: this.formFuncionario.get('name')?.value,
      paternal: this.formFuncionario.get('paternal')?.value,
      maternal: this.formFuncionario.get('maternal')?.value,
      cargo: this.formFuncionario.get('cargo')?.value,
      unidad: this.formFuncionario.get('unidad')?.value,
    };
    this.loading = true;
    this.registerService.postFuncionario(funcionari)
        .subscribe({
          next: (resp) => {
            this.loading = false;
            this.closeModal();
          },
          error: (e) => {
            this.loading = false;
            this.closeModal();
            this.errorLogService.logDeErrores(e, ()=> {
              const errors = e.error.errors;
              const msg = errors.ci ? errors.ci  : errors.status ? errors.status : 'Los datos no son validos, Intenta nuevamente';
              Swal.fire({ title: 'Oops...', text: msg, icon: 'info',
                showClass: { popup: 'animated animate fadeInDown' },
              });
            });
          },
          complete: () => {
            this.registerService.saving.emit(true);
            Swal.fire({ title: 'Exito', text: 'Funcionario creado correctamente', icon: 'success',
              showClass: { popup: 'animated animate fadeInDown' },
            });
          }
        });
  }


  closeModal() {
    this.formFuncionario.reset({
      ci: '',
      name: '',
      paternal: '',
      maternal: '',
      cargo: '',
      unidad: '',
    });
    this.registerService.setModal = false;
  }

}

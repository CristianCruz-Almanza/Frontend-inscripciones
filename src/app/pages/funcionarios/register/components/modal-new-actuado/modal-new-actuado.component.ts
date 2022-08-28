import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorLogsService } from 'src/app/services/error-logs.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import Swal from 'sweetalert2';
import { Funcionari } from '../../../interfaces/funcionario.interface';
import { ActuadosService } from '../../../services/actuados.service';
import { RegisterService } from '../../../services/register.service';

@Component({
  selector: 'app-modal-new-actuado',
  templateUrl: './modal-new-actuado.component.html',
  styleUrls: ['./modal-new-actuado.component.css']
})
export class ModalNewActuadoComponent implements OnInit, OnDestroy {

  expRegValid: RegExp = /^[^<>*!$~@%^&.`'¡":;+¥¿?=]/;
  formActuado: UntypedFormGroup = this.fb.group({
    deUnidad: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(125)]],
    aUnidad: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(125),this.validatorsService.isSpacesInDinamicTxt]],
    fechaEmisor: ['',[Validators.required]],
    fechaReceptor: ['',[Validators.required]],
    asunto: ['',[Validators.minLength(4),Validators.maxLength(255),this.validatorsService.isSpacesInDinamicTxt]],
    observaciones: ['',[Validators.minLength(4),Validators.maxLength(255),this.validatorsService.isSpacesInDinamicTxt]],
  });
  loading: boolean = false;
  recibeIdFuncionario!: Subscription;
  funcionari?: Funcionari;
  constructor(
    private validatorsService: ValidatorsService,
    public actuadosService:ActuadosService,
    public errorLogService:ErrorLogsService,
    private registerService: RegisterService,
    private notificationsService: NotificationsService,
    private fb: UntypedFormBuilder
  ) { }

  ngOnDestroy(): void {
    this.recibeIdFuncionario.unsubscribe();
  }

  ngOnInit(): void {
    this.recibeIdFuncionario = this.actuadosService.idFuncionari$
            .subscribe(resp => {
              this.funcionari =  resp.funcionari;
            });
  }


  messageError(campo: string, isNumber: boolean = false): string{
    const error = this.formActuado.get(campo)?.errors;
    return this.validatorsService.messageError(error, isNumber);
  }

  inputValid(campo: string) : boolean {
    if(this.formActuado.get(campo)?.invalid && this.formActuado.get(campo)?.touched){
      return true;
    } else {
      return false;
    }
  }


  newActuado() {
    this.formActuado.markAllAsTouched();
    if( this.formActuado.invalid){
      return;
    }
    const actuados = {
      origin_unit: this.formActuado.get('deUnidad')?.value,
      destiny_unit: this.formActuado.get('aUnidad')?.value,
      date_emission: this.formActuado.get('fechaEmisor')?.value,
      date_reception: this.formActuado.get('fechaReceptor')?.value,
      affair: this.formActuado.get('asunto')?.value,
      observation: this.formActuado.get('observaciones')?.value,
      id_functionary: this.funcionari!.id,
    };
    this.loading = true;
    this.actuadosService.postActuado(actuados)
        .subscribe({
          next: (resp) => {
            this.loading = false;
            this.closeModal();
          },
          error: (e) => {
            this.loading = false;
            this.closeModal();
            this.errorLogService.logDeErrores(e, ()=> {
              const msg =  'Los datos no son validos, Intenta nuevamente';
              this.notificationsService.notifications(msg,'error','form');
            });
          },
          complete: () => {
            this.registerService.viewDetailsRequest$.next({funcionari:this.funcionari!});
            this.notificationsService.notifications('Actuado creado correctamente','success','form');
          }
        });
  }


  closeModal() {
    this.formActuado.reset({
      deUnidad: '',
      aUnidad: '',
      fechaEmisor: ' ',
      fechaReceptor: ' ',
      asunto: '',
      observaciones: '',
    });
    this.actuadosService.setModal = false;
  }

}

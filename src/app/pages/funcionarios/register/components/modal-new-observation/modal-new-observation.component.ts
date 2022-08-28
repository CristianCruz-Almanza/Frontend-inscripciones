import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorLogsService } from 'src/app/services/error-logs.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import { Actuado } from '../../../interfaces/actuados.interface';
import { formObservation } from '../../../interfaces/observations.interface';
import { ObservationsService } from '../../../services/observations.service';

@Component({
  selector: 'app-modal-new-observation',
  templateUrl: './modal-new-observation.component.html',
  styleUrls: ['./modal-new-observation.component.css']
})
export class ModalNewObservationComponent implements OnInit, OnDestroy {
  expRegValid: RegExp = /^[^<>*!$~@%^&.`'¡":;+¥¿?=]/;
  formObservation: UntypedFormGroup = this.fb.group({
    observation: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(255)]],
    date: ['',[Validators.required]],
    //status: ['',[Validators.required]],
  });
  loading: boolean = false;
  recibeIdActuado!: Subscription;
  actuado?: Actuado;
  actuad$!: Subscription;
  constructor(
    private validatorsService: ValidatorsService,
    public  observationsService:ObservationsService,
    public  errorLogService:ErrorLogsService,
    private notificationsService: NotificationsService,
    private fb: UntypedFormBuilder
  ) { }
  ngOnDestroy(): void {
    this.actuad$.unsubscribe();
  }

  ngOnInit(): void {
    this.actuad$ = this.observationsService.actuado$.subscribe(resp => {
      this.actuado = resp.actuado;
    });
  }

  messageError(campo: string, isNumber: boolean = false): string{
    const error = this.formObservation.get(campo)?.errors;
    return this.validatorsService.messageError(error, isNumber);
  }

  inputValid(campo: string) : boolean {
    if(this.formObservation.get(campo)?.invalid && this.formObservation.get(campo)?.touched){
      return true;
    } else {
      return false;
    }
  }


  newObservation() {
    this.formObservation.markAllAsTouched();
    if( this.formObservation.invalid){
      return;
    }
    const observation:formObservation = {
      observation: this.formObservation.get('observation')?.value,
      date: this.formObservation.get('date')?.value,
      status:'1',
      id_actuado: this.actuado?.id_actuado!
    };
    this.loading = true;
    this.observationsService.postNewObservation(observation)
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
            this.notificationsService.notifications('Observacion creado correctamente','success','form');
          }
        });
  }


  closeModal() {
    this.formObservation.reset({
      observation: '',
      date: '',
      status: '',
    });
    this.observationsService.setModalNewObs = false;
  }

}

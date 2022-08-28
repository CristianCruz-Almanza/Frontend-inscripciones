import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorLogsService } from 'src/app/services/error-logs.service';
import { Actuado } from '../../../interfaces/actuados.interface';
import { Funcionari } from '../../../interfaces/funcionario.interface';
import { RegisterService } from '../../../services/register.service';
import { ActuadosService } from '../../../services/actuados.service';
import { ObservationsService } from '../../../services/observations.service';

@Component({
  selector: 'app-modal-actuados',
  templateUrl: './modal-actuados.component.html',
  styles: [
  ]
})
export class ModalActuadosComponent implements OnInit {

  loading: boolean = false;
  rows: number = 25;
  from: number = 0;
  to: number = 0;
  total: number = 0;
  getDatailLoadSubs$!: Subscription;
  funcionari?: Funcionari;
  actuadosFuncionari: Actuado[] = [];

  constructor(
    public registerService:RegisterService,
    private errorLogsService: ErrorLogsService,
    private actuadosService:ActuadosService,
    private observationsService:ObservationsService
  ) { }

  ngOnInit(): void {
    this.getDatailLoadSubs$ = this.registerService.viewDetailsRequest$
            .subscribe({
              next: (resp) => {
                this.funcionari = resp.funcionari;
                this.getDetailsLoan(this.funcionari,this.rows,1); 
              }
            });
  }

  ngOnDestroy(): void {
    this.getDatailLoadSubs$.unsubscribe();
  }

  getDetailsLoan(funcionari: Funcionari,per_page:number, page:number) {
    this.loading = true;
    this.registerService.getActuadosByIdFuncionary(funcionari.id,page,per_page,)
          .subscribe({
            next: (resp) => {
              this.actuadosFuncionari = resp.data;
              this.total = resp.total;
              this.from = resp.from;
              this.to = resp.to;
              this.loading = false;
            },
            error: (err) => {
              this.loading = false;
              this.errorLogsService.logDeErroresReads(err);
            }
          })
  }

  paginate(event : any) {
    const page = event.page+1;
    const per_page = event.rows;
    this.getDetailsLoan( this.funcionari!,per_page,page);
  }
  abrirModalNewActuado(){
    this.actuadosService.setModal = true;
    this.actuadosService.idFuncionari$.next( {funcionari: this.funcionari!});
  }

  openModalObservations(detailsActuados: Actuado){
    this.observationsService.actuado$.next({actuado: detailsActuados})
    this.observationsService.setModal = true;
  }
  openModalNewObservation(detailsActuados: Actuado){
    this.observationsService.actuado$.next({actuado: detailsActuados})
    this.observationsService.setModalNewObs = true;
  }

  closeModalRequestInfo() {
    this.registerService.setModalRequestInfo = false;
  }

}

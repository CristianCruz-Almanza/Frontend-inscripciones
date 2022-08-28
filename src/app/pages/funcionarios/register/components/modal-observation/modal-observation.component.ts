import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observation } from '../../../interfaces/observations.interface';
import { ObservationsService } from '../../../services/observations.service';

@Component({
  selector: 'app-modal-observation',
  templateUrl: './modal-observation.component.html',
  styleUrls: ['./modal-observation.component.css']
})
export class ModalObservationComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  observations:Observation[] = [];
  actuad$!: Subscription;
  constructor(
    public observationsService:ObservationsService
  ) { }

  ngOnDestroy(): void {
    this.actuad$.unsubscribe();
  }

  ngOnInit(): void {
    this.actuad$ = this.observationsService.actuado$.subscribe(resp => {
      this.getAllObservations(resp.actuado.id_actuado);
    });
  }

  getAllObservations(id: number) {
    this.loading = true;
    this.observationsService.getAllObservation(1,100,id).subscribe({
      next: (resp) => { this.observations = resp.data; this.loading = false},
      error: (err) => {this.loading = false}
    });
  }

  closeModal() {
    this.observationsService.setModal = false;
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Actuado } from '../interfaces/actuados.interface';
import { formObservation, GetAllObservations } from '../interfaces/observations.interface';
const base_url =  environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ObservationsService {
  _displayModel : boolean = false;
  _displayModelNewObservation: boolean = false;
  actuado$: Subject<{actuado: Actuado}> = new Subject();
  constructor(
    private http: HttpClient
  ) { }
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headerToken() {
    return { headers: { 
      'Authorization' : 'Bearer '+this.token,
    } };
  }
  set setModal(val: boolean) {
    this._displayModel = val;
  }
  set setModalNewObs(val: boolean) {
    this._displayModelNewObservation = val;
  }

  getAllObservation(page: number, per_page:number,id_actuado:number): Observable<GetAllObservations>{
    const url = `${base_url}/observation/index?page=${page}&per_page=${per_page}&id_actuado=${id_actuado}`;
    return this.http.get<GetAllObservations>(url, this.headerToken);
  }

  postNewObservation(formObservation: formObservation){
    const url = `${base_url}/observation/new`;
    return this.http.post(url,formObservation, this.headerToken);
  }
}

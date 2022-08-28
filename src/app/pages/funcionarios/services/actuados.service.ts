import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formActuado } from '../interfaces/actuados.interface';
import { Funcionari } from '../interfaces/funcionario.interface';
const base_url =  environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ActuadosService {
  _displayModel : boolean = false;
  idFuncionari$: Subject<{funcionari: Funcionari}> = new Subject();
  public saving: EventEmitter<boolean> = new EventEmitter<boolean>(); 
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


  postActuado(formActuado: formActuado){
    const url = `${base_url}/actuado/new`;
    return this.http.post(url,formActuado, this.headerToken);
  }
}

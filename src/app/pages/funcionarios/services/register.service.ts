import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetAllActuados } from '../interfaces/actuados.interface';
import { formFuncionari, Funcionari, GetAllFuncionaryPaginate } from '../interfaces/funcionario.interface';
const base_url =  environment.base_url;
const base_url_public =  environment.base_url_public;

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  _displayModel : boolean = false;
  _displayModelActuados: boolean = false;
  _isEdit: boolean = false;
  public saving: EventEmitter<boolean> = new EventEmitter<boolean>();
  public viewDetailsRequest$: Subject<{funcionari: Funcionari}> = new Subject();
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headerToken() {
    return { headers: {
      'Authorization' : 'Bearer '+this.token,
    } };
  }
  constructor(
    private http: HttpClient
  ) { }

  set isEdit(isEdit: boolean){
    this._isEdit = isEdit;
  }
  set setModal(val: boolean) {
    this._displayModel = val;
  }
  set setModalRequestInfo(val: boolean) {
    this._displayModelActuados = val
  }

  getAllFuncionarios(page: number, per_page:number): Observable<GetAllFuncionaryPaginate>{
    const url = `${base_url}/functionary/index?page=${page}&per_page=${per_page}`;
    return this.http.get<GetAllFuncionaryPaginate>(url, this.headerToken);
  }

  getSearchFuncionarios(page: number, per_page:number, type: string, search:string): Observable<GetAllFuncionaryPaginate>{
    const url = `${base_url}/functionary/search?page=${page}&per_page=${per_page}&type=${type}&query=${search}`;
    return this.http.get<GetAllFuncionaryPaginate>(url, this.headerToken);
  }

  getFuncionariExist(ci:string) :Observable<any>{
    const url = `https://appgamc.cochabamba.bo/transparencia/servicio/busqueda_empleados.php`;
    const formData = new FormData();
    formData.append('dato', ci);
    formData.append('tipo', 'D');
    return this.http.post<any>(url,formData);
  }

  getActuadosByIdFuncionary(id_funcionary:number,page: number, per_page:number):Observable<GetAllActuados> {
    const url = `${base_url}/actuado/index?per_page=${per_page}&page=${page}&id_functionary=${id_funcionary}`;
    return this.http.get<GetAllActuados>(url, this.headerToken);
  }

  postFuncionario(formFuncionari: formFuncionari){
    const url = `${base_url}/functionary/new`;
    return this.http.post(url,formFuncionari, this.headerToken);
  }

  getNewPaginaPdfOpen(funcionari: Funcionari) {
    const url = `${base_url_public}/verPDF?id_f=${funcionari.id}`;
    window.open(url, '_blank');
  }
}

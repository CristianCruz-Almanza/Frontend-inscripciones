import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GetUserPaginate, Users } from '../interfaces/users.interface';
import { GetSoliPaginated, Regsoli } from '../interfaces/regsoli.interface';
import { User } from 'src/app/auth/auth.interface';
const base_url_public =  environment.base_url_public;
const base_url =  environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RegsoliService {
  id_user?: Users;
  public saving: EventEmitter<boolean> = new EventEmitter<boolean>();
  _displayModalRegsoli: boolean = false;
  _isEdit: boolean = false;
  public editSubs: EventEmitter<Regsoli> = new EventEmitter<Regsoli>();
  private _user!: User;

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headerToken() {
    return { headers: { 'Authorization' : 'Bearer '+this.token} };
  }

  constructor(
    private http: HttpClient
  ) { }

  set isEdit(isEdit: boolean){
    this._isEdit = isEdit;
  }
  set setModalRegsoli(val: boolean) {
    this._displayModalRegsoli = val;
  }
  get getUser() {
    return { ...this._user };
  }

  postNewRegsoli(regsoli: Regsoli) {
    const url = `${base_url}/inscription/new`;
    return this.http.post(url,regsoli,this.headerToken);
  }

  putActiveOrDestroyRegsoli(id: number, status: 1 | 0) {
    const url = `${base_url}/regsoli/activeOrDestroy/${id}?status=${status}`;
    return this.http.put(url,{} ,this.headerToken);
  }
  getAllRegsoli(status:boolean , id_user:number): Observable<GetSoliPaginated>{
    const url = `${base_url}/inscription/inscriptions?status=${status?1:0}&id_user=${id_user}`;
    return this.http.get<GetSoliPaginated>(url, this.headerToken);
  }
  getSearchRegsoli(type:string, per_page: number, page:number, search: string): Observable<GetSoliPaginated>{
    const url = `${base_url}/regsoli/search?type=${type}&per_page=${per_page}&page=${page}&query=${search}`;
    return this.http.get<GetSoliPaginated>(url, this.headerToken);
  }

  getAllRegsoliPaginate(status:boolean , page: number, per_page:number, id_user:number): Observable<GetSoliPaginated>{
    const url = `${base_url}/inscription/inscriptionsPaginated?status=${status?1:0}&page=${page}&per_page=${per_page}&id_user=${id_user}`;
    return this.http.get<GetSoliPaginated>(url, this.headerToken);
  }

  getNewPaginaPdfOpen(regsoli: Regsoli) {
    const url = `${base_url_public}/verPDF?id_s=${regsoli.id}`;
    window.open(url, '_blank');
  }

  puUpdateRegSoli(regsoli: Regsoli, id_regsoli:number) {
    const url = `${base_url}/inscription/update/${id_regsoli}`;
    return this.http.put(url,regsoli,this.headerToken);
  }

  //NO HAY EDITAR NO HICISTE ES F

}

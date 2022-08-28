import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GetUserPaginate, Users } from '../interfaces/users.interface';

const base_url =  environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public saving: EventEmitter<boolean> = new EventEmitter<boolean>();
  _displayModalUser: boolean = false;
  _isEdit: boolean = false;
  public editSubs: EventEmitter<Users> = new EventEmitter<Users>();


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
  set setModalUser(val: boolean) {
    this._displayModalUser = val;
  }


  postNewUsers(user: Users) {
    const url = `${base_url}/user/new`;
    return this.http.post(url,user,this.headerToken,);

  }
  putUpdateUser(user: Users, id_user:number) {
    const url = `${base_url}/user/update`;
    return this.http.post(url,user,this.headerToken);
  }

  putActiveOrDestroyOperators(id: number, status: 1 | 0) {
    const url = `${base_url}/user/destroyAndActive/${id}?status=${status}`;
    return this.http.put(url,{} ,this.headerToken);
  }
  getAllUsers(page: number, per_page:number): Observable<GetUserPaginate>{
    const url = `${base_url}/user/deweys?page=${page}&per_page=${per_page}`;

    return this.http.get<GetUserPaginate>(url, this.headerToken,);

  }
  getSearchFuncionarios(page: number, per_page:number, type: string, search:string): Observable<GetUserPaginate>{
    const url = `${base_url}/user/search?page=${page}&per_page=${per_page}&type=${type}&query=${search}`;
    return this.http.get<GetUserPaginate>(url, this.headerToken);
  }
  putActiveOrDestroyDewey(id: number, status: 1 | 0) {
    const url = `${base_url}/user/activeOrDestroy/${id}?status=${status}`;
    return this.http.put(url,{} ,this.headerToken);
  }
  getSearchDeweys(type:string, status:boolean, per_page: number, page:number, search: string): Observable<GetUserPaginate>{
    const url = `${base_url}/user/search?type=${type}&status=${status?1:0}&per_page=${per_page}&page=${page}&query=${search}`;
    return this.http.get<GetUserPaginate>(url, this.headerToken);
  }
}

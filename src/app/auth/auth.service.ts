import { Injectable } from '@angular/core';
import { Auth, FormLogin, User } from './auth.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../pages/funcionarios/interfaces/users.interface';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user!: User;

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headerToken() {
    return { headers: { 'Authorization' : 'Bearer '+this.token } };
  }
  get getUser() {
    return { ...this._user };
  }


  login(formData: FormLogin) : Observable<any> {
    return this.http.post<Auth>(`${base_url}/auth/login`, formData).
            pipe(
              tap( (resp: Auth)  => {
                this._user = resp.user;
                localStorage.setItem('token',resp.token);
              })
            );
  }
  register(formData: Users) : Observable<any> {
    return this.http.post<Auth>(`${base_url}/user/new`, formData).
            pipe(
              tap( (resp: Auth)  => {
                this._user = resp.user;
                localStorage.setItem('token',resp.token);
              })
            );
  }

  refresh() : Observable<boolean> {
    return this.http.post<Auth>(`${base_url}/auth/refresh`,{},this.headerToken)
    .pipe(
      map( (resp: Auth) => {
        this._user = resp.user;
        localStorage.setItem('token',resp.token);
        return true;
      }),
      catchError( error => {
        return of(false)
      })
    );
  }
}

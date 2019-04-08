import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

// Cosas que se reciclan
import { config } from './config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url = config.url;
  public identity: any;
  public token: string;

  constructor(public _http: HttpClient) { }

  register(user): Observable<any> {
    // Convertir el parámetro en un JSON string
    let json = JSON.stringify(user);
    // Definir parámetros a enviar
    let params = 'json=' + json;

    console.log(params);

    // Cabezeras
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    // Petición AJAX
    return this._http.post(this.url+'register', params, {headers: headers});
  }

  login(user, gettoken = null): Observable<any> {

    // Saber si quiero obtener la información del usuario o el Token
    if (gettoken != null) {
      user.gettoken = 'true';
    }
    // Convertir parámetro en JSON string
    let json = JSON.stringify(user);

    // Definir parámetros a enviar
    let params = 'json=' + json;

    // Cabezeras
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    // Petición AJAX
    return this._http.post(this.url + 'login', params, {headers: headers});
  }

  // Retornar información del usuario logueado
  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('user'));

    if (identity && identity != 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  // Retornar token del usuario logueado
  getToken() {

    let token = localStorage.getItem('token');

    if (token && token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }
}

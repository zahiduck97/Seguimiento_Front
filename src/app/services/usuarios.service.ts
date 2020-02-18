import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  post(data){
    return this.http.post(environment.Url_Service + 'Usuarios/', data);
  }

  get(){
    return this.http.get<Usuario[]>(environment.Url_Service + 'Usuarios/');
  }
}

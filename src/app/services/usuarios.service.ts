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

  put(data, id){
    return this.http.put(environment.Url_Service + 'Usuarios/' + id, data);
  }

  delete(id){
    return this.http.put(environment.Url_Service + 'Usuarios/activo/'+id, null);
  }

  // Update PAssword
  updatePassword(data, id) {
    return this.http.put(environment.Url_Service + 'Usuarios/password/' + id, data);
  }
}

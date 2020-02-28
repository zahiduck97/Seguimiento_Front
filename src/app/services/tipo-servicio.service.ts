import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoServicioService {
  constructor(private http: HttpClient) { }

  get(){
    return this.http.get(environment.Url_Service + 'TipoServicio/');
  }

  post(data){
    return this.http.post(environment.Url_Service + 'TipoServicio/', data);
  }

  // Update
  editar(data, id){
    return this.http.put(environment.Url_Service + 'TipoServicio/' + id, data);
  }

}

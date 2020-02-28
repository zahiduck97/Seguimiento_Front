import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProspectosService {

  
  constructor(private http: HttpClient) { }

  get(){
    return this.http.get(environment.Url_Service + 'Prospectos/');
  }

  // Validate the prospect
  put(data, id){
    return this.http.put(environment.Url_Service + 'Prospectos/' + id, data);
  }

  // Editar el prospect
  editar(data, id){
    return this.http.put(environment.Url_Service + 'Prospectos/editar/' + id, data);
  }

  post(data){
    return this.http.post(environment.Url_Service + 'Prospectos/', data);
  }

  getOne(id){
    return this.http.get(environment.Url_Service + 'Prospectos/'+id);
  }

  delete(id){
    return this.http.delete(environment.Url_Service + 'Prospectos/'+id);
  }
}

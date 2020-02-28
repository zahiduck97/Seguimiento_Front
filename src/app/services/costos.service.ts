import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CostosService {
  constructor(private http: HttpClient) { }

  get(){
    return this.http.get(environment.Url_Service + 'Costos/');
  }

  post(data){
    return this.http.post(environment.Url_Service + 'Costos/', data);
  }

  editar(data, id){
    return this.http.put(environment.Url_Service + 'Costos/' + id, data);
  }

  // Get 1
  get1Costo(id){
    return this.http.get(environment.Url_Service + 'Costos/' + id);
  }

}

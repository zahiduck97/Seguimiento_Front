import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get(environment.Url_Service + 'Servicios/');
  }

  post(data){
    return this.http.post(environment.Url_Service + 'Servicios/', data);
  }

  putEstatusUno(data, id){
    return this.http.put(environment.Url_Service + 'Servicios/estatusUno/' + id, data);
  }

  putEstatusDos(data, id){
    return this.http.put(environment.Url_Service + 'Servicios/estatusDos/' + id, data);
  }

  putEstatusTres(data, id){
    return this.http.put(environment.Url_Service + 'Servicios/estatusTres/' + id, data);
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  constructor(private http: HttpClient) { }

  // Insert movement
  post(data){
    return this.http.post(environment.Url_Service + 'Movimientos/', data);
  }

  // get
  get(){
    return this.http.get(environment.Url_Service + 'Movimientos/');
  }
}

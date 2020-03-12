import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CotizacionesService {

  constructor(
    public http: HttpClient
  ) { }

  // Get
  get() {
    return this.http.get(environment.Url_Service + 'Cotizaciones');
  }

  // Get
  post(data) {
    return this.http.post(environment.Url_Service + 'Cotizaciones', data);
  }
}

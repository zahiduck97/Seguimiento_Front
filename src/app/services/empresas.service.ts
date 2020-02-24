import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get(environment.Url_Service + 'Empresas/');
  }

  put(data){
    return this.http.put(environment.Url_Service + 'Empresas/'+data.id, data);
  }

  post(data){
    return this.http.post(environment.Url_Service + 'Empresas/', data);
  }

  getOne(id){
    return this.http.get(environment.Url_Service + 'Empresas/'+id);
  }

  delete(id){
    return this.http.put(environment.Url_Service + 'Empresas/activo/'+id, null);
  }
}

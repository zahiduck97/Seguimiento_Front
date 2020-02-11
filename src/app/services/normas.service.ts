import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NormasService {

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get(environment.Url_Service + 'Normas/');
  }

  post(data){
    return this.http.post(environment.Url_Service + 'Normas/', data);
  }


}

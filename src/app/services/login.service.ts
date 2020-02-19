import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RespuestaUser} from '../models/respuestaUser';
import { Socket } from 'ngx-socket-io';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( public http: HttpClient, private socket: Socket) { }

  // Check if its true
  validarUsuario(data) {
    return this.http.put<RespuestaUser>(environment.Url_Service + 'Login/checkUser', data);
  }

  // Sockets
  putStatusNavbar(status: boolean, rol: number){
    this.socket.emit('navbarStatus', { status, rol });
  }

  getStatusNavbar() {
    return this.socket
      .fromEvent<any>('navbarStatus').pipe(map(data => data));
  }
}



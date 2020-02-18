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

  sendMessage(msg: string){
    this.socket.emit('ferret', msg);
  }

  getMessage() {
    return this.socket
      .fromEvent<any>('msg').pipe(map(data => data.hello));
  }
}



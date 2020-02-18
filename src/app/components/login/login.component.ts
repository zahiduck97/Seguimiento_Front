import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  public usuario = {
    username: '',
    password: ''
  }

  public preloaderActivo = false;
  public desactivado = false;

  constructor(private loginServices: LoginService, private router: Router) { }

  async login() {
    console.log(this.usuario)
    this.preloaderActivo = true;
    this.desactivado = true;
    await this.loginServices.validarUsuario(this.usuario).toPromise()
      .then( res => {
          sessionStorage.setItem('id', res.id.toString());
          sessionStorage.setItem('rol', res.rol.toString());
          Swal.fire({
            title: 'Bienvenido de nuevo',
            confirmButtonText: 'Seguir'
          });
          this.router.navigate(['/index']);
        }
      )
      .catch(e => {
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error',
          text: e.error.mensaje
        });
      }).finally(() => {
        this.preloaderActivo = false;
        this.desactivado = false;
      });
  }

}

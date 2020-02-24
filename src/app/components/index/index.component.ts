import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public rol;

  constructor(private router: Router) { this.validarUsuario(); }

  ngOnInit() {
    this.rol = parseInt(sessionStorage.rol);
  }

  // Tine prmisos o esta autenticado
  validarUsuario(){
    let id = sessionStorage.id;
    if(!id){
      this.router.navigate(['/']);
      Swal.fire({
        title: 'Error',
        text: 'Debes iniciar sesion primero',
        icon: 'warning'
      });
    }
  }

}

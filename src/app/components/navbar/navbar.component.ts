import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public showNavbar = false;
  public rol = 0

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getStatusNavbar().subscribe(data => {
      if(sessionStorage.getItem('id') && sessionStorage.rol){
        this.showNavbar = true;
        this.rol = parseInt(sessionStorage.rol);
      } else {
        this.showNavbar = data.status;
        this.rol = data.rol;
        console.log(data)
      }
    })
  }

  logOut(){
    Swal.fire({
      title: '¿Estas seguro que quieres cerrar sesion?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ya me voy',
      cancelButtonText: 'No, todavia no'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Cerraste tu sesion',
          icon: 'success'
        });
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('rol');
        this.loginService.putStatusNavbar(false, 0);
        this.router.navigate(['/']);
      }
    });
  }

}

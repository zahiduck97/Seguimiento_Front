import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getMessage().subscribe(msg => {
      console.log(msg);
    })
    this.loginService.sendMessage('que paso pro');
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
        Swal.fire(
          'Cerraste tu sesion',
          'success'
        );
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('rol');
        this.router.navigate(['/']);
      }
    });
  }

}

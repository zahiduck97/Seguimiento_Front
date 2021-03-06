import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from "sweetalert2"
import { MovimientosService } from 'src/app/services/movimientos.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent {

  public preloaderActivo = false;
  public desactivado = false;
  public confirm='';

  public usuario = {
    nombre: '',
    username: '',
    password: '',
    rol: 0
  }
  
  constructor(
    public dialogRef: MatDialogRef<AddUsuarioComponent>, 
    private usuariosService: UsuariosService,
    public movimientosService: MovimientosService
    ) { }


  cerrarModal(){
    this.dialogRef.close();
  }

  async agregarUsuario (){
    this.preloaderActivo = true;
    this.desactivado = true;
    await this.usuariosService.post(this.usuario).toPromise()
      .then(
        () => {
          let aux;
          aux = (this.usuario.rol == 1) ? "Usuario Normal": "Usuario Administrador";
          let movimiento = {
            idUsuario: sessionStorage.id,
            tipo: 1,
            descripcion: `Se creo el usuario:  "${this.usuario.nombre}" que es un: "${aux}", con el username "${this.usuario.username}"`
          }
          this.movimientosService.post(movimiento).subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Se inserto el usuario',
            });
            this.dialogRef.close(true);
          })
        }
      )
      .catch(e => {
        if(!e.error.mensaje)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El servidor no esta conectado'
          });
        else 
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: e.error.mensaje
          });
      }).finally( () => {
        this.preloaderActivo = false;
        this.desactivado = false;
      })
  }

}

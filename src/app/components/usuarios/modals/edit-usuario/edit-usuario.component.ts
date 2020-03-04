import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MovimientosService } from 'src/app/services/movimientos.service';
import Swal from "sweetalert2"

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnInit {
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
    public dialogRef: MatDialogRef<EditUsuarioComponent>, 
    private usuariosService: UsuariosService,
    public movimientosService: MovimientosService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    ) { }

  ngOnInit(){
    console.log(this.data);
    this.usuario.nombre = this.data.nombre;
    this.usuario.username = this.data.username;
    this.usuario.rol = this.data.rol;
  }


  cerrarModal(){
    this.dialogRef.close();
  }

  async editar (){
    this.preloaderActivo = true;
    this.desactivado = true;
    await this.usuariosService.put(this.usuario, this.data.id).toPromise()
      .then(
        () => {
          let aux; let auxold;
          aux = (this.usuario.rol == 1) ? "Usuario Normal": "Usuario Administrador";
          auxold = (this.data.rol == 1) ? "Usuario Normal": "Usuario Administrador";
          let movimiento = {
            idUsuario: sessionStorage.id,
            tipo: 2,
            descripcion: `Se actualizo el usuario de:  "${this.data.nombre}" que era: "${auxold}" y tenia el username: "${this.data.username}" A: "${this.usuario.nombre}" que es: "${aux}" y tiene el username: "${this.usuario.username}"`
          }
          this.movimientosService.post(movimiento).subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Se actualizo el usuario',
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

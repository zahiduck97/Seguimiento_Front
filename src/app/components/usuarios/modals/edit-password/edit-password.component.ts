import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from "sweetalert2";
import { MovimientosService } from 'src/app/services/movimientos.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {
  
  public preloaderActivo = false;
  public desactivado = false;
  public isDifferent = false;
  public usuario = {
    password: '',
    confirm: ''
  }
  
  ngOnInit(){
    console.log(this.data);
  }
  
  constructor(
    public dialogRef: MatDialogRef<EditPasswordComponent>, 
    private usuariosService: UsuariosService, 
    @Inject(MAT_DIALOG_DATA) public data:any,
    public movimientosService: MovimientosService) { }


  cerrarModal(){
    this.dialogRef.close();
  }

  
  // Te quedaste aqui, ibas a editar
  async editarPassword(){
    console.log(this.usuario);
    this.preloaderActivo = true;
    this.desactivado = true;
    await this.usuariosService.updatePassword(this.usuario, this.data.id).toPromise()
      .then(
        () => {
          let movimiento = {
            idUsuario: sessionStorage.id,
            tipo: 2,
            descripcion: `A el usuario:  "${this.data.nombre}" se le cambio la contraseña.`
          }
          this.movimientosService.post(movimiento).subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Se cambio la contraseña'
            })
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
          })
        else 
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: e.error.mensaje
          })
      }).finally( () => {
        this.preloaderActivo = false;
        this.desactivado = false;
      })
  }

}

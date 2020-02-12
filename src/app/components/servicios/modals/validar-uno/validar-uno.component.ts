import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from "sweetalert2"
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-validar-uno',
  templateUrl: './validar-uno.component.html',
  styleUrls: ['./validar-uno.component.css']
})
export class ValidarUnoComponent  {

  public servicio = {
    contratos: 0,
    idUsuario: 0
  }
  
  public preloaderActivo = false;
  public desactivado = false;

  constructor(
    public dialogRef: MatDialogRef<ValidarUnoComponent>,
    public serviciosService: ServiciosService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }


  // Close the modal
  cerrarModal(){
    this.dialogRef.close();
  }

  guardar(){
    this.servicio.contratos = (this.servicio.contratos) ? 1: 0;
    console.log(this.servicio)
    this.serviciosService.putEstatusUno(this.servicio, this.data.id)
    .subscribe(res => {
      Swal.fire({ 
        icon: 'success',
        title: 'Se actualizo el servicio'
      })
      this.dialogRef.close('ok');
    }, 
    e => {
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
    }, 
    () => {
      this.preloaderActivo = false;
      this.desactivado = false;
    });
  }


}

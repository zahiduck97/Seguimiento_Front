import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiciosService } from 'src/app/services/servicios.service';
import Swal from "sweetalert2"

@Component({
  selector: 'app-validar-tres',
  templateUrl: './validar-tres.component.html',
  styleUrls: ['./validar-tres.component.css']
})
export class ValidarTresComponent  {

  public servicio = {
    comunicado: 0,
    certificado: 0
  }
  
  public preloaderActivo = false;
  public desactivado = false;

  constructor(
    public dialogRef: MatDialogRef<ValidarTresComponent>,
    public serviciosService: ServiciosService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }


  // Close the modal
  cerrarModal(){
    this.dialogRef.close();
  }

  guardar(){
    this.servicio.comunicado = (this.servicio.comunicado) ? 1 : 0
    this.servicio.certificado = (this.servicio.certificado) ? 1 : 0
    console.log(this.servicio)
    this.serviciosService.putEstatusTres(this.servicio, this.data.id)
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

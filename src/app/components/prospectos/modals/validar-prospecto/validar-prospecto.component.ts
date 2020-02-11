import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProspectosService } from '../../../../services/prospectos.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-validar-prospecto',
  templateUrl: './validar-prospecto.component.html',
  styleUrls: ['./validar-prospecto.component.css']
})
export class ValidarProspectoComponent implements OnInit {

  public prospecto = {
    contrato: false,
    acta: false,
    rfc: false,
    carta: false
  }

  public preloaderActivo = false;
  public desactivado = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ValidarProspectoComponent>,
    public prospectosService: ProspectosService
    ) { }

  ngOnInit() {
    console.log(this.data);
  }

  // Close the modal
  cerrarModal(){
    this.dialogRef.close();
  }

  guardar(){
    console.log(this.prospecto);
    this.prospectosService.put(this.prospecto, this.data.id)
    .subscribe(res => {
      Swal.fire({ 
        icon: 'success',
        title: 'Se inserto el prospecto'
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

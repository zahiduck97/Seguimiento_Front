import { Component, OnInit } from '@angular/core';
import { NormasService } from '../../../../services/normas.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-norma',
  templateUrl: './add-norma.component.html',
  styleUrls: ['./add-norma.component.css']
})
export class AddNormaComponent {

  public norma = {
    codificacion: ""
  }

  public preloaderActivo = false;
  public desactivado = false;
  
  constructor(
    public normasService: NormasService,
    public dialogRef: MatDialogRef<AddNormaComponent>
    ) { }


  // Post a Norm
  async guardar(){
    this.preloaderActivo = true;
    this.desactivado = true;
    await this.normasService.post(this.norma).toPromise()
      .then(
        empresaDb => {
          Swal.fire({ 
            icon: 'success',
            title: 'Se inserto la norma'
          })
          this.dialogRef.close(empresaDb);
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


  // Close the modal
  cerrarModal(){
    this.dialogRef.close();
  }

}

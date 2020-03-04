import { Component, OnInit } from '@angular/core';
import { NormasService } from '../../../../services/normas.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from "sweetalert2";
import { MovimientosService } from 'src/app/services/movimientos.service';

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
    public dialogRef: MatDialogRef<AddNormaComponent>,
    public movimientosService: MovimientosService
    ) { }


  // Post a Norm
  async guardar(){
    this.preloaderActivo = true;
    this.desactivado = true;
    await this.normasService.post(this.norma).toPromise()
      .then(
        empresaDb => {
          let movimiento = {
            idUsuario: sessionStorage.id,
            tipo: 1,
            descripcion: `Se creo la Norma:  "${this.norma.codificacion}"`
          }
          this.movimientosService.post(movimiento).subscribe(() => {
            Swal.fire({ 
              icon: 'success',
              title: 'Se inserto la norma'
            })
            this.dialogRef.close(empresaDb);
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


  // Close the modal
  cerrarModal(){
    this.dialogRef.close();
  }

}

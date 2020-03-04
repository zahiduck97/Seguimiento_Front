import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2"
import { TipoServicioService } from '../../../../services/tipo-servicio.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MovimientosService } from 'src/app/services/movimientos.service';

@Component({
  selector: 'app-add-tipo-servicio',
  templateUrl: './add-tipo-servicio.component.html',
  styleUrls: ['./add-tipo-servicio.component.css']
})
export class AddTipoServicioComponent {

 
  public tipoServicio = {
    nombre: ""
  }

  public preloaderActivo = false;
  public desactivado = false;
  
  constructor(
    public tipoService: TipoServicioService,
    public dialogRef: MatDialogRef<AddTipoServicioComponent>,
    public movimientosService: MovimientosService
    ) { }


  // Post a Norm
  async guardar(){
    this.preloaderActivo = true;
    this.desactivado = true;
    await this.tipoService.post(this.tipoServicio).toPromise()
      .then(
        empresaDb => {

          let movimiento = {
            idUsuario: sessionStorage.id,
            tipo: 1,
            descripcion: `Se creo el tipo de servicio:  "${this.tipoServicio.nombre}"`
          }
          this.movimientosService.post(movimiento).subscribe(() => {
            Swal.fire({ 
              icon: 'success',
              title: 'Se inserto el servicio'
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

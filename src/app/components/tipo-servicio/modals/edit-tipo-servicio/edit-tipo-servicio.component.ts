import { Component, OnInit, Inject } from '@angular/core';
import { TipoServicioService } from 'src/app/services/tipo-servicio.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovimientosService } from 'src/app/services/movimientos.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-tipo-servicio',
  templateUrl: './edit-tipo-servicio.component.html',
  styleUrls: ['./edit-tipo-servicio.component.css']
})
export class EditTipoServicioComponent implements OnInit {

 
 
  public tipoServicio = {
    nombre: ""
  }

  public preloaderActivo = false;
  public desactivado = false;
  
  constructor(
    public tipoService: TipoServicioService,
    public dialogRef: MatDialogRef<EditTipoServicioComponent>,
    public movimientosService: MovimientosService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    ) { }

  // Ng on init
  ngOnInit(){
    this.tipoServicio.nombre = this.data.nombre;
  }


  // Post a Norm
  async guardar(){
    this.preloaderActivo = true;
    this.desactivado = true;
    await this.tipoService.editar(this.tipoServicio, this.data.id).toPromise()
      .then(
        empresaDb => {

          let movimiento = {
            idUsuario: sessionStorage.id,
            tipo: 2,
            descripcion: `Se Modifico el tipo de servicio de: ${this.data.nombre} A: ${this.tipoServicio.nombre}`
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

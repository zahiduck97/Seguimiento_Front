import { Component, OnInit, ViewChild } from '@angular/core';
import { NormasService } from 'src/app/services/normas.service';
import { TipoServicioService } from '../../../../services/tipo-servicio.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { CostosService } from '../../../../services/costos.service';
import { MovimientosService } from 'src/app/services/movimientos.service';

@Component({
  selector: 'app-add-costo',
  templateUrl: './add-costo.component.html',
  styleUrls: ['./add-costo.component.css']
})
export class AddCostoComponent implements OnInit {

  public costo = {
    idNorma: 0,
    idTipoServicio: 0,
    costo: 0
  }

  public preloaderActivo = false;
  public desactivado = false;
  public normas: any = [];
  public servicios: any = [];

  constructor(
    public normasService: NormasService,
    public tipoServicioService: TipoServicioService,
    public dialogRef: MatDialogRef<AddCostoComponent>,
    public costosService: CostosService,
    public movimientosService: MovimientosService
  ) { }

  ngOnInit() {
    this.getNormas();
    this.getServicios();
  }

  getNormas(){
    this.normasService.get()
    .subscribe(
      data => {
        this.normas = data;
        console.log(this.normas);
        this.preloaderActivo = false;
        this.desactivado = false;
      },
      err => {
        console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err
          });

        this.preloaderActivo = false;
        this.desactivado = false;
      }
    )
  }

  getServicios(){
    this.tipoServicioService.get()
    .subscribe(
      data => {
        this.servicios = data;
        console.log(this.servicios);
        this.preloaderActivo = false;
        this.desactivado = false;
      },
      err => {
        console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err
          });

        this.preloaderActivo = false;
        this.desactivado = false;
      }
    )
  }

   // Close the modal
   cerrarModal(){
    this.dialogRef.close();
  }

  async guardar(){
    console.log(this.costo);
    await this.costosService.post(this.costo)
      .subscribe(res => {
        console.log(res);
        let movimiento = {
          idUsuario: sessionStorage.id,
          tipo: 1,
          descripcion: `Se creo un costo para la norma:  "${res['codificacion']}" y el tipo de servicio: "${res['nombre']}" con un valor de: "$${res['costo']}"`
        }
        this.movimientosService.post(movimiento).subscribe(() => {
          Swal.fire({ 
            icon: 'success',
            title: 'Se inserto el costo'
          })
          this.dialogRef.close('ok');
        })
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

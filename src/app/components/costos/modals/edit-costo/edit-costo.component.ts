import {Component, Inject, OnInit} from '@angular/core';
import {NormasService} from '../../../../services/normas.service';
import {TipoServicioService} from '../../../../services/tipo-servicio.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CostosService} from '../../../../services/costos.service';
import {MovimientosService} from '../../../../services/movimientos.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-costo',
  templateUrl: './edit-costo.component.html',
  styleUrls: ['./edit-costo.component.css']
})
export class EditCostoComponent implements OnInit {

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
    public dialogRef: MatDialogRef<EditCostoComponent>,
    public costosService: CostosService,
    public movimientosService: MovimientosService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.costo.idNorma = this.data.idNorma;
    this.costo.idTipoServicio = this.data.idTipoServicio;
    this.costo.costo = this.data.costo;
    console.log(this.data, this.costo)
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
    this.costosService.get1Costo(this.data.id).subscribe({next: async resultado => {
        await this.costosService.editar(this.costo, this.data.id)
          .subscribe(res => {
              console.log(res);
              let movimiento = {
                idUsuario: sessionStorage.id,
                tipo: 2,
                descripcion: `Se modifico el costo de: ${resultado['codificacion']}, ${resultado['nombre']}, ${resultado['costo']}  A: ${res['codificacion']}, ${res['nombre']}, ${res['costo']}`
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
      }});
  }

}

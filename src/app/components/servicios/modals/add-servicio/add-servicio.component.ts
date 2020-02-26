import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2"
import { NormasService } from 'src/app/services/normas.service';
import { ProspectosService } from 'src/app/services/prospectos.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MovimientosService } from 'src/app/services/movimientos.service';

@Component({
  selector: 'app-add-servicio',
  templateUrl: './add-servicio.component.html',
  styleUrls: ['./add-servicio.component.css']
})
export class AddServicioComponent implements OnInit {

  
  public servicio = {
    idNorma: 0,
    idProspecto: 0,
    tipoServicio: 0,
  }

  public preloaderActivo = false;
  public desactivado = false;
  public normas: any = [];
  public prospectos: any = [];

  constructor(
    public normasService: NormasService,
    public prospectosService: ProspectosService,
    public dialogRef: MatDialogRef<AddServicioComponent>,
    public serviciosService: ServiciosService,
    public movimientosService: MovimientosService
  ) { }

  ngOnInit() {
    this.getNormas();
    this.getProspectos();
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

  getProspectos(){
    this.prospectosService.get()
    .subscribe(
      data => {
        this.prospectos = data;
        console.log(this.prospectos);
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
     console.log(this.servicio);
    await this.serviciosService.post(this.servicio)
      .subscribe(res => {
        let movimiento = {
          idUsuario: sessionStorage.id,
          tipo: 1,
          descripcion: `Se agrego un nuevo servicio para el prospecto:  ${res['nombre']},  en la norma: ${res['codificacion']}`
        }
        this.movimientosService.post(movimiento).subscribe(() => {
          Swal.fire({ 
            icon: 'success',
            title: 'Se inserto el servicio'
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

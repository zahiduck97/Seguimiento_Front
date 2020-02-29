import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2"
import { CotizacionesService } from 'src/app/services/cotizaciones.service';
import { MatDialogRef } from '@angular/material';
import { CostosService } from 'src/app/services/costos.service';
import { MovimientosService } from 'src/app/services/movimientos.service';
import { ProspectosService } from 'src/app/services/prospectos.service';
import { NormasService } from 'src/app/services/normas.service';

@Component({
  selector: 'app-add-cotizacion',
  templateUrl: './add-cotizacion.component.html',
  styleUrls: ['./add-cotizacion.component.css']
})
export class AddCotizacionComponent implements OnInit {

  public cotizacion = {
    idProspecto: 0,
    idCosto: 0,
    comentario: '',
    idNorma: null,
    idTipoServicio: null
  }

  public preloaderActivo = false;
  public desactivado = false;
  public prospectos: any = [];
  public costos: any = [];
  public tipoServicio: any = [];
  public normas: any = []
  public total = 0;

  constructor(
    public cotizacionesService: CotizacionesService,
    public dialogRef: MatDialogRef<AddCotizacionComponent>,
    public costosService: CostosService,
    public prospectosService: ProspectosService,
    public movimientosService: MovimientosService,
    public normasService: NormasService
  ) { }

  ngOnInit() {
    this.getProspectos();
    this.getCostos();
    this.getNormas();
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

  getCostos(){
    this.costosService.get()
    .subscribe(
      data => {
        this.costos = data;
        console.log(this.costos);
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

  buscarTipoServicio(){
    var aux = this.cotizacion.idNorma;
    this.tipoServicio = this.costos.filter(function (data){
      return data.idNorma == aux
    })
    console.log(this.tipoServicio, this.cotizacion.idTipoServicio);
    if(this.tipoServicio.length == 0){
      this.total = 0
      this.cotizacion.idCosto = 0
    }
  }

  buscarCosto(){
    console.log(this.cotizacion);
    var norma = this.cotizacion.idNorma; 
    var tipo = this.cotizacion.idTipoServicio;
    let aux = this.costos.filter(function (data) {
      return data.idNorma == norma && data.idTipoServicio == tipo
    })
    this.total = aux[0].costo
    this.cotizacion.idCosto = aux[0].id
    console.log(this.total);
  }

   // Close the modal
   cerrarModal(){
    this.dialogRef.close();
  }

  async guardar(){
    console.log(this.cotizacion);
    await this.cotizacionesService.post(this.cotizacion)
      .subscribe(res => {
        console.log(res);
        let nombre; let norma; let tipoService;
        for(let i = 0; i < this.prospectos.length; i++){
          if(this.prospectos[i].id == this.cotizacion.idProspecto){
            nombre = this.prospectos[i].nombre
          }
        }

        for(let i = 0; i < this.costos.length; i++){
          if(this.costos[i].idNorma == this.cotizacion.idNorma){
            norma = this.costos[i].codificacion
          }

          if(this.costos[i].idTipoServicio == this.cotizacion.idTipoServicio){
            tipoService = this.costos[i].nombre
          }

          if(norma && tipoService)
            break;
        }

        let movimiento = {
          idUsuario: sessionStorage.id,
          tipo: 1,
          descripcion: `Se creo una cotizacion para: ${nombre} de la norma: ${norma} y del tipo de servicio: ${tipoService}`
        }
        this.movimientosService.post(movimiento).subscribe(() => {
          Swal.fire({ 
            icon: 'success',
            title: 'Se inserto la cotizacion'
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

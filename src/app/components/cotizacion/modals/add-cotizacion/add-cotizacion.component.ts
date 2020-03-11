import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2"
import { CotizacionesService } from 'src/app/services/cotizaciones.service';
import { MatDialogRef } from '@angular/material';
import { CostosService } from 'src/app/services/costos.service';
import { MovimientosService } from 'src/app/services/movimientos.service';
import { ProspectosService } from 'src/app/services/prospectos.service';
import { NormasService } from 'src/app/services/normas.service';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-cotizacion',
  templateUrl: './add-cotizacion.component.html',
  styleUrls: ['./add-cotizacion.component.css']
})
export class AddCotizacionComponent implements OnInit {

  public cotizacion = {
    idProspecto: 0,
    idCosto: [],
    comentario: '',
    costos: []
  }

  public preloaderActivo = false;
  public desactivado = false;
  public prospectos: any = [];
  public costos: any = [];
  public tipoServicio: any = [];
  public normas: any = []
  public total = 0;

  public normasArray = new FormArray([]);
  public serviciosArray = new FormArray([]);

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
        this.normas[0] = data;
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

  buscarTipoServicio(i: number){
    var aux = this.normasArray.controls[i].value
    this.tipoServicio[i] = this.costos.filter(function (data){
      return data.idNorma == aux
    })
  
    if(this.tipoServicio[i].length == 0){
      this.total = 0
      this.cotizacion.costos[i] = 0
    }
  }

  buscarCosto(i: number){
    var norma = this.normasArray.controls[i].value
    var tipo = this.serviciosArray.controls[i].value
    let aux = this.costos.filter(function (data) {
      return data.idNorma == norma && data.idTipoServicio == tipo
    })
    this.cotizacion.idCosto[i] = aux[0].id;
    this.cotizacion.costos[i] = aux[0].costo;
    this.sumaCosto();
    console.log(this.cotizacion);
  }

  sumaCosto(){
    this.total = 0;
    for(let i = 0; i<this.cotizacion.costos.length; i++){
      this.total += this.cotizacion.costos[i]
    }
  }

  // Close the modal
  cerrarModal(){
    this.dialogRef.close();
  }

  async guardar(){
    console.log(this.normasArray.controls, this.serviciosArray.controls);
    console.log(this.cotizacion);
    Swal.fire({
      title: '¿Estas seguro que ya quieres guardar la cotización?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    // await this.cotizacionesService.post(this.cotizacion)
    //   .subscribe(res => {
    //     console.log(res);
    //     let nombre; let norma; let tipoService;
    //     for(let i = 0; i < this.prospectos.length; i++){
    //       if(this.prospectos[i].id == this.cotizacion.idProspecto){
    //         nombre = this.prospectos[i].nombre
    //       }
    //     }

    //     for(let i = 0; i < this.costos.length; i++){
    //       // if(this.costos[i].idNorma == this.cotizacion.idNorma){
    //         norma = this.costos[i].codificacion
    //       }

    //       if(this.costos[i].idTipoServicio == this.cotizacion.idTipoServicio){
    //         tipoService = this.costos[i].nombre
    //       }

    //       if(norma && tipoService)
    //         break;
    //     }

    //     let movimiento = {
    //       idUsuario: sessionStorage.id,
    //       tipo: 1,
    //       descripcion: `Se creo una cotizacion para: ${nombre} de la norma: ${norma} y del tipo de servicio: ${tipoService}`
    //     }
    //     this.movimientosService.post(movimiento).subscribe(() => {
    //       Swal.fire({ 
    //         icon: 'success',
    //         title: 'Se inserto la cotizacion'
    //       })
    //       this.dialogRef.close('ok');
    //     })
    //   }, 
    //   e => {
    //     if(!e.error.mensaje)
    //       Swal.fire({ 
    //         icon: 'error',
    //         title: 'Error',
    //         text: 'El servidor no esta conectado'
    //       })
    //     else 
    //       Swal.fire({ 
    //         icon: 'error',
    //         title: 'Error',
    //         text: e.error.mensaje
    //       })
    //   }, 
    //   () => {
    //     this.preloaderActivo = false;
    //     this.desactivado = false;
    //   });
  }
  
  quitar(index: number) {
    this.normasArray.removeAt(index);
    this.serviciosArray.removeAt(index);
    this.cotizacion.idCosto.splice(index, 1);
    this.cotizacion.costos.splice(index, 1);
    this.normas.splice(index, 1);
    this.tipoServicio.splice(index, 1);
    this.sumaCosto();
  }


  agregar() {
    this.normasArray.push(new FormControl(''));
    this.serviciosArray.push(new FormControl(''));
    this.normas[this.normas.length] = this.normas[this.normas.length-1]
  }
}

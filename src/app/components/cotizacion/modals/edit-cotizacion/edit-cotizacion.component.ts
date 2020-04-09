import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormControl} from '@angular/forms';
import {CotizacionesService} from '../../../../services/cotizaciones.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CostosService} from '../../../../services/costos.service';
import {ProspectosService} from '../../../../services/prospectos.service';
import {MovimientosService} from '../../../../services/movimientos.service';
import {NormasService} from '../../../../services/normas.service';
import Swal from 'sweetalert2';
import {of} from 'rxjs';

@Component({
  selector: 'app-edit-cotizacion',
  templateUrl: './edit-cotizacion.component.html',
  styleUrls: ['./edit-cotizacion.component.css']
})
export class EditCotizacionComponent implements OnInit {

  public cotizacion = {
    idProspecto: 0,
    idCosto: [],
    comentario: '',
    costos: [],
    total: 0,
    codificacion: [],
    nombre: []
  };

  public preloaderActivo = false;
  public desactivado = false;
  public prospectos: any = [];
  public costos: any = [];
  public tipoServicio: any = [];
  public normas: any = [];
  public total = 0;

  public normasArray = new FormArray([]);
  public serviciosArray = new FormArray([]);

  constructor(
    public cotizacionesService: CotizacionesService,
    public dialogRef: MatDialogRef<EditCotizacionComponent>,
    public costosService: CostosService,
    public prospectosService: ProspectosService,
    public movimientosService: MovimientosService,
    public normasService: NormasService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.getProspectos();
    this.getCostos();
  }

  getProspectos() {
    this.prospectosService.get()
      .subscribe(
        data => {
          this.prospectos = data;
          this.preloaderActivo = false;
          this.desactivado = false;
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err
          });

          this.preloaderActivo = false;
          this.desactivado = false;
        },
        () => {
          this.cotizacion.idProspecto = this.data.idProspecto;
          this.cotizacion.comentario = this.data.comentario;
        }
      );
  }

  getCostos() {
    this.preloaderActivo = true;
    this.desactivado = true;
    this.costosService.get()
      .subscribe(
        data => {
          this.costos = data;
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err
          });
          this.preloaderActivo = false;
          this.desactivado = false;
        },
        () => {
          // Complete getting normas
          this.normasService.get()
            .subscribe(
              data => {
                this.normas[0] = data;
              },
              err => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: err
                });
              },
              async () => {
                const aux = this.data.idCosto.split(',');
                for (let i = 0; i < aux.length; i++) {
                  await this.agregar();
                  const newData = this.costos.filter(data => {
                    return data.id === parseInt(aux[i], 10);
                  });
                  this.normasArray.controls[i].setValue(newData[0].idNorma);
                  await this.buscarTipoServicio(i);
                  this.serviciosArray.controls[i].setValue(newData[0].idTipoServicio);
                  await this.buscarCosto(i);
                }
                this.preloaderActivo = false;
                this.desactivado = false;
              }
            );
        }
      );
  }

  buscarTipoServicio(i: number) {
    const aux = this.normasArray.controls[i].value;
    this.tipoServicio[i] = this.costos.filter((data) => {
      return data.idNorma === aux;
    });
    if (this.tipoServicio[i].length === 0) {
      this.total = 0;
      this.cotizacion.costos[i] = 0;
    }
  }

  buscarCosto(i: number) {
    const norma = this.normasArray.controls[i].value;
    const tipo = this.serviciosArray.controls[i].value;
    const aux = this.costos.filter((data) => {
      return data.idNorma === norma && data.idTipoServicio === tipo;
    });
    this.cotizacion.idCosto[i] = aux[0].id;
    this.cotizacion.costos[i] = aux[0].costo;
    this.cotizacion.codificacion[i] = aux[0].codificacion;
    this.cotizacion.nombre[i] = aux[0].nombre;
    this.sumaCosto();
  }

  sumaCosto() {
    this.total = 0;
    for (let i = 0; i < this.cotizacion.costos.length; i++) {
      this.total += this.cotizacion.costos[i];
    }
  }

  // Close the modal
  cerrarModal() {
    this.dialogRef.close();
  }

  async guardar() {
    this.cotizacion.total = this.total;
    console.log(this.cotizacion);
    Swal.fire({
      title: '¿Estas seguro que quieres actualizar la cotización?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.preloaderActivo = true;
        this.desactivado = true;
        this.cotizacion.idCosto[0] = this.cotizacion.idCosto.toString();

        // Para obtener el nombre del prospecto
        const prospecto = this.prospectos.filter(res => res.id === this.cotizacion.idProspecto);

        // Para obtener la codificacion y tipo de servicio
        let normas = '';
        for (let i = 0; i < this.cotizacion.codificacion.length; i++) {
          normas += `"${this.cotizacion.nombre[i]}" de la norma: "${this.cotizacion.codificacion[i]}", `;
        }
        this.cotizacionesService.put(this.cotizacion, this.data.id)
          .subscribe({next: () => {
              const movimiento = {
                idUsuario: sessionStorage.id,
                tipo: 1,
                descripcion: `Se actualizó una cotizacion para: "${prospecto[0].nombre}"
                con los siguientes datos: ${normas} y fue un total de: "$${this.total}"`
              };
              this.movimientosService.post(movimiento).subscribe(() => {
                Swal.fire({
                  icon: 'success',
                  title: 'Se actualizó la cotizacion'
                });
                this.dialogRef.close('ok');
              });
            },
            error: e => {
              this.preloaderActivo = false;
              this.desactivado = false;
              if (!e.error.mensaje) {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'El servidor no esta conectado'
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: e.error.mensaje
                });
              }
            },
            complete: () => {
              this.preloaderActivo = false;
              this.desactivado = false;
              this.dialogRef.close('ok');
            }
          });
      }
    });
  }

  quitar(index: number) {
    this.normasArray.removeAt(index);
    this.serviciosArray.removeAt(index);
    this.cotizacion.idCosto.splice(index, 1);
    this.cotizacion.costos.splice(index, 1);
    this.cotizacion.codificacion.splice(index, 1);
    this.cotizacion.nombre.splice(index, 1);
    this.normas.splice(index, 1);
    this.tipoServicio.splice(index, 1);
    this.sumaCosto();
  }


  agregar() {
    this.normasArray.push(new FormControl(''));
    this.serviciosArray.push(new FormControl(''));
    this.normas[this.normas.length] = this.normas[this.normas.length - 1];
  }
}

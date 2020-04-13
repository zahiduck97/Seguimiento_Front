import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from "sweetalert2"
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { CotizacionesService } from 'src/app/services/cotizaciones.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AddCotizacionComponent } from './modals/add-cotizacion/add-cotizacion.component';
import {InformacionCotizacionComponent} from './modals/informacion-cotizacion/informacion-cotizacion.component';
import {MovimientosService} from '../../services/movimientos.service';
import {EditCotizacionComponent} from './modals/edit-cotizacion/edit-cotizacion.component';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {
  public cotizaciones : any = [];
  public preloaderActivo = false;
  public desactivado = false;


  // Table
  public displayedColumns: string[] = ['prospecto', 'fecha', 'comentario', 'total', 'acciones'];
  public dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public cotizacionService: CotizacionesService,
    private router: Router,
    public dialog: MatDialog,
    public movimientosService: MovimientosService
    ) { this.validarUsuario(); }


  // Al iniciar
  ngOnInit() {
    this.conectarServidor();
    this.dataSource.paginator = this.paginator;
  }

  // get all norms
  conectarServidor(){
    this.preloaderActivo = true;
    this.desactivado = true;
    this.cotizacionService.get()
      .subscribe(
        db => {
          this.cotizaciones = db;
          this.cotizaciones.filter(data => data.fecha = data.fecha.substring(0, 10));
          console.log(this.cotizaciones);
          this.preloaderActivo = false;
          this.desactivado = false;
          this.dataSource.data = this.cotizaciones
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

  // Abrir formulario en modal
  async nuevo() {
    const dialogRef = this.dialog.open(AddCotizacionComponent, {
      width: '800px'
    });

    await dialogRef.afterClosed().subscribe(() => {
      this.conectarServidor();
    });
  }

  // Filtering
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  // Put a Norm
  async edit(data) {
    if (this.desactivado)
      return false;

    const dialogRef = this.dialog.open(EditCotizacionComponent, {
      data: data,
      width: '600px'
     });

    await dialogRef.afterClosed().subscribe(() => {
      this.conectarServidor();
    });
  }

  // Tine prmisos o esta autenticado
  validarUsuario() {
    const id = sessionStorage.id;
    if (!id) {
      this.router.navigate(['/']);
      Swal.fire({
        title: 'Error',
        text: 'Debes iniciar sesion primero',
        icon: 'warning'
      });
    } else {
      let rol = parseInt(sessionStorage.rol);
      if (environment.permisos_Usuarios[rol].cotizacion === false) {
        this.router.navigate(['/index']);
        Swal.fire({
          title: 'Error',
          text: 'No tienes los permisos necesarios',
          icon: 'warning'
        });
      }
    }
  }

  // ver info de la cotizacion
  async informacion(data) {
    const dialogRef = this.dialog.open(InformacionCotizacionComponent, {
      width: '800px',
      data: data,
      disableClose: true,
    });

    await dialogRef.afterClosed().subscribe(() => {
      this.conectarServidor();
    });
  }

  // async borrar(data) {
  //   if (this.desactivado)
  //     return false;
  //
  //   Swal.fire({
  //     title: '¿Estas seguro que quieres borrar la cotización?',
  //     text: 'Esto significa que los servicios a los que se les haya asignado esta cotización, ya no la tendran.',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Si, Borrar',
  //     cancelButtonText: 'No, Cancelar'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.preloaderActivo = true;
  //       this.desactivado = true;
  //
  //       this.cotizacionService.putActivo(0, data.id).toPromise()
  //         .then(() => {
  //           let movimiento = {
  //             idUsuario: sessionStorage.id,
  //             tipo: 3,
  //             descripcion: `Se borro la cotización para: "${data.nombre}", con el comentario:
  //             "${data.comentario}", que se realizó en la fecha: "${data.fecha}", y era un total de: "$${data.total}"`
  //           };
  //           this.movimientosService.post(movimiento).subscribe(() => {
  //             Swal.fire({
  //               icon: 'success',
  //               title: 'Se borro la cotización'
  //             })
  //             this.conectarServidor();
  //           });
  //         }).catch ( e => {
  //         if (!e.error.mensaje)
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Error',
  //             text: 'El servidor no esta conectado'
  //           })
  //         else
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Error',
  //             text: e.error.mensaje
  //           });
  //       }).finally(() => {
  //         this.preloaderActivo = false;
  //         this.desactivado = false;
  //       });
  //     }
  //   });
  // }
}

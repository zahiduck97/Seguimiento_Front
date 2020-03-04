import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from "sweetalert2"
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TipoServicioService } from '../../services/tipo-servicio.service';
import { Router } from '@angular/router';
import { AddTipoServicioComponent } from './modals/add-tipo-servicio/add-tipo-servicio.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { EditTipoServicioComponent } from './modals/edit-tipo-servicio/edit-tipo-servicio.component';
import { MovimientosService } from 'src/app/services/movimientos.service';

@Component({
  selector: 'app-tipo-servicio',
  templateUrl: './tipo-servicio.component.html',
  styleUrls: ['./tipo-servicio.component.css']
})
export class TipoServicioComponent implements OnInit {

  public tipoServicios : any = [];
  public preloaderActivo = false;
  public desactivado = false;

  // Table
  public displayedColumns: string[] = ['nombre', 'acciones'];
  public dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public tipoServicioService: TipoServicioService,
    private router: Router,
    public dialog: MatDialog,
    public movimientosService: MovimientosService
    ) { this.validarUsuario() }


  // Al iniciar
  ngOnInit() {
    this.conectarServidor();
    this.dataSource.paginator = this.paginator;
  }

  // get all norms
  conectarServidor(){
    this.preloaderActivo = true;
    this.desactivado = true;
    this.tipoServicioService.get()
      .subscribe(
        data => {
          this.tipoServicios = data;
          console.log(this.tipoServicios);
          this.preloaderActivo = false;
          this.desactivado = false;
          this.dataSource.data = this.tipoServicios;
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
  async nuevo(){
    const dialogRef = this.dialog.open(AddTipoServicioComponent, {
      width: '700px'
    });

    await dialogRef.afterClosed().subscribe(result => {    
      this.conectarServidor();
    }); 
  }

  // Editar
  async editar(data){
    const dialogRef = this.dialog.open(EditTipoServicioComponent, {
      width: '700px',
      data: {
        id: data.id,
        nombre: data.nombre
      }
    });

    await dialogRef.afterClosed().subscribe(result => {    
      this.conectarServidor();
    }); 
  }

   // Delete a empresa
   async delete(data){
    if(this.desactivado)
      return false;

    Swal.fire({
      title: '¿Estas seguro que quieres borrar el tipo de servicio?',
      text: 'Esto eliminara todos los costos, cotizaciones y servicios que contengan el mismo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        this.preloaderActivo = true;
        this.desactivado = true;

        this.tipoServicioService.delete(data.id).toPromise()
        .then(db => {
          let movimiento = {
            idUsuario: sessionStorage.id,
            tipo: 3,
            descripcion: `Se borro el tipo de servicio: "${data.nombre}"`
          }
          this.movimientosService.post(movimiento).subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Se borro el tipo de servicio.'
            })
            this.conectarServidor();
          })
        }).catch ( e => {
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
        }).finally(() => {
          this.preloaderActivo = false;
          this.desactivado = false;
        })
      }
    })
  }

  // Filtering
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Tine prmisos o esta autenticado
  validarUsuario(){
    let id = sessionStorage.id;
    if(!id){
      this.router.navigate(['/']);
      Swal.fire({
        title: 'Error',
        text: 'Debes iniciar sesion primero',
        icon: 'warning'
      });
    } else {
      let rol = parseInt(sessionStorage.rol);
      if(environment.permisos_Usuarios[rol].tipo_servicio == false){
        this.router.navigate(['/index']);
        Swal.fire({
          title: 'Error',
          text: 'No tienes los permisos necesarios',
          icon: 'warning'
        });
      }
    }
  }
}

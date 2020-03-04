import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from "sweetalert2";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CostosService } from '../../services/costos.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddCostoComponent } from './modals/add-costo/add-costo.component';
import { environment } from 'src/environments/environment';
import {EditCostoComponent} from './modals/edit-costo/edit-costo.component';
import { MovimientosService } from 'src/app/services/movimientos.service';

@Component({
  selector: 'app-costos',
  templateUrl: './costos.component.html',
  styleUrls: ['./costos.component.css']
})
export class CostosComponent implements OnInit {

 
  public costos : any = [];
  public preloaderActivo = false;
  public desactivado = false;

  // Table
  public displayedColumns: string[] = ['codificacion', 'nombre', 'costo', 'acciones'];
  public dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public costosService: CostosService,
    private router: Router,
    public dialog: MatDialog,
    public movimientosService: MovimientosService
    ) { this.validarUsuario();}


  // Al iniciar
  ngOnInit() {
    this.conectarServidor();
    this.dataSource.paginator = this.paginator;
  }

  // get all norms
  conectarServidor(){
    this.preloaderActivo = true;
    this.desactivado = true;
    this.costosService.get()
      .subscribe(
        data => {
          this.costos = data;
          console.log(this.costos);
          this.preloaderActivo = false;
          this.desactivado = false;
          this.dataSource.data = this.costos;
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
    const dialogRef = this.dialog.open(AddCostoComponent, {
      width: '700px'
    });

    await dialogRef.afterClosed().subscribe(result => {    
      this.conectarServidor();
    }); 
  }

  // Update
  async editar(data){
    const dialogRef = this.dialog.open(EditCostoComponent, {
      width: '700px',
      data: {
        id: data.id,
        idNorma: data.idNorma,
        idTipoServicio: data.idTipoServicio,
        costo: data.costo
      }
    });

    await dialogRef.afterClosed().subscribe(result => {
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
      if(environment.permisos_Usuarios[rol].costos == false){
        this.router.navigate(['/index']);
        Swal.fire({
          title: 'Error',
          text: 'No tienes los permisos necesarios',
          icon: 'warning'
        });
      }
    }
  }

   // Delete a empresa
   async delete(data){
    if(this.desactivado)
      return false;

    Swal.fire({
      title: '¿Estas seguro que quieres borrar el costo?',
      text: 'Esto eliminara todas cotizaciones y servicios que contengan el mismo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        this.preloaderActivo = true;
        this.desactivado = true;

        this.costosService.delete(data.id).toPromise()
        .then(db => {
          let movimiento = {
            idUsuario: sessionStorage.id,
            tipo: 3,
            descripcion: `Se borro el costo de la norma: "${data.codificacion}", con el tipo de servicio: "${data.nombre}" y con un valor de: "$${data.costo}"`
          }
          this.movimientosService.post(movimiento).subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Se borro el costo.'
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
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EmpresasService } from 'src/app/services/empresas.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from "sweetalert2";
import { AddEmpresaComponent } from './modals/add-empresa/add-empresa.component';
import { EditEmpresaComponent } from './modals/edit-empresa/edit-empresa.component';
import { environment } from 'src/environments/environment';
import { MovimientosService } from 'src/app/services/movimientos.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  public empresas : any = [];
  public preloaderActivo = false;
  public desactivado = false;

  // Table
  public displayedColumns: string[] = ['nombre', 'acciones'];
  public dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public empresasService: EmpresasService,
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
    this.empresasService.get()
      .subscribe(
        empresas => {
          this.empresas = empresas;
          console.log(this.empresas);
          this.preloaderActivo = false;
          this.desactivado = false;
          this.dataSource.data = this.empresas
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
  async formAddEmpresa(){
    const dialogRef = this.dialog.open(AddEmpresaComponent, {
      width: '700px'
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

   // Delete a empresa
  async deleteEmpresa(empresa){
    if(this.desactivado)
      return false;

    Swal.fire({
      title: '¿Estas seguro que quieres borrar la empresa?',
      text: 'Esto significa que se borraran todos los prospectos y servicios relacionados con la empresa',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        this.preloaderActivo = true;
        this.desactivado = true;

        this.empresasService.delete(empresa.id).toPromise()
        .then(empresadb => {
          let movimiento = {
            idUsuario: sessionStorage.id,
            tipo: 3,
            descripcion: `Se borro la empresa: "${empresa.nombre}"`
          }
          this.movimientosService.post(movimiento).subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Se borro la empresa'
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

  
  // Put a Norm
  async editEmpresa(empresa){
    if(this.desactivado)
      return false;

    const dialogRef = this.dialog.open(EditEmpresaComponent, {
      data: {
        empresa
      },
      width: '600px'
     });

    await dialogRef.afterClosed().subscribe(result => {
      this.conectarServidor();
    })
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
      if(environment.permisos_Usuarios[rol].empresas == false){
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUsuarioComponent } from './modals/add-usuario/add-usuario.component';
import Swal from "sweetalert2"

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {


  // Constantes
  public usuarios: Usuario[] = []
  public preloaderActivo = false;
  public desactivado = false;
  
  public displayedColumns: string[] = ['nombre', 'username', 'rol', 'acciones'];
  public dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // Constructor
  constructor(private usuariosService: UsuariosService, public dialog: MatDialog) { }

  // To Init
  ngOnInit() {
    this.conectarServidor();
    this.dataSource.paginator = this.paginator;
  }

  // Filtering
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  // get all norms
  conectarServidor(){
    this.preloaderActivo = true;
    this.desactivado = true;

    this.usuariosService.get()
      .subscribe(
        data => {
          this.usuarios = data;
          console.log(this.usuarios);
          this.preloaderActivo = false;
          this.desactivado = false;
          this.dataSource.data = this.usuarios;
        },
        err => {
          console.log(err);
          if (err.status === 0) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'El servidor no esta conectado'
            })
          }  else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err.error.mensaje
            })
          }
          this.preloaderActivo = false;
          this.desactivado = false;
        }
      );
  }   
  
  // Agregar Un Usuario Tramitdor
  async addUsuario() {
    const dialogRef = this.dialog.open(AddUsuarioComponent, {
      width: '700px'
    });

    await dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.conectarServidor();
      }
    });
  }
  

  // // Delete the user
  // deleteUsuario(data){
  //   if(this.desactivado)
  //     return false;

  //   Swal.fire({
  //     title: '¿Estas seguro de que quieres borrar este usuario?',
  //     text: 'No podras recuperar la informacion despues.',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Si, borrar',
  //     cancelButtonText: 'No, cancelar'
  //   }).then((result) => {
  //     if (result.value) {
        
        
  //       this.preloaderActivo = true
  //       this.usuariosService.deleteUsuario(data).toPromise()
  //         .then(res => {
  //           this.preloaderActivo = false;
  //           Swal.fire({
  //             icon: 'success',
  //             title: 'Se borro el usuario',
  //           })
            
  //           this.conectarServidor()
  //         })
  //         .catch(
  //           err => {
  //             if(!err.error.mensaje){ 
  //               Swal.fire({
  //                 icon: 'error',
  //                 title: 'Error',
  //                 text: 'El servidor no esta conectado'
  //               })
  //             } else {
  //               Swal.fire({
  //                 icon: 'error',
  //                 title: 'Error',
  //                 text: err.error.mensaje
  //               })
  //             }
  //             this.preloaderActivo = false;
  //           })
  //     }
  //   })

  // }

  // // Edit the tramitador
  // async editarTramitador(tramitador){
  //   if(this.desactivado)
  //     return false;

  //   const dialogRef = this.dialog.open(EditTramitadoresUserComponent, {
  //     data: { tramitador },
  //     width: '500px'
  //   })

  //   await dialogRef.afterClosed().subscribe(
  //     res => {
  //       this.conectarServidor();
  //     }
  //   )
  // }

  // // Edit the Empleado
  // async editarEmpleado(empleado){
  //   if(this.desactivado)
  //     return false;

  //   const dialogRef = this.dialog.open(EditEmpleadosUserComponent, {
  //     data: { empleado },
  //     width: '500px'
  //   })

  //   await dialogRef.afterClosed().subscribe(
  //     res => {
  //       this.conectarServidor();
  //     })
  // }

  // // edit password
  // async editarPassword(usuario){
  //   if(this.desactivado)
  //     return false;

  //   const dialogRef = this.dialog.open(EditPasswordComponent, {
  //     data: { usuario },
  //     width: '500px'
  //   })

  //   await dialogRef.afterClosed().subscribe(
  //     res => {
  //       this.conectarServidor();
  //     })
  // }

}

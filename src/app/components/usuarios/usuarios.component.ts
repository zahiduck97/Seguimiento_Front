import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUsuarioComponent } from './modals/add-usuario/add-usuario.component';
import Swal from "sweetalert2"
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material';
import { EditUsuarioComponent } from './modals/edit-usuario/edit-usuario.component';
import { MovimientosService } from 'src/app/services/movimientos.service';

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
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  // Constructor
  constructor(
    private usuariosService: UsuariosService, 
    public dialog: MatDialog,
    public router: Router,
    public movimientosService: MovimientosService
    ) { this.validarUsuario(); }

  // To Init
  ngOnInit() {
    this.conectarServidor();
    this.dataSource.sort = this.sort;
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
  
  // Edit the tramitador
  async editar(user){
    if(this.desactivado)
      return false;

    const dialogRef = this.dialog.open(EditUsuarioComponent, {
      data: user,
      width: '500px'
    })

    await dialogRef.afterClosed().subscribe(
      res => {
        this.conectarServidor();
      }
    )
  }

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

  // Delete a empresa
  async delete(data){
    if(this.desactivado)
      return false;

    Swal.fire({
      title: '¿Estas seguro que quieres borrar el usuario?',
      text: 'No podras recuperar su informacion despues.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        this.preloaderActivo = true;
        this.desactivado = true;

        this.usuariosService.delete(data.id).toPromise()
        .then(db => {
          let aux = (data.rol == 1) ? "Usuario Normal": "Usuario Administrador";
          let movimiento = {
            idUsuario: sessionStorage.id,
            tipo: 3,
            descripcion: `Se borro el usuario: "${data.nombre}" con username: "${data.username}" y que era un "${aux}"`
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
      if(environment.permisos_Usuarios[rol].usuarios == false){
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

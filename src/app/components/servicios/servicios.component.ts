import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from "sweetalert2"
import { AddServicioComponent } from './modals/add-servicio/add-servicio.component';
import { ValidarUnoComponent } from './modals/validar-uno/validar-uno.component';
import { ValidarDosComponent } from './modals/validar-dos/validar-dos.component';
import { ValidarTresComponent } from './modals/validar-tres/validar-tres.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  
  public servicios : any = [];
  public preloaderActivo = false;
  public desactivado = false;

  // Table
  public displayedColumns: string[] = ['nombre', 'fecha', 'codificacion', 'servicio', 'estatus', 'acciones'];
  public dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public serviciosService: ServiciosService,
    private router: Router,
    public dialog: MatDialog
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
    this.serviciosService.get()
      .subscribe(
        data => {
          this.servicios = data;
          for(let i = 0; i < this.servicios.length; i++){
            this.servicios[i].fecha = this.servicios[i].fecha.substring(0,10);
          }
          console.log(this.servicios);
          this.preloaderActivo = false;
          this.desactivado = false;
          this.dataSource.data = this.servicios;
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
    const dialogRef = this.dialog.open(AddServicioComponent, {
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

  async validarUno(data){
    const dialogRef = this.dialog.open(ValidarUnoComponent, {
      width: '700px',
      data: {
        id: data.id,
        contratos: data.contratos,
        idUsuario: data.idUsuario
      }
    });

    await dialogRef.afterClosed().subscribe(result => {    
      this.conectarServidor();
    }); 
  }

  async validarDos(data){
    const dialogRef = this.dialog.open(ValidarDosComponent, {
      width: '700px',
      data: {

      }
    });

    await dialogRef.afterClosed().subscribe(result => {    
      this.conectarServidor();
    }); 
  }

  async validarTres(data){
    const dialogRef = this.dialog.open(ValidarTresComponent, {
      width: '700px',
      data: {

      }
    });

    await dialogRef.afterClosed().subscribe(result => {    
      this.conectarServidor();
    }); 
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
      if(environment.permisos_Usuarios[rol].servicios == false){
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

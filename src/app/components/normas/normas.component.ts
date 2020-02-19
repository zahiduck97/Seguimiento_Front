import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NormasService } from '../../services/normas.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from "sweetalert2"
import { AddNormaComponent } from './modals/add-norma/add-norma.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-normas',
  templateUrl: './normas.component.html',
  styleUrls: ['./normas.component.css']
})
export class NormasComponent implements OnInit {

  public normas : any = [];
  public preloaderActivo = false;
  public desactivado = false;

  // Table
  public displayedColumns: string[] = ['codificacion', 'acciones'];
  public dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public normasService: NormasService,
    private router: Router,
    public dialog: MatDialog
    ) { 
      // let id = sessionStorage.id;
      // if(!id){
      //   this.router.navigate(['/']);
      //   Swal.fire({
      //     title: 'Error',
      //     text: 'Debes iniciar sesion primero',
      //     icon: 'warning'
      //   });
      // } else {
      //   let rol = sessionStorage.rol
      //   if(rol == 1){
      //     if(environment.permisos_Usuario.normas == false){
      //       this.router.navigate(['/index']);
      //       Swal.fire({
      //         title: 'Error',
      //         text: 'No tienes los permisos necesarios',
      //         icon: 'warning'
      //       });
      //     }
      //   }
      // }
    }


  // Al iniciar
  ngOnInit() {
    this.conectarServidor();
    this.dataSource.paginator = this.paginator;
  }

  // get all norms
  conectarServidor(){
    this.preloaderActivo = true;
    this.desactivado = true;
    this.normasService.get()
      .subscribe(
        data => {
          this.normas = data;
          console.log(this.normas);
          this.preloaderActivo = false;
          this.desactivado = false;
          this.dataSource.data = this.normas;
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
    const dialogRef = this.dialog.open(AddNormaComponent, {
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
}

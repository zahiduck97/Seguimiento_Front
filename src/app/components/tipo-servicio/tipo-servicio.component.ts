import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from "sweetalert2"
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TipoServicioService } from '../../services/tipo-servicio.service';
import { Router } from '@angular/router';
import { AddTipoServicioComponent } from './modals/add-tipo-servicio/add-tipo-servicio.component';
import { MatDialog } from '@angular/material/dialog';

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
    public dialog: MatDialog
    ) { }


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
  async formAddEmpresa(){
    const dialogRef = this.dialog.open(AddTipoServicioComponent, {
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProspectosService } from 'src/app/services/prospectos.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from "sweetalert2";
import { AddProspectoComponent } from './modals/add-prospecto/add-prospecto.component';

@Component({
  selector: 'app-prospectos',
  templateUrl: './prospectos.component.html',
  styleUrls: ['./prospectos.component.css']
})
export class ProspectosComponent implements OnInit {

  public prospectos : any = [];
  public preloaderActivo = false;
  public desactivado = false;
// Table
public displayedColumns: string[] = ['empresa', 'nombre', 'telefono', 'fecha', 'acciones'];
public dataSource = new MatTableDataSource();

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

constructor(
  public prospectosServices: ProspectosService,
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
    this.prospectosServices.get()
      .subscribe(
        prospectos => {
          this.prospectos = prospectos;
          console.log(this.prospectos);
          for(let i = 0; i < this.prospectos.length; i++){
            this.prospectos[i].fecha = this.prospectos[i].fecha.substring(0,10);
          }
          this.preloaderActivo = false;
          this.desactivado = false;
          this.dataSource.data = this.prospectos
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

  // Filtering
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Abrir formulario en modal
  async addProspecto(){
    const dialogRef = this.dialog.open(AddProspectoComponent, {
      width: '700px'
    });

    await dialogRef.afterClosed().subscribe(result => {    
      this.conectarServidor();
    }); 
  }

}

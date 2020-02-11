import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from "sweetalert2";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CostosService } from '../../services/costos.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddCostoComponent } from './modals/add-costo/add-costo.component';

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

  // Filtering
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

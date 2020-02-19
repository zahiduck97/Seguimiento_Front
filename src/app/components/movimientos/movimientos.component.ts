import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from "sweetalert2"
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MovimientosService } from 'src/app/services/movimientos.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {
  public movimientos : any = [];
  public preloaderActivo = false;
  public desactivado = false;

  // Table
  public displayedColumns: string[] = ['usuario', 'tipo', 'descripcion', 'fecha'];
  public dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public movimientosService: MovimientosService,
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
    this.movimientosService.get()
      .subscribe(
        data => {
          this.movimientos = data;
          for(let i = 0; i < this.movimientos.length; i++){
            this.movimientos[i].fecha = this.movimientos[i]['fecha'].substring(0,10);
          }
          console.log(data);
          this.preloaderActivo = false;
          this.desactivado = false;
          this.dataSource.data = this.movimientos
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

}

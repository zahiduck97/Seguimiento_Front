import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProspectosService } from 'src/app/services/prospectos.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from "sweetalert2";
import { AddProspectoComponent } from './modals/add-prospecto/add-prospecto.component';
import { ValidarProspectoComponent } from './modals/validar-prospecto/validar-prospecto.component';
import { environment } from 'src/environments/environment';

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
    ) {this.validarUsuario() }


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

  async validar(data){
    const dialogRef = this.dialog.open(ValidarProspectoComponent, {
      width: '700px',
      data: {
        id: data.id,
        acta: data.acta,
        contratos: data.contratos,
        carta: data.carta,
        rfc: data.rfc,
        nombre: data.nombre
      }
    });

    await dialogRef.afterClosed().subscribe(res => {
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
      if(environment.permisos_Usuarios[rol].prospectos == false){
        this.router.navigate(['/index']);
        Swal.fire({
          title: 'Error',
          text: 'No tienes los permisos necesarios',
          icon: 'warning'
        });
      }
    }
  }

  validado(){
    Swal.fire({
      title: 'Listo',
      text: 'El prospecto ya tiene validado los siguientes documentos: Acta Constitutiva, Contrato Original UVA / OCP, RFC, y Carta Poder',
      icon: 'success'
    });
  }

}

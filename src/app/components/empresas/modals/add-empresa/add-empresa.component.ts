import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { EmpresasService } from 'src/app/services/empresas.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MovimientosService } from 'src/app/services/movimientos.service';

@Component({
  selector: 'app-add-empresa',
  templateUrl: './add-empresa.component.html',
  styleUrls: ['./add-empresa.component.css']
})
export class AddEmpresaComponent {

  public empresa = {
    nombre: ""
  }

  public preloaderActivo = false;
  public desactivado = false;
  
  constructor(
    public empresasService: EmpresasService,
    public dialogRef: MatDialogRef<AddEmpresaComponent>,
    public movimientosService: MovimientosService
    ) { }


  // Post a Norm
  async postEmpresa(){
    this.preloaderActivo = true;
    this.desactivado = true;
    await this.empresasService.post(this.empresa).toPromise()
      .then(
        empresaDb => {
          let movimiento = {
            idUsuario: sessionStorage.id,
            tipo: 1,
            descripcion: `Se creo la empresa:  ${this.empresa.nombre}`
          }
          this.movimientosService.post(movimiento).subscribe(() => {
            Swal.fire({ 
              icon: 'success',
              title: 'Se inserto la empresa'
            })
            this.dialogRef.close(empresaDb);
          })
        }
      )
      .catch(e => {
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
      }).finally( () => {
        this.preloaderActivo = false;
        this.desactivado = false;
      })
    
  }


  // Close the modal
  cerrarModal(){
    this.dialogRef.close();
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import Swal from "sweetalert2";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpresasService } from 'src/app/services/empresas.service';
import { MovimientosService } from 'src/app/services/movimientos.service';

@Component({
  selector: 'app-edit-empresa',
  templateUrl: './edit-empresa.component.html',
  styleUrls: ['./edit-empresa.component.css']
})
export class EditEmpresaComponent implements OnInit {

 
  public preloaderActivo = false;
  public desactivado = false;
  public oldEmpresa;

  constructor(
    public dialogRef: MatDialogRef<EditEmpresaComponent>,
    public empresasService: EmpresasService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public movimientosService: MovimientosService
  ) {  }

  // On init
  ngOnInit() {
    this.oldEmpresa = this.data.empresa.nombre
    console.log(this.oldEmpresa)
  }


  // Close the modal
  cerrarModal(){
    this.dialogRef.close();
  }


  // Put a Norm
  async putEmpresa(){
    console.log(this.data.empresa, this.oldEmpresa);
    this.preloaderActivo = true;
    this.desactivado = true;
    await this.empresasService.put(this.data.empresa).toPromise()
      .then( empresadb => {
        let movimiento = {
          idUsuario: sessionStorage.id,
          tipo: 2,
          descripcion: `Se edito el nombre de la empresa de:  "${this.oldEmpresa}" A: "${this.data.empresa.nombre}"`
        }
        this.movimientosService.post(movimiento).subscribe(() => {
          this.dialogRef.close();
          Swal.fire({
            icon: 'success',
            title: 'Se edito la empresa'
          })
        })
      })
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
      }).finally(() => {
        this.preloaderActivo = false;
        this.desactivado = false;
      });
  }
}

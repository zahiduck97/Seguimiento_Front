import { Component, OnInit, Inject } from '@angular/core';
import Swal from "sweetalert2";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-edit-empresa',
  templateUrl: './edit-empresa.component.html',
  styleUrls: ['./edit-empresa.component.css']
})
export class EditEmpresaComponent {

 
  public preloaderActivo = false;
  public desactivado = false;

  constructor(
    public dialogRef: MatDialogRef<EditEmpresaComponent>,
    public empresasService: EmpresasService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {  }


  // Close the modal
  cerrarModal(){
    this.dialogRef.close();
  }


  // Put a Norm
  async putEmpresa(){
    console.log(this.data.empresa);
    this.preloaderActivo = true;
    this.desactivado = true;
    await this.empresasService.put(this.data.empresa).toPromise()
      .then( empresadb => {
        Swal.fire({
          icon: 'success',
          title: 'Se edito la empresa'
        })
        this.dialogRef.close('ok');
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

import { Component, OnInit, Inject } from '@angular/core';
import { NormasService } from 'src/app/services/normas.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovimientosService } from 'src/app/services/movimientos.service';
import Swal from "sweetalert2"

@Component({
  selector: 'app-edit-norma',
  templateUrl: './edit-norma.component.html',
  styleUrls: ['./edit-norma.component.css']
})
export class EditNormaComponent implements OnInit {

  public norma = {
    codificacion: ""
  }



  ngOnInit(){
    this.norma.codificacion = this.data.codificacion;
  }

  public preloaderActivo = false;
  public desactivado = false;
  
  constructor(
    public normasService: NormasService,
    public dialogRef: MatDialogRef<EditNormaComponent>,
    public movimientosService: MovimientosService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    ) { }


  // Post a Norm
  async guardar(){
    this.preloaderActivo = true;
    this.desactivado = true;
    await this.normasService.editar(this.norma, this.data.id).toPromise()
      .then(
        empresaDb => {
          let movimiento = {
            idUsuario: sessionStorage.id,
            tipo: 2,
            descripcion: `Se edito la codificacion de la Norma de: "${this.data.codificacion}" A: "${this.norma.codificacion}"`
          }
          this.movimientosService.post(movimiento).subscribe(() => {
            Swal.fire({ 
              icon: 'success',
              title: 'Se inserto la norma'
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

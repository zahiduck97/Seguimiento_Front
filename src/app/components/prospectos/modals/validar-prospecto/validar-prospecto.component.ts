import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProspectosService } from '../../../../services/prospectos.service';
import Swal from "sweetalert2";
import { MovimientosService } from 'src/app/services/movimientos.service';

@Component({
  selector: 'app-validar-prospecto',
  templateUrl: './validar-prospecto.component.html',
  styleUrls: ['./validar-prospecto.component.css']
})
export class ValidarProspectoComponent implements OnInit {

  public prospecto = {
    contratos: false,
    acta: false,
    rfc: false,
    carta: false
  }

  public preloaderActivo = false;
  public desactivado = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ValidarProspectoComponent>,
    public prospectosService: ProspectosService,
    public movimientosService: MovimientosService
    ) { }

  ngOnInit() {
    console.log(this.data);
    this.prospecto = this.data
  }

  // Close the modal
  cerrarModal(){
    this.dialogRef.close();
  }

  guardar(){
    let aux = '';
    if(this.prospecto.acta)
      aux += 'Acta Constitutiva, '
    if(this.prospecto.carta)
      aux += 'Carta Poder, '
    if(this.prospecto.contratos)
      aux += 'Contrato Original UVA/OCP, '
    if(this.prospecto.rfc)
      aux += 'RFC, '
      console.log(this.prospecto, aux);
    this.prospectosService.put(this.prospecto, this.data.id)
    .subscribe(res => {
      let movimiento = {
        idUsuario: sessionStorage.id,
        tipo: 2,
        descripcion: `A el prospecto: "${this.data.nombre}", se le validaron los siguientes documentos: "${aux}"`
      }
      this.movimientosService.post(movimiento).subscribe(() => {
        this.dialogRef.close();
        Swal.fire({ 
          icon: 'success',
          title: 'Se actualizo el prospecto'
        })
      })
    }, 
    e => {
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
    }, 
    () => {
      this.preloaderActivo = false;
      this.desactivado = false;
    });
  }

}

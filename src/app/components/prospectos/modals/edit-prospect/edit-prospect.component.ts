import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmpresasService } from 'src/app/services/empresas.service';
import { AddProspectoComponent } from '../add-prospecto/add-prospecto.component';
import { ProspectosService } from 'src/app/services/prospectos.service';
import { MovimientosService } from 'src/app/services/movimientos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-prospect',
  templateUrl: './edit-prospect.component.html',
  styleUrls: ['./edit-prospect.component.css']
})
export class EditProspectComponent implements OnInit {
  
  public empresas;
  public prospecto = {
    idEmpresa : 0,
    nombre: "",
    telefono: "",
    correo: "",
    direccion: ""
  }

  public preloaderActivo = false;
  public desactivado = false;
  
  constructor(
    public empresasService: EmpresasService,
    public dialogRef: MatDialogRef<EditProspectComponent>,
    public prospectosService: ProspectosService,
    public movimientosService: MovimientosService,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) { }
  

  ngOnInit(){
    this.prospecto.idEmpresa = this.data.idEmpresa;
    this.prospecto.nombre = this.data.nombre;
    this.prospecto.telefono = this.data.telefono;
    this.prospecto.correo = this.data.correo;
    this.prospecto.direccion = this.data.direccion;
    this.getEmpresas();
  }


  // Post a Norm
  async getEmpresas(){
    this.preloaderActivo = true;
    this.desactivado = true;
    await this.empresasService.get().
      subscribe(
        empresaDb => {
          this.empresas = empresaDb;
          console.log(this.empresas);
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
        }
      );
  }

  async guardar(){
    let aux, aux2;
    for(let i = 0; i < this.empresas.length; i++){
      if(this.empresas[i].id == this.data.idEmpresa)
        aux = this.empresas[i].nombre
      if(this.empresas[i].id == this.prospecto.idEmpresa)
        aux2 = this.empresas[i].nombre
      if(aux && aux2)
        break;
    }
  
    await this.prospectosService.editar(this.prospecto, this.data.id )
      .subscribe(res => {
        let movimiento = {
          idUsuario: sessionStorage.id,
          tipo: 2,
          descripcion: `Se modifico el prospecto de la empresa: "${aux}", con nombre: "${this.data.nombre}", telefono: "${this.data.telefono}", correo: "${this.data.correo}" y dirección: "${this.data.direccion}" A la empresa: "${aux2}", nombre: "${this.prospecto.nombre}", telefono: "${this.prospecto.telefono}", correo: "${this.prospecto.correo}" y dirección: "${this.prospecto.direccion}"`
        }
        this.movimientosService.post(movimiento).subscribe(() => {
          Swal.fire({ 
            icon: 'success',
            title: 'Se edito el prospecto'
          })
          this.dialogRef.close('ok');
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

  // Close the modal
  cerrarModal(){
    this.dialogRef.close();
  }

}

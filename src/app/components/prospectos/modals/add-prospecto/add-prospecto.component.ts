import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/services/empresas.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from "sweetalert2";
import { ProspectosService } from 'src/app/services/prospectos.service';

@Component({
  selector: 'app-add-prospecto',
  templateUrl: './add-prospecto.component.html',
  styleUrls: ['./add-prospecto.component.css']
})
export class AddProspectoComponent implements OnInit {

  
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
    public dialogRef: MatDialogRef<AddProspectoComponent>,
    public prospectosService: ProspectosService
    ) { }
  

  ngOnInit(){
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
    console.log(this.prospecto);
    await this.prospectosService.post(this.prospecto)
      .subscribe(res => {
        Swal.fire({ 
          icon: 'success',
          title: 'Se inserto el prospecto'
        })
        this.dialogRef.close('ok');
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

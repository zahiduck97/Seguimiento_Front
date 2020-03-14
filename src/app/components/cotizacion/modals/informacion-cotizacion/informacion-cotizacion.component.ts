import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CostosService} from '../../../../services/costos.service';
import {ProspectosService} from '../../../../services/prospectos.service';

@Component({
  selector: 'app-informacion-cotizacion',
  templateUrl: './informacion-cotizacion.component.html',
  styleUrls: ['./informacion-cotizacion.component.css']
})
export class InformacionCotizacionComponent implements OnInit {
  public costos;
  public prospecto;

  constructor(
    public dialogRef: MatDialogRef<InformacionCotizacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private costosService: CostosService,
    private prospectosService: ProspectosService
  ) { }

  ngOnInit() {
    this.data.idCosto = this.data.idCosto.split(',');
    this.prospectosService.getOne(this.data.idProspecto).subscribe(res => {
      this.prospecto = res;
    });
    this.costosService.get().subscribe({next: data => {
      this.costos = data;
    },
    complete: () => {
      let aux = [];
      for (let i = 0; i < this.costos.length; i++) {
        for (let j = 0; j < this.data.idCosto.length; j++) {
          if (this.costos[i].id === parseInt(this.data.idCosto[j], 10)) {
            aux.push(this.costos[i]);
          }
        }
      }
      this.costos = aux;
    }});
  }

  // Close the modal
  cerrarModal() {
    this.dialogRef.close();
  }

}

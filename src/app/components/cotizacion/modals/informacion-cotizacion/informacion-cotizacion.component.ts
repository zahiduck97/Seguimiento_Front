import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CostosService} from '../../../../services/costos.service';

@Component({
  selector: 'app-informacion-cotizacion',
  templateUrl: './informacion-cotizacion.component.html',
  styleUrls: ['./informacion-cotizacion.component.css']
})
export class InformacionCotizacionComponent implements OnInit {
  public costos;

  constructor(
    public dialogRef: MatDialogRef<InformacionCotizacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private costosService: CostosService
  ) { }

  ngOnInit() {
    this.costosService.get().subscribe(data => {
      this.costos = data;
    });
    this.data.idCosto = this.data.idCosto.split(',');
  }

  // Close the modal
  cerrarModal() {
    this.dialogRef.close();
  }

}

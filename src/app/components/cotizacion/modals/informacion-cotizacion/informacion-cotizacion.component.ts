import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CostosService} from '../../../../services/costos.service';
import {ProspectosService} from '../../../../services/prospectos.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-informacion-cotizacion',
  templateUrl: './informacion-cotizacion.component.html',
  styleUrls: ['./informacion-cotizacion.component.css']
})
export class InformacionCotizacionComponent implements OnInit {
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  public costos;
  public prospecto;
  public preloaderActivo = false;

  constructor(
    public dialogRef: MatDialogRef<InformacionCotizacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private costosService: CostosService,
    private prospectosService: ProspectosService
  ) { }

  ngOnInit() {
    this.preloaderActivo = true;

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
      this.preloaderActivo = false;
    }});
  }

  imprimirPdf() {
    if (this.preloaderActivo) {
      return false;
    }
    this.preloaderActivo = true;
    setTimeout(() => {
      const doc = new jsPDF();

      const specialElementHandlers = {
        '#editor': function (element, renderer) {
          return true;
        }
      };

      const pdfTable = this.pdfTable.nativeElement;

      doc.fromHTML(pdfTable.innerHTML, 15, 15, {
        width: 190,
        'elementHandlers': specialElementHandlers
      });

      doc.save('tableToPdf.pdf');
      this.preloaderActivo = false;
    }, 3000);
  }

  // Close the modal
  cerrarModal() {
    if (this.preloaderActivo) {
      return false;
    }
    this.dialogRef.close();
  }

}

import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CostosService} from '../../../../services/costos.service';
import {ProspectosService} from '../../../../services/prospectos.service';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import {CotizacionesService} from '../../../../services/cotizaciones.service';

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
    private prospectosService: ProspectosService,
    private cotizacionService: CotizacionesService
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
      const aux = [];
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

    Swal.fire({
      title: '¿Estás seguro que quieres imprimir la cotización?',
      text: 'Si lo haces, ya no podrás editar la cotización otra vez',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'No, aun no'
    }).then((result) => {
      if (result.value) {
        this.preloaderActivo = true;

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

        doc.save('cotizacion.pdf');
        this.cotizacionService.putEnviado(1, this.data.id).subscribe(() => {});
        this.preloaderActivo = false;
      }
    });
  }

  // Close the modal
  cerrarModal() {
    if (this.preloaderActivo) {
      return false;
    }
    this.dialogRef.close();
  }

}

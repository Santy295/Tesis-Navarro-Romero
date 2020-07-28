import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv'
import { RadService } from '../services/rad.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();
  constructor(private radService: RadService) { }

  dtRegistro :any;

  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Registrosimulación :',
    useBom: true,
    noDownload: false,
    headers: ["ID", "Latitud", "Longitud", "Área", "Área útil","Adultos","Niños","Ancianos","Adultos trabajo","Ancianos trabajo","Cocina de inducción","Lavadora","Secadora eléctrica","Ducha","Generación anual","Consumo mensual","Inversión","LCOE","TIR"]
  };

  exportPdf() {
    this.radService.export().subscribe(data => saveAs(data, `Manual técnico .pdf`));
}

  ngOnInit() {
    this.radService.getRegistro()
      .subscribe(
        res => {
          this.dtRegistro = res;
        },
        err => console.error(err)
      );
  }

  Descargar(){
    new  AngularCsv(this.dtRegistro, "Registro", this.csvOptions);
    console.log('funciona')
  }

  onSelect(feature:string){
    this.featureSelected.emit(feature);
  }

}

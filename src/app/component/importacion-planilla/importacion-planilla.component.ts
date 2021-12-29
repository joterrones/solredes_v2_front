import { Component, OnInit, ViewChild } from '@angular/core';
import { ImportacionService } from '../../service/importacion.service'
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../base/base.component';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-importacion-planilla',
  templateUrl: './importacion-planilla.component.html',
  styleUrls: ['./importacion-planilla.component.css'],
  providers: [ImportacionService]
})
export class ImportacionPlanillaComponent implements OnInit {


  tit = 'Carga de datos';
  datos;
  bufferValue = 100;
  value = 0;
  acum = 0;

  tabla: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'ESTADO',
    'LINEA',
    'ESTRUCTURA',
    'ESTRUCTURA_ANTERIOR',
    'ARMADO_P',
    'ARMADO_S',
    'PROGRESIVA',
    'VANO',
    'T_TERRENO',
    'S_CANTIDAD',
    'S_TIPO',
    'COOR_E',
    'COOR_N',
    'CONDUCTOR_35',
    'CONDUCTOR_70',
    'AISLADOR_56_3',
    'AISLADOR_POLIMERICO',
    'AMOR_35',
    'AMOR_70',
    'RI_A',
    'RV_A',
    'PAT_TIPO',
    'PAT_CANTIDAD',
    'TRANS_5',
    'TRANS_10',
    'TRANS_15',
    'FASES'
  ];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public _importacion_service: ImportacionService,
    public dialog: MatDialog,
    public snack_1: MatSnackBar
  ) {
  }

  ngOnInit() {

  }

  arrayBuffer: any;
  file: File;
  incomingfile(event) {
    this.file = event.target.files[0];
    this.upload();
  }

  upload() {

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var request = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.datos = request;
      console.log("Datos del excel");
      console.log(this.datos);
      this.tabla = new MatTableDataSource<any>(request);
      this.tabla.sort = this.sort;
      this.tabla.paginator = this.paginator;
    }
    fileReader.readAsArrayBuffer(this.file);
  }

  conexionapi(tipo: number) {
    this.value = 0;

    this.bufferValue = this.datos.length;
    this.acum = 100 / this.bufferValue;
    let datosenvio = this.datos;
    console.log(datosenvio);
    this.datos = [];

    let arrayOfData = [];

    var i = 0;
    while (datosenvio.length > i) {

      let element = datosenvio[i];
      element.TIPO = tipo;
      if (element.NRO_SSEE == null) { element.NRO_SSEE = "" }

      if (element.CIRCUITO == null) { element.CIRCUITO = "" }

      if (element.ARMADO_P == null) { element.ARMADO_P = "" } else { element.ARMADO_P = String(element.ARMADO_P).replace('\'', '$') }
      if (element.ARMADO_S == null) { element.ARMADO_S = "" } else { element.ARMADO_S = String(element.ARMADO_S).replace('\'', '$') }
      if (element.PROGRESIVA == null) { element.PROGRESIVA = 0 }
      if (element.VANO == null) { element.VANO = 0 }
      if (element.T_TERRENO == null) { element.T_TERRENO = "" }
      if (element.S_CANTIDAD == null) { element.S_CANTIDAD = 0 }
      if (element.S_TIPO == null) { element.S_TIPO = 0 }
      if (element.CONDUCTOR_35 == null) { element.CONDUCTOR_35 = 0 }
      if (element.CONDUCTOR_70 == null) { element.CONDUCTOR_70 = 0 }

      if (element._1X16_25 == null) { element._1X16_25 = 0 }
      if (element._1X16_1X16_25 == null) { element._1X16_1X16_25 = 0 }
      if (element._2X16_25 == null) { element._2X16_25 = 0 }
      if (element._2X16_1X16_25 == null) { element._2X16_1X16_25 = 0 }
      if (element._2X25_25 == null) { element._2X25_25 = 0 }
      if (element._2X25_1X16_25 == null) { element._2X25_1X16_25 = 0 }



      if (element.AISLADOR_56_3 == null) { element.AISLADOR_56_3 = 0 }
      if (element.AISLADOR_POLIMERICO == null) { element.AISLADOR_POLIMERICO = 0 }
      if (element.AMOR_35 == null) { element.AMOR_35 = 0 }
      if (element.AMOR_70 == null) { element.AMOR_70 = 0 }
      if (element.RI_A == null) { element.RI_A = 0 }
      if (element.RV_A == null) { element.RV_A = 0 }

      if (element.RI_MT == null) { element.RI_MT = 0 }
      if (element.RV_MT == null) { element.RV_MT = 0 }
      if (element.RI == null) { element.RI = 0 }
      if (element.RV == null) { element.RV = 0 }
      if (element.RIY == null) { element.RIY = 0 }
      if (element.RVY == null) { element.RVY = 0 }

      if (element.PAT_1 == null) { element.PAT_1 = 0 }
      if (element.PAT_1S == null) { element.PAT_1S = 0 }

      if (element.PAT_1C == null) { element.PAT_1C = 0 }
      if (element.PAT_2 == null) { element.PAT_2 = 0 }
      if (element.PAT_3 == null) { element.PAT_3 = 0 }
      if (element.PAT_1CS == null) { element.PAT_1CS = 0 }
      if (element.PAT_2S == null) { element.PAT_2S = 0 }
      if (element.PAT_3S == null) { element.PAT_3S = 0 }

      if (element.COTA == null) { element.COTA = "0" }
      if (element.ANGULO == null) { element.ANGULO = "0" } else { element.ANGULO = String(element.ANGULO).replace('\'', '$') }
      if (element.VERTICE == null) { element.VERTICE = "0" }

      if (element.TRANS_5 == null) { element.TRANS_5 = 0 }
      if (element.TRANS_10 == null) { element.TRANS_10 = 0 }
      if (element.TRANS_15 == null) { element.TRANS_15 = 0 }

      if (element.AP_BT == null) { element.AP_BT = 0 }
      if (element.AP_MT == null) { element.AP_MT = 0 }
      if (element.FASES == null) { element.FASES = 1 }
      if (element.ZONA == null) { element.ZONA = 17 }

      this.tabla = new MatTableDataSource<any>(this.datos);
      this.tabla.sort = this.sort;
      this.tabla.paginator = this.paginator;
      let flag = this.enviardatos(element);
      console.log(flag);
      i = i + 1;

    }


  }
  async f() {

  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  enviardatos(element) {
    this._importacion_service.insertplanilla(element).subscribe(
      result => {
        console.log(result);
        if (result.estado) {
          this.datos.push(result.data);
          this.tabla = new MatTableDataSource<any>(this.datos);
          this.tabla.sort = this.sort;
          this.tabla.paginator = this.paginator;
        } else {
          console.log(result.mensaje);
          //this.openSnackBar(result.mensaje, 99);
        }
        this.value = this.value + this.acum;
      }, error => {
        console.log(<any>error);
        //this.openSnackBar(<any>error, 99);
      });
  }

}

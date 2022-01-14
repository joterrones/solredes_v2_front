import { Component, OnInit, ViewChild } from '@angular/core';
import { ImportacionService } from '../../service/importacion.service'
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../base/base.component';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-importacion-linea',
  templateUrl: './importacion-linea.component.html',
  styleUrls: ['./importacion-linea.component.css'],
  providers: [ImportacionService]
})
export class ImportacionLineaComponent extends BaseComponent implements OnInit {


  tit = 'Carga de datos';
  datos;
  bufferValue = 100;
  value = 0;
  acum = 0;
  procesando:boolean = false;

  tabla: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'ESTADO',
    'CODIGO_LINEA',
    'NOMBRE_LINEA',
    'TIPO_LINEA',
    'ZONA'
  ];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public _importacion_service: ImportacionService,
    public dialog: MatDialog,
    public snack_1: MatSnackBar,
    public _router: Router,
  ) {
    super(snack_1, _router)
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

    datosenvio.forEach(element => {

      if (element.NOMBRE_LINEA == null) { element.NOMBRE_LINEA = "" }
      if (element.CODIGO_LINEA == null) { element.CODIGO_LINEA = "" }
      if (element.TIPO_LINEA == null) { element.TIPO_LINEA = "" } 
      if (element.ZONA == null) { element.ZONA = "" } 
    
    });
    
    let flag = this.enviardatos(datosenvio);
  }

  async f() {

  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  enviardatos(estructuras) {
    this.procesando = true;


    let rq= {
      estructuras: estructuras
    };
    console.log("enviardatos request",rq) 
    this._importacion_service.insertlinea(rq).subscribe(
      result => {
        console.log("enviardatos response", result);
        this.tabla = new MatTableDataSource<any>(result.data);
        this.tabla.sort = this.sort;
        this.tabla.paginator = this.paginator;
        this.value = this.value + this.acum;
        this.procesando = false;
      }, error => {
        console.log(<any>error);
        //this.openSnackBar(<any>error, 99);
        this.procesando = false;
      });
  }

  download(){
    this._importacion_service.downloadPlantillaLinea().subscribe(
      result => {
        saveAs(result, "Plantilla_linea");
      }, error => {
        this.openSnackBar(<any>error, 99);
      });
  }


}

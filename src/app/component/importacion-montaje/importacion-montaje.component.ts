import { Component, OnInit, ViewChild } from '@angular/core';
import { ImportacionService } from '../../service/importacion.service'
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MatSnackBar } from '@angular/material';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { saveAs } from 'file-saver';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { AppSettings } from 'src/app/common/appsettings';

@Component({
  selector: 'app-importacion-montaje',
  templateUrl: './importacion-montaje.component.html',
  styleUrls: ['./importacion-montaje.component.css'],
  providers: [ImportacionService,SeguridadService]
})
export class ImportacionMontajeComponent extends BaseComponent implements OnInit {

  pantallaRol= [];
  permisoEdit: boolean = false;

  tit = 'Carga de datos';
  datos;
  bufferValue = 100;
  value = 0;
  acum = 0;
  procesando:boolean = false;

  tabla: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'ESTADO',
    'CODIGO_GRUPO',
    'DESCRIPCION_GRUPO',
    'CODIGO_MONTAJE',
    'DESCRIPCION_MONTAJE',
    'UNIDAD'
  ];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public _importacion_service: ImportacionService,
    public _seguridad_service: SeguridadService,
    public dialog: MatDialog,
    public snack_1: MatSnackBar,
    public _router: Router,
  ) {
    super(snack_1, _router)
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;    
    this.getPantallaRol();
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

      if (element.CODIGO_GRUPO == null) { element.CODIGO_GRUPO = "" } 
      if (element.DESCRIPCION_GRUPO == null) { element.DESCRIPCION_GRUPO = "" } 
      if (element.CODIGO_MONTAJE == null) { element.CODIGO_MONTAJE = "" } 
      if (element.DESCRIPCION_MONTAJE == null) { element.DESCRIPCION_MONTAJE = "" }
      if (element.UNIDAD == null) { element.UNIDAD = "" } 
    
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
      estructuras: estructuras,
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto
    };
    console.log("enviardatos request",rq) 
    this._importacion_service.insertMontaje(rq).subscribe(
      result => {
        console.log("enviardatos response", result);
        this.tabla = new MatTableDataSource<any>(result.data);
        this.tabla.sort = this.sort;
        this.tabla.paginator = this.paginator;
        this.value = this.value + this.acum;
        this.procesando = false;
      }, error => {
        console.log(<any>error);
        this.procesando = false;
      });
  }

  download(){
    this._importacion_service.downloadPlantillaMontaje().subscribe(
      result => {
        saveAs(result, "Plantilla_Montaje.xlsx");
      }, error => {
        this.openSnackBar(<any>error, 99);
      });
  }

  getPantallaRol() {
    let request = {
      n_idseg_userprofile: this.usuarioLog.n_idseg_userprofile
    }
    this._seguridad_service.getPantallaRol(request, this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          this.pantallaRol = resultado.data;
          this.pantallaRol.forEach(element => {            
            if(element.c_codigo === 'imp-impmo'){
              console.log(element);
              console.log(element.c_codigo);
              if(element.c_permiso === 'MO'){
                this.permisoEdit = true;
              }
            }
          });
        } else {
          this.openSnackBar(resultado.mensaje, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }


}

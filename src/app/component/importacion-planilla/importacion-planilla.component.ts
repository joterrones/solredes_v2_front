import { Component, OnInit, ViewChild } from '@angular/core';
import { ImportacionService } from '../../service/importacion.service'
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../base/base.component';
import * as XLSX from 'xlsx';
import { VersionService } from 'src/app/service/version.service';
import { Router } from '@angular/router';
import { ImportacionPlanillaEliminarComponent } from '../importacion-planilla-eliminar/importacion-planilla-eliminar.component';
import { saveAs } from 'file-saver';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { AppSettings } from 'src/app/common/appsettings';
import { ExportarService } from 'src/app/service/exportar.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-importacion-planilla',
  templateUrl: './importacion-planilla.component.html',
  styleUrls: ['./importacion-planilla.component.css'],
  providers: [ImportacionService, VersionService, SeguridadService, ExportarService]
})
export class ImportacionPlanillaComponent extends BaseComponent implements OnInit {

  pantallaRol = [];
  permisoEdit: boolean = false;

  tit = 'Carga de datos';
  datos = [];
  versiones = [];
  idversion: number = 0;

  procesando: boolean = false;

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
    'COOR_N'
  ];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public _importacion_service: ImportacionService,
    public _version_service: VersionService,
    public _seguridad_service: SeguridadService,
    public _exportar_service: ExportarService,
    public dialog: MatDialog,
    public _router: Router,
    public snackBar: MatSnackBar
  ) {

    super(snackBar, _router)
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    this.getPantallaRol();
    this.versiones = this._version_service.get();
  }

  arrayBuffer: any;
  file: File;
  incomingfile(event) {
    this.file = event.target.files[0];
    this.upload();
  }

  selecVersion(id) {
    this.idversion = id;
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
    if (this.idversion > 0) {
      if (this.datos.length > 0) {
        let datosenvio = this.datos;
        this.datos = [];

        datosenvio.forEach(element => {
          element.TIPO = tipo;
          element.VERSION = this.idversion;
          if (element.NRO_SSEE == null) { element.NRO_SSEE = "" }
          if (element.CIRCUITO == null) { element.CIRCUITO = "" }
          if (element.ARMADO_P == null) { element.ARMADO_P = "" } else { element.ARMADO_P = String(element.ARMADO_P).replace('\'', '$') }
          if (element.ARMADO_S == null) { element.ARMADO_S = "" } else { element.ARMADO_S = String(element.ARMADO_S).replace('\'', '$') }
          if (element.S_TIPO == null) { element.S_TIPO = "" } else { element.S_TIPO = String(element.S_TIPO).replace('\'', '$') }
          if (element.PROGRESIVA == null) { element.PROGRESIVA = 0 }
          if (element.VANO == null) { element.VANO = 0 }
          if (element.T_TERRENO == null) { element.T_TERRENO = "" }
          if (element.S_CANTIDAD == null) { element.S_CANTIDAD = 0 }
          if (element.S_TIPO == null) { element.S_TIPO = 0 }
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
          if (element.AP_BT == null) { element.AP_BT = 0 }
          if (element.AP_MT == null) { element.AP_MT = 0 }
          if (element.FASES == null) { element.FASES = 1 }
          if (element.ZONA == null) { element.ZONA = 17 }

          element.TIPO_TRANS = element.TIPO_TRANS ? element.TIPO_TRANS : "";
          element.FUNCION_ARMADO = element.FUNCION_ARMADO ? element.FUNCION_ARMADO : "";

        });
        this.enviardatos(datosenvio);
      } else {
        this.openSnackBar("Carge los datos desde la plantilla", 200);
      }
    } else {
      this.openSnackBar("Seleccione una versión", 200);
    }
  }

  async f() {

  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  enviardatos(estructuras) {
    this.procesando = true;
    let rq = {
      estructuras: estructuras,
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto
    };
    console.log("enviardatos request", rq)
    this._importacion_service.insertplanilla(rq).subscribe(
      result => {
        console.log("enviardatos response", result);
        this.datos = result.data;
        this.tabla = new MatTableDataSource<any>(result.data);
        this.tabla.sort = this.sort;
        this.tabla.paginator = this.paginator;
        this.procesando = false;
      }, error => {
        console.log(<any>error);
        //this.openSnackBar(<any>error, 99);
        this.procesando = false;
      });
  }

  creargeom() {
    this.procesando = true;
    this._importacion_service.creargeom().subscribe(
      result => {
        console.log("creargeom response", result);
        this.openSnackBar("Objetos geográficos creados", 200);
        this.procesando = false;
      }, error => {
        console.log(<any>error);
        //this.openSnackBar(<any>error, 99);
        this.procesando = false;
      });
  }

  orientacion() {
    if (this.idversion > 0) {
      this.procesando = true;
      let req = { idversion: this.idversion }
      this._importacion_service.orientacionautomatica(req).subscribe(
        result => {
          console.log("orientacion response", result);
          this.openSnackBar("Retenidas orientadas", 200);
          this.procesando = false;
        }, error => {
          console.log(<any>error);
          //this.openSnackBar(<any>error, 99);
          this.procesando = false;
        });
    } else {
      this.openSnackBar("Seleccione una versión", 200);
    }
  }

  deleteEstructuras(): void {
    if (this.idversion) {
      const dialogRef = this.dialog.open(ImportacionPlanillaEliminarComponent, {
        width: '1250px',
        height: '600px',
        data: { idversion: this.idversion }
      });
      dialogRef.afterClosed().subscribe(result => {
        try {
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      this.openSnackBar("Seleccione una versión", 200);
    }

  }
  setdatogeneral(worksheet, cell, value, fontsize, bolt, fg_color = 'FFFFFF', bg_color = '000000') {
    const titleRow = worksheet.getCell(cell)
    titleRow.value = value;
    titleRow.font = { name: 'ARIAL', family: 4, size: fontsize, bold: bolt };
    titleRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: fg_color },
      color: { argb: bg_color }
    };
}

  exportar() {
    if(this.idversion > 0){
      this.procesando = true;
      let request = {
        n_idpro_proyecto: this.proyecto.n_idpro_proyecto,
        idversion: this.idversion
      }
      console.log(request);
      
      this._exportar_service.exportar(request, this.getToken().token).subscribe(
        result => {    
          console.log("result.data");
          
          //this._exportar_service.exportarExcelPlanilla(result.data);
          var datos = result.data;

          const workbook = new Workbook();
          const worksheet = workbook.addWorksheet('Hoja1');

          let row = 1;

          worksheet.getCell('A' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'A' + row, 'LINEA', 10, true, '00DA50');
          worksheet.getCell('A' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('A' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'B' + row, 'NRO_SSEE', 10, true, '00DA50');
          worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('B' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'C' + row, 'CIRCUITO', 10, true, '00DA50');
          worksheet.getCell('C' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('C' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'D' + row, 'ESTRUCTURA_ANTERIOR', 10, true, '00DA50');
          worksheet.getCell('D' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('D' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'E' + row, 'ESTRUCTURA', 10, true, '00DA50');
          worksheet.getCell('E' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('E' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'F' + row, 'ARMADO_P', 10, true, '00DA50');
          worksheet.getCell('F' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('F' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'G' + row, 'ARMADO_S', 10, true, '00DA50');
          worksheet.getCell('G' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('G' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('H' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'H' + row, 'ARMADO_RS_SE', 10, true, '00DA50');
          worksheet.getCell('H' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('H' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'I' + row, 'PROGRESIVA', 10, true, '002060');
          worksheet.getCell('I' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('I' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };


          worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'J' + row, 'COTA', 10, true, '002060');
          worksheet.getCell('J' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('J' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'K' + row, 'VERTICE', 10, true, '002060');
          worksheet.getCell('K' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('K' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
          };

          worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'L' + row, 'ANGULO', 10, true, '00DA50');
          worksheet.getCell('L' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('L' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'M' + row, 'VANO', 10, true, '002060');
          worksheet.getCell('M' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('M' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'N' + row, 'T_TERRENO', 10, true, '00DA50');
          worksheet.getCell('N' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('N' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('O' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'O' + row, 'S_CANTIDAD', 10, true, '002060');
          worksheet.getCell('O' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('O' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('P' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'P' + row, 'S_TIPO', 10, true, '002060');
          worksheet.getCell('P' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('P' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('Q' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'Q' + row, 'COOR_E', 10, true, '00DA50');
          worksheet.getCell('Q' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('Q' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('R' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'R' + row, 'COOR_N', 10, true, '00DA50');
          worksheet.getCell('R' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('R' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('S' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'S' + row, 'TIPO_CONDUCTOR', 10, true, '002060');
          worksheet.getCell('S' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('S' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('T' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'T' + row, 'CANTIDAD_CONDUCTOR', 10, true, '002060');
          worksheet.getCell('T' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('T' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('U' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'U' + row, 'AISLADOR_56_3', 10, true, '002060');
          worksheet.getCell('U' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('U' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('V' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'V' + row, 'AISLADOR_POLIMERICO', 10, true, '002060');
          worksheet.getCell('V' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('V' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('W' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'W' + row, 'AMOR_35', 10, true, '002060');
          worksheet.getCell('W' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('W' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };
          
          worksheet.getCell('X' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'X' + row, 'AMOR_70', 10, true, '002060');
          worksheet.getCell('X' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('X' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('Y' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'Y' + row, 'RI_A', 10, true, '002060');
          worksheet.getCell('Y' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('Y' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('Z' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'Z' + row, 'RV_A', 10, true, '002060');
          worksheet.getCell('Z' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('Z' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('AA' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AA' + row, 'RI_MT', 10, true, '002060');
          worksheet.getCell('AA' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AA' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };
          

          worksheet.getCell('AB' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AB' + row, 'RV_MT', 10, true, '002060');
          worksheet.getCell('AB' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AB' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('AC' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AC' + row, 'RI', 10, true, '002060');
          worksheet.getCell('AC' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AC' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('AD' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AD' + row, 'RV', 10, true, '002060');
          worksheet.getCell('AD' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AD' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('AE' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AE' + row, 'RIY', 10, true, '002060');
          worksheet.getCell('AE' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AE' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('AF' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AF' + row, 'RVY', 10, true, '002060');
          worksheet.getCell('AF' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AF' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('AG' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AG' + row, 'PAT_1', 10, true, '002060');
          worksheet.getCell('AG' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AG' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('AH' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AH' + row, 'PAT_1C', 10, true, '002060');
          worksheet.getCell('AH' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AH' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('AI' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AI' + row, 'PAT_2', 10, true, '002060');
          worksheet.getCell('AI' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AI' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };


          worksheet.getCell('AJ' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AJ' + row, 'PAT_3', 10, true, '002060');
          worksheet.getCell('AJ' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AJ' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('AK' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AK' + row, 'PAT_1CS', 10, true, '002060');
          worksheet.getCell('AK' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AK' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
          };

          worksheet.getCell('AL' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AL' + row, 'PAT_2S', 10, true, '002060');
          worksheet.getCell('AL' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AL' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('AM' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AM' + row, 'PAT_3S', 10, true, '002060');
          worksheet.getCell('AM' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AM' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('AN' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AN' + row, 'PAT_1S', 10, true, '002060');
          worksheet.getCell('AN' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AN' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('AO' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AO' + row, 'TIPO_TRANS', 10, true, '00DA50');
          worksheet.getCell('AO' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AO' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('AP' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AP' + row, 'CANTIDAD_TRANS', 10, true, '002060');
          worksheet.getCell('AP' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AP' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('AQ' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AQ' + row, 'AP_BT', 10, true, '002060');
          worksheet.getCell('AQ' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AQ' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('AR' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AR' + row, 'AP_BT_ANGULO', 10, true, '002060');
          worksheet.getCell('AR' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AR' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('AS' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AS' + row, 'AP_MT', 10, true, '002060');
          worksheet.getCell('AS' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AS' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('AT' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AT' + row, 'AP_MT_ANGULO', 10, true, '002060');
          worksheet.getCell('AT' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AT' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('AU' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AU' + row, 'FASES', 10, true, '002060');
          worksheet.getCell('AU' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AU' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('AV' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AV' + row, 'ZONA', 10, true, '002060');
          worksheet.getCell('AV' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
          worksheet.getCell('AV' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };

          worksheet.getCell('AW' + row).alignment = { vertical: 'middle', horizontal: 'center' };
          this.setdatogeneral(worksheet, 'AW' + row, 'FUNCION_ARMADO', 10, true, 'FFFF00');
          worksheet.getCell('AW' + row).font = { color: { argb: '000000' }, bold: true };
          worksheet.getCell('AW' + row).border = {
              right: { style: 'thin' },
              bottom: { style: 'thin' },
          };
          
          datos.forEach(element => {
              row += 1;
              worksheet.getCell('A' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'A' + row, element.c_nombre, 10, false);
              worksheet.getCell('A' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'B' + row, element.c_nro_se, 10, false);
              worksheet.getCell('B' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'C' + row, element.c_nro_se, 10, false);
              worksheet.getCell('C' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'E' + row, element.c_codigonodo, 10, false);
              worksheet.getCell('E' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'F' + row, element.codigoap, 10, false);
              worksheet.getCell('F' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'F' + row, element.codigoap, 10, false);
              worksheet.getCell('F' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'G' + row, element.c_codigoas, 10, false);
              worksheet.getCell('G' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'G' + row, element.c_codigoarsse, 10, false);
              worksheet.getCell('G' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('H' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'H' + row, element.c_codigoarsse, 10, false);
              worksheet.getCell('H' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'I' + row, element.c_progresiva, 10, false);
              worksheet.getCell('I' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'J' + row, element.c_cota, 10, false);
              worksheet.getCell('J' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'K' + row, element.c_vertice, 10, false);
              worksheet.getCell('K' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'L' + row, element.c_angulo, 10, false);
              worksheet.getCell('L' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };
              
              worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'N' + row, element.c_tipoterreno, 10, false);
              worksheet.getCell('N' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('O' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'O' + row, element.n_cantidad, 10, false);
              worksheet.getCell('O' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('P' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'P' + row, element.c_codigo, 10, false);
              worksheet.getCell('P' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('Q' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'Q' + row, element.c_longitud, 10, false);
              worksheet.getCell('Q' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('R' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'R' + row, element.c_latitud, 10, false);
              worksheet.getCell('R' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('S' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'S' + row, element.c_etiquetacorto, 10, false);
              worksheet.getCell('S' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('T' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'T' + row, element.n_cantidadpsta, 10, false);
              worksheet.getCell('T' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('AO' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AO' + row, element.codigoap, 10, false);
              worksheet.getCell('AO' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('AP' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AP' + row, element.n_cantidadea, 10, false);
              worksheet.getCell('AP' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('AR' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AR' + row, element.n_orientacion, 10, false);
              worksheet.getCell('AR' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('AT' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AT' + row, element.n_orientacion, 10, false);
              worksheet.getCell('AT' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('AU' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AU' + row, element.n_fases, 10, false);
              worksheet.getCell('AU' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('AV' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AV' + row, 17, 10, false);
              worksheet.getCell('AV' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              worksheet.getCell('AW' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AW' + row, element.c_funcion, 10, false);
              worksheet.getCell('AW' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };            
              
              if(element.amortiguador_35 === null){
                  element.amortiguador_35 = 0;
              }
              worksheet.getCell('W' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'W' + row, element.amortiguador_35, 10, false);
              worksheet.getCell('W' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              if(element.amortiguador_70 === null){
                  element.amortiguador_70 = 0;
              }
              worksheet.getCell('X' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'X' + row, element.amortiguador_70, 10, false);
              worksheet.getCell('X' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };                           
              
              if(element.ri_a === null){
                  element.ri_a = 0;
              }
              worksheet.getCell('Y' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'Y' + row, element.ri_a, 10, false);
              worksheet.getCell('Y' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };
              
              if(element.rv_a === null){
                  element.rv_a = 0;
              }
              worksheet.getCell('Z' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'Z' + row, element.rv_a, 10, false);
              worksheet.getCell('Z' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              if(element.ri_mt === null){
                  element.ri_mt = 0;
              }
              worksheet.getCell('AA' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AA' + row, element.ri_mt, 10, false);
              worksheet.getCell('AA' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };
              
              if(element.rv_mt === null){
                  element.rv_mt = 0;
              }
              worksheet.getCell('AB' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AB' + row, element.rv_mt, 10, false);
              worksheet.getCell('AB' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };
              
              if(element.ri === null){
                  element.ri = 0;
              }
              worksheet.getCell('AC' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AC' + row, element.ri, 10, false);
              worksheet.getCell('AC' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };
              
              if(element.rv === null){
                  element.rv = 0;
              }
              worksheet.getCell('AD' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AD' + row, element.rv, 10, false);
              worksheet.getCell('AD' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };
              
              if(element.riy === null){
                  element.riy = 0;
              }
              worksheet.getCell('AE' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AE' + row, element.riy, 10, false);
              worksheet.getCell('AE' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };
              
              if(element.rvy === null){
                  element.rvy = 0;
              }
              worksheet.getCell('AF' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AF' + row, element.rvy, 10, false);
              worksheet.getCell('AF' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };
              
              if(element.pat_1 === null){
                  element.pat_1 = 0;
              }
              worksheet.getCell('AG' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AG' + row, element.pat_1, 10, false);
              worksheet.getCell('AG' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };
              
              if(element.pat_1c === null){
                  element.pat_1c = 0;
              }
              worksheet.getCell('AH' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AH' + row, element.pat_1c, 10, false);
              worksheet.getCell('AH' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };                            
              
              if(element.pat_2 === null){
                  element.pat_2 = 0;
              }
              worksheet.getCell('AI' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AI' + row, element.pat_2, 10, false);
              worksheet.getCell('AI' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };
              
              if(element.pat_3 === null){
                  element.pat_3 = 0;
              }
              worksheet.getCell('AJ' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AJ' + row, element.pat_3, 10, false);
              worksheet.getCell('AJ' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };
              
              if(element.pat_1cs === null){
                  element.pat_1cs = 0;
              }
              worksheet.getCell('AK' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AK' + row, element.pat_1cs, 10, false);
              worksheet.getCell('AK' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };
              
              if(element.pat_2s === null){
                  element.pat_2s = 0;
              }
              worksheet.getCell('AL' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AL' + row, element.pat_2s, 10, false);
              worksheet.getCell('AL' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };
              
              if(element.pat_3s === null){
                  element.pat_3s = 0;
              }
              worksheet.getCell('AM' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AM' + row, element.pat_3s, 10, false);
              worksheet.getCell('AM' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };
              
              if(element.pat_1s === null){
                  element.pat_1s = 0;
              }
              worksheet.getCell('AN' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AN' + row, element.pat_1s, 10, false);
              worksheet.getCell('AN' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };
              
              /*worksheet.getCell('AP' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AP' + row, element2.n_cantidad, 10, false);
              worksheet.getCell('AP' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };*/
              
              if(element.ap_bt === null){
                  element.ap_bt = 0;
              }
              worksheet.getCell('AQ' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AQ' + row, element.ap_bt, 10, false);
              worksheet.getCell('AQ' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              if(element.n_orientacion === null){
                  element.n_orientacion = 0;
              }
              /* worksheet.getCell('AR' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AR' + row, element2.n_orientacion, 10, false);
              worksheet.getCell('AR' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };*/

              if(element.apmt === null){
                  element.apmt = 0;
              }
              worksheet.getCell('AS' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AS' + row, element.apmt, 10, false);
              worksheet.getCell('AS' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };

              /*worksheet.getCell('AT' + row).alignment = { vertical: 'middle', horizontal: 'center' };
              this.setdatogeneral(worksheet, 'AT' + row, element2.n_orientacion, 10, false);
              worksheet.getCell('AT' + row).border = {
                  left: { style: 'thin' },
                  right: { style: 'thin' },
                  bottom: { style: 'thin' },
              };*/

          });
          
          worksheet.getColumn(1).width = 50;
          worksheet.getColumn(2).width = 15;
          worksheet.getColumn(3).width = 15;
          worksheet.getColumn(4).width = 23;
          worksheet.getColumn(5).width = 18;
          worksheet.getColumn(6).width = 18;
          worksheet.getColumn(7).width = 18;
          worksheet.getColumn(8).width = 20;
          worksheet.getColumn(9).width = 20;
          worksheet.getColumn(10).width = 15;

          worksheet.getColumn(12).width = 15;
          worksheet.getColumn(13).width = 15;
          worksheet.getColumn(14).width = 20;
          worksheet.getColumn(15).width = 20;
          worksheet.getColumn(16).width = 20;
          worksheet.getColumn(17).width = 20;
          worksheet.getColumn(18).width = 20;
          
          worksheet.getColumn(19).width = 23;
          worksheet.getColumn(20).width = 25;
          worksheet.getColumn(21).width = 25;
          worksheet.getColumn(22).width = 25;
          worksheet.getColumn(23).width = 18;
          worksheet.getColumn(24).width = 18;

          worksheet.getColumn(41).width = 20;
          worksheet.getColumn(42).width = 25;
          worksheet.getColumn(44).width = 25;
          worksheet.getColumn(46).width = 20;
          worksheet.getColumn(49).width = 25;         

          worksheet.getRow(1).height = 30;
          //worksheet.getRow(2).height = 20;

          //worksheet.mergeCells(`B1:I1`);        
          // Generate Excel File with given name
          workbook.xlsx.writeBuffer().then((data: any) => {
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, 'excelFileName' + '.xlsx');
            this.procesando = false;
          });
        }, error => {
          this.openSnackBar(<any>error, 99);
        });
    }else{
      this.openSnackBar("Seleccione una versión", 200);
    }
    
  }

  download() {
    this._importacion_service.downloadPlantillaRedes().subscribe(
      result => {
        saveAs(result, "Plantilla_Redes.xlsx");
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
            if (element.c_codigo === 'imp-imppl') {
              console.log(element);
              console.log(element.c_codigo);
              if (element.c_permiso === 'MO') {
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

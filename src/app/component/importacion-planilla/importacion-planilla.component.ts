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
import { ImportacionPlanillaDescargarComponent } from '../importacion-planilla-descargar/importacion-planilla-descargar.component';
import { confGeneralService } from 'src/app/service/confGeneral.service';

@Component({
  selector: 'app-importacion-planilla',
  templateUrl: './importacion-planilla.component.html',
  styleUrls: ['./importacion-planilla.component.css'],
  providers: [ImportacionService, VersionService, SeguridadService, ExportarService, confGeneralService]
})
export class ImportacionPlanillaComponent extends BaseComponent implements OnInit {

  pantallaRol = [];
  permisoEdit: boolean = false;

  tit = 'Carga de datos';
  datos = [];
  versiones = [];
  idversion: number = 0;

  procesando: boolean = false;

  arrZonas = [];
  arrTipoLi = [];
  arrLineas = [];

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
    public _confiGeneral_service: confGeneralService,    
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

openDialog(): void {
  if(this.idversion > 0){
    const dialogRef = this.dialog.open(ImportacionPlanillaDescargarComponent, {
      width: '750px',
      data: { idversion: this.idversion }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {       
      } catch (error) {
        console.log(error);
      }
    });

  }else{
    this.openSnackBar("Seleccione una versión", 200);
  }
 
} 
  exportar() {
    
    
  }

  download() {
    let request = {
      n_idpl_zona: 0,      
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto,     
    }    
    this._confiGeneral_service.getZona(request, this.getToken().token).subscribe(
      result => {        
          if (result.estado) {
            this.arrZonas = result.data;            
            this._importacion_service.gettipolinea(this.getToken().token).subscribe(
              result=>{
                if(result.estado){
                  this.arrTipoLi = result.data;
                  var req = {
                    n_idpl_tipolinea: 0,     
                    n_idpl_zona: 0,
                    n_idpro_proyecto: this.proyecto.n_idpro_proyecto,
                    estadoSelectb_expediente: null,
                    estadoSelectb_replanteo: null,
                    estadoSelectb_montaje: null,
                    estadoSelectb_cierre: null
                  }
                  this._confiGeneral_service.getLinea(req, this.getToken().token).subscribe(
                    result => {   
                      if(result.estado){
                        this.arrLineas = result.data;
                        this._importacion_service.downloadPlantillaRedes2(this.arrZonas, this.arrTipoLi, this.arrLineas);
                      }else {
                        this.openSnackBar(result.mensaje, 99);
                      }          
                    }, error => {
                      this.openSnackBar(error.error, 99);
                    });
                  
                  
                }else {
                  this.openSnackBar(result.mensaje, 99);
                }  
              }, error => {
                this.openSnackBar(error.error, 99);
              });          
          } else {
            this.openSnackBar(result.mensaje, 99);
          }        
      }, error => {
        this.openSnackBar(error.error, 99);
      });
    /*this._importacion_service.downloadPlantillaRedes().subscribe(
      result => {
        saveAs(result, "Plantilla_Redes.xlsx");
      }, error => {
        this.openSnackBar(<any>error, 99);
      });*/
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

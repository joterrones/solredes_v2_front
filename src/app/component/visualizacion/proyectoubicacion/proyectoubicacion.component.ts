import { Component, OnInit, ViewChild, Input, ChangeDetectorRef, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';
import { UbigeoService } from '../../../service/ubigeo.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import * as XLSX from 'xlsx';
import { ExcelService } from '../../../service/excel.service';
import { ProyectoService } from '../../../service/proyecto.service';
@Component({
  selector: 'app-proyectoubicacion',
  templateUrl: './proyectoubicacion.component.html',
  styleUrls: ['./proyectoubicacion.component.css'],
  providers: [UbigeoService, ExcelService, ProyectoService]
})
export class ProyectoubicacionComponent extends BaseComponent implements OnInit {
  datos = [];
  @ViewChild('fileInput', { static: true }) myInputVariable: ElementRef;
  @Input() proyecto: any;
  displayedColumns: string[] = ['check', 'c_departamento', 'c_provincia', 'c_distrito', 'c_centropoblado'];
  public tabla: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  textfilter = '';

  fasesubigeo = [];
  ubicaciones = [];

  departamentos = [];
  provincias = [];
  distritos = [];
  ubigeos = [];

  iddepartamento = 0;
  idprovincia = 0;
  iddistrito = 0;
  idfase = 0;
  ubigeo1 = "";
  ubigeo2 = "";
  ubigeo3 = "";

  load = false;

  constructor(
    private _ubigeo_service: UbigeoService,
    private _excel_service: ExcelService,
    private _proyecto_service: ProyectoService,
    public _router: Router,
    public snackBar: MatSnackBar,
    private changeDetectorRefs: ChangeDetectorRef) {
    super(snackBar, _router);
  }

  ngOnInit() {
    this.get_fases();
    this.get_departamento();
    this.getUbigeoProyecto();
  }

  selectDepartamento(id) {
    this.iddepartamento = id;
    this.get_provincia();
    this.get_tabla();
  }
  selectProvincia(id) {
    this.idprovincia = id;
    this.get_distrito();
    this.get_tabla();
  }
  selectDistrito(id) {
    this.iddistrito = id;
    this.get_tabla();
  }


  get_departamento() {
    let rq = {};
    this._ubigeo_service.get_departamento(rq, this.getToken().token).subscribe(
      result => {
        ;
        if (result.estado) {
          this.departamentos = result.data;
        } else {
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  get_provincia() {
    let rq = { n_idgen_departamento: this.iddepartamento };
    this._ubigeo_service.get_provincia(rq, this.getToken().token).subscribe(
      result => {
        ;
        if (result.estado) {
          this.provincias = result.data;
        } else {
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  get_distrito() {
    let rq = {
      n_idgen_provincia: this.idprovincia,
      n_idgen_departamento: this.iddepartamento
    };
    this._ubigeo_service.get_distrito(rq, this.getToken().token).subscribe(
      result => {
        ;
        if (result.estado) {
          this.distritos = result.data;
        } else {
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  get_fases() {
    this._ubigeo_service.get_ubigeoproyecto_fase({}, this.getToken().token).subscribe(
      result => {
        try {
          console.log(result)
          if (result.estado) {
            this.fasesubigeo = result.data;
            if (this.fasesubigeo.length > 0) {
              this.idfase = this.fasesubigeo[0].n_idgen_fase;
            }

          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }
  get_tabla() {

    this.load = true;
    let req = {
      n_idgen_proyecto: this.proyecto.n_idgen_proyecto,
      n_idgen_departamento: this.iddepartamento,
      n_idgen_provincia: this.idprovincia,
      n_idgen_distrito: this.iddistrito,
      n_idgen_fase: this.idfase
    };
    console.log("Cargando la tabla")
    console.log(req)

    this._ubigeo_service.get_ubigeoproyecto(req, this.getToken().token).subscribe(
      result => {
        try {
          console.log(result)
          if (result.estado) {
            this.ubicaciones = result.data;
            this.tabla = new MatTableDataSource<any>(this.ubicaciones);
            this.tabla.sort = this.sort;
            this.tabla.paginator = this.paginator;
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
          this.load = false;
        }
      }, error => {
        this.openSnackBar(error.error, 99);
        this.load = false;
      });
  }
  applyFilter(filterValue: String) {
    this.tabla.filter = filterValue.trim().toLowerCase();
  }


  guardarcheck(element) {
    element.n_idgen_proyecto = this.proyecto.n_idgen_proyecto;
    element.n_idgen_fase = this.idfase;
    this._ubigeo_service.save_proyectoubicacion(element, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {

          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      }, error => {
        console.error(error);
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  changetabubigeo(faseubigeo) {
    console.log(faseubigeo)
    this.idfase = faseubigeo.n_idgen_fase;
    this.get_tabla();
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
      console.log(this.datos)
      this.guardarimport();
    }
    fileReader.readAsArrayBuffer(this.file);
    this.reset();
  }

  reset() {
    this.myInputVariable.nativeElement.value = '';
  }

  guardarimport() {

    let rq = {
      datos: this.datos,
      n_idgen_proyecto: this.proyecto.n_idgen_proyecto,
      n_idgen_fase: this.idfase
    };
    this._ubigeo_service.save_proyectoubicacion_import(rq).subscribe(
      result => {
        try {
          console.log("resultado de la importacion")
          console.log(result)
          if (result.estado) {
            this.get_tabla();
            this._excel_service.exportAsExcelFile(result.data, "Impor_log.xlsx");
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      }, error => {
        console.error(error);
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });


  }

  getUbigeoProyecto() {
    let rq = {
      n_idgen_proyecto: this.proyecto.n_idgen_proyecto
    };
    this._proyecto_service.getUbigeoProyecto(rq, this.getToken().token).subscribe(
      result => {
        ;
        if (result.estado) {
          this.ubigeos = result.data;

          this.ubigeo1 = this.ubigeos.filter( o => o.n_fila == 1)[0].c_ubigeo;
          this.ubigeo2 = this.ubigeos.filter( o => o.n_fila == 2)[0].c_ubigeo;
          this.ubigeo3 = this.ubigeos.filter( o => o.n_fila == 3)[0].c_ubigeo;

        } else {
          this.openSnackBar(result.mensaje, 99);
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MapaService } from '../../../service/mapa.services';
import { AppSettings } from '../../../common/appsettings'
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { ResultadoApi } from '../../../interface/common.interface';
import { ExcelService } from '../../../service/excel.service';
import { ProyectoService } from '../../../service/proyecto.service';
import { DetalleproyectoComponent } from '../../general/detalleproyecto/detalleproyecto.component';
import {TareaService} from '../../../service/tarea.service';

import {UbigeoService} from '../../../service/ubigeo.service';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
  providers: [MapaService, ExcelService, ProyectoService,TareaService,UbigeoService]
})
export class MapaComponent extends BaseComponent implements OnInit {

  datas: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
  }, {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  }, {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
  }];

  tit: String = "MAPA DE ESTADO DE LOS PROYECTOS";

  lat: number = -12.088898333333335;
  lng: number = -77.00707333333334;
  zoom: number = 5;
  data: any;

  departamentos = [];
  provincias = [];
  distritos = [];
  centropoblados = [];
  entidades = [];
  puntos = [];
  dataexport = [];
  detalles = [];

  iddepartamento: number = 0;
  idprovincia: number = 0;
  iddistrito: number = 0;
  idcentropoblado: number = 0;
  identidad: number = 0;

  lastOpen: any = null;

  zona = [
    { id: 0, nombre: 'Norte' },
    { id: 1, nombre: 'Sur' }
  ]
  avance = [
    { id: 0, nombre: 'Conforme' },
    { id: 1, nombre: 'Retrazado' },
    { id: 2, nombre: 'Adelantado' }
  ]
  plazo = [
    { id: 0, nombre: 'Dentro' },
    { id: 1, nombre: 'Fuera' },
  ]
  estado = [
    { id: 0, nombre: 'En Ejecución' },
    { id: 1, nombre: 'Paralizado' },
    { id: 1, nombre: 'Terminado' },
  ]

  tabla: MatTableDataSource<any>;
  displayedColumns: string[] = ['clave', 'valor',];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  tabla2: MatTableDataSource<any>;
  displayedColumns2: string[] = ['clave', 'valor',];
  @ViewChild(MatPaginator, { static: false }) paginator2: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort2: MatSort;

  tabla3: MatTableDataSource<any>;
  displayedColumns3: string[] = ['clave', 'valor', 'descarga'];
  @ViewChild(MatPaginator, { static: false }) paginator3: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort3: MatSort;

  tablaDetalle: MatTableDataSource<any>;
  displayedColumnsDetalle: string[] = ['valor0', 'valor1', 'valor2', 'valor3'];
  @ViewChild(MatPaginator, { static: false }) paginatorDetalle: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortDetalle: MatSort;

  tablaarchivo: MatTableDataSource<any>;
  displayedColumnsArchivo: string[] = ['clave', 'valor', 'descarga'];
  @ViewChild(MatPaginator, { static: false }) paginatorArchivo: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortArchivo: MatSort;

  geoJsonObject: Object;
  markers = [];
  fases=[];


  n_idgen_fase=0;

  constructor(public snackBar: MatSnackBar,
    public router: Router,
    public _mapa_service: MapaService,
    public dialog: MatDialog,
    private excelService: ExcelService,
    private _proyecto_service: ProyectoService,
    private _tarea_service:TareaService,
    private  _ubigeo_service: UbigeoService
    
  ) {
    super(snackBar, router);
  }

  selectFase(id){
    this.n_idgen_fase = id;
    this.get();
  }

  ngOnInit() {
    this.getDepartamento();
    this.getFase();
    this.get();
  }

  selectDepartamento(id){
    this.iddepartamento = id;
    this.getProvincia();
    this.get();
  }

  selectProvincia(id){
    this.idprovincia = id;
    this.getDistrito();
    this.get();
  }

  selectDistrito(id){
    this.iddistrito = id;
    this.getCentoPoblado();
    this.get();
  }

  selectCentroPoblado(id){
    this.idcentropoblado = id;
    this.get();
  }

  getFase() {
    this._tarea_service.get_fase(this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.fases = result.data
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

  getDepartamento() {
    this._ubigeo_service.get_departamento({},this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            console.log(result)
            this.departamentos = result.data
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

  getProvincia() {
    this._ubigeo_service.get_provincia({n_idgen_departamento:this.iddepartamento},this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.provincias = result.data
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

  getDistrito() {
    this._ubigeo_service.get_distrito({n_idgen_provincia:this.idprovincia,n_idgen_departamento:this.iddepartamento},this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.distritos = result.data
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

  getCentoPoblado() {
    this._ubigeo_service.get_centropoblado({n_idgen_departamento:this.iddepartamento,n_idgen_provincia:this.idprovincia, n_idgen_distrito:this.iddistrito}).subscribe(
      result => {
        try {
          if (result.estado) {
            console.log(result);
            this.centropoblados = result.data
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






  getTablaDetalle(data) {
    console.log(data);
    this.tablaDetalle = new MatTableDataSource<any>(data);
    this.tablaDetalle.sort = this.sortDetalle;
    this.tablaDetalle.paginator = this.paginatorDetalle;
  }

  get() {
    let req = {
      n_idgen_fase: this.n_idgen_fase,
      n_idgen_departamento: this.iddepartamento,
      n_idgen_provincia: this.idprovincia,
      n_idgen_distrito: this.iddistrito,
      n_idgen_centropoblado: this.idcentropoblado,
    }


    this._mapa_service.get(req, this.getToken().token).subscribe(
      result => {

        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          this.markers = [];
          this.puntos = resultado.data;
          console.log(this.puntos);
          result.data.forEach(element => {
            let marker = {
              lat: element.c_latitud,
              lng: element.c_longitud,
              label: "A",
              alpha: 1,
              data: element,
              url: "./assets/map/icono-deppol.svg"
            };
            this.markers.push(marker);
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

  getxls() {
    let req = {
      n_idgen_departamento: this.iddepartamento,
      n_idgen_provincia: this.idprovincia,
      n_idgen_distrito: this.iddistrito,
      n_idgen_centropoblado: this.idcentropoblado,
      n_idgen_entidad: this.identidad,
    }
    this._mapa_service.getxls(req, this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          this.dataexport = resultado.data;
          this.excelService.exportAsExcelFile(this.dataexport, 'Reporte Encuestas');
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

  onMouseOver(infoWindow, marker) {
    console.log(marker);
    infoWindow.open();
    //this.getTablaDetalle(marker.data.detalle);
  }

 
  onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
}


  export() {
    this.getxls();
  }


  openDialog(item): void {
    const dialogRef = this.dialog.open(DetalleproyectoComponent, {
      width: '850px',
      maxHeight: '650px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

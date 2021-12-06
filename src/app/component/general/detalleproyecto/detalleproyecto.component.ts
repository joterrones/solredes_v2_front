import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';
import { ResultadoApi } from '../../../interface/common.interface';
import { ProyectoService } from '../../../service/proyecto.service';
import { MapaService } from '../../../service/mapa.services';
import { ProyectoInterface } from '../../../interface/proyecto.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-detalleproyecto',
  templateUrl: './detalleproyecto.component.html',
  styleUrls: ['./detalleproyecto.component.css'],
  providers: [ProyectoService, MapaService]
})
export class DetalleproyectoComponent extends BaseComponent implements OnInit {
  files = [];
  atributos = [];
  tareas = [];
  fases = [];

  ubigeos = [];
  ubigeo1 = "";
  ubigeo2 = "";
  ubigeo3 = "";

  public tabla: MatTableDataSource<any>;
  public tablaarchivo: MatTableDataSource<any>;
  public tablaatributo: MatTableDataSource<any>;
  public tablagra1: MatTableDataSource<any>;

  displayedColumns: string[] = ['tarea', 'fecha', 'dias'];
  displayedColumnsArchivo: string[] = ['nombre', 'archivo', 'descarga'];
  displayedColumnsAtributo: string[] = ['nombreatributo', 'valoratributo'];


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild(MatPaginator, { static: false }) paginatorarchivo: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortarchivo: MatSort;

  @ViewChild(MatPaginator, { static: false }) paginatoratributo: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortatributo: MatSort;


  constructor(public dialogRef: MatDialogRef<DetalleproyectoComponent>,
    private _proyecto_service: ProyectoService,
    private _mapa_service: MapaService,
    @Inject(MAT_DIALOG_DATA) public data: ProyectoInterface,
    public _router: Router,
    private _formBuilder: FormBuilder,
    public snackBar: MatSnackBar) {
    super(snackBar, _router);
  }
  proyecto: any;
  ngOnInit() {
    this.proyecto = this.data;
    this.get_proyecto_atributo();
    this.gettareasincompletas();
    this.getfiles();
    this.getUbigeoProyecto();
  }

  getfiles() {
    let req = { n_idgen_proyecto: this.proyecto.n_idgen_proyecto }
    this._mapa_service.getfiles(req, this.getToken().token).subscribe(
      result => {

        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          console.log("Descargar Archivos");
          console.log(result.data);
          this.tablaarchivo = new MatTableDataSource<any>(result.data);
          this.tablaarchivo.sort = this.sortarchivo;
          this.tablaarchivo.paginator = this.paginatorarchivo;
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }


  download(nombre) {
    this._mapa_service.download("PROY_" + this.proyecto.n_idgen_proyecto + "/" + nombre).subscribe(
      result => {
        saveAs(result, nombre);
      }, error => {
        this.openSnackBar(<any>error, 99);
      });

  }

  gettareasincompletas() {
    let req = { n_idgen_proyecto: this.proyecto.n_idgen_proyecto }
    this._mapa_service.gettareasincompletas(req, this.getToken().token).subscribe(
      result => {

        try {
          if (result.estado) {
            console.log(result.data);
            this.tabla = new MatTableDataSource<any>(result.data);
            this.tabla.sort = this.sort;
            this.tabla.paginator = this.paginator;
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
        }
      }, error => {
        this.openSnackBar(error.stack, 99);
      });
  }

  get_proyecto_atributo() {
    let req = { n_idgen_proyecto: this.proyecto.n_idgen_proyecto }
    this._mapa_service.get_proyecto_atributo(req, this.getToken().token).subscribe(
      result => {

        try {
          if (result.estado) {
            console.log(result.data)
            this.fases = result.data;

            if (this.fases.length > 0) {
              this.changetab(1)
            }
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
        }
      }, error => {
        this.openSnackBar(error.stack, 99);
      });
  }
  changetab(idfase) {
    this.tablaatributo = new MatTableDataSource<any>([]);
    console.log(idfase);
 
    let datagrilla = this.fases.filter(o=>o.n_idgen_fase==idfase)[0].atributos;
  
    this.tablaatributo = new MatTableDataSource<any>(datagrilla);
    this.tablaatributo.sort = this.sortatributo;
    this.tablaatributo.paginator = this.paginatoratributo;
    
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

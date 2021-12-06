import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';
import { ResultadoApi } from '../../../interface/common.interface';
import { TareaService } from '../../../service/tarea.service';
import { ProyectoInterface } from '../../../interface/proyecto.interface';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
@Component({
  selector: 'app-tipoproyectoconfig',
  templateUrl: './tipoproyectoconfig.component.html',
  styleUrls: ['./tipoproyectoconfig.component.css'],
  providers: [TareaService]
})
export class TipoproyectoconfigComponent extends BaseComponent implements OnInit {

  tipoproyecto: any;
  fases:[];
  idfase:0;
  actividades:[];
  idactividad:0


  displayedColumns: string[] = ['check', 'c_descripcion'];

  public tabla: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  textfilter = '';
  constructor(public dialogRef: MatDialogRef<TipoproyectoconfigComponent>,
    private _tarea_service: TareaService,
    @Inject(MAT_DIALOG_DATA) public data: ProyectoInterface,
    public _router: Router,
    public snackBar: MatSnackBar) {
    super(snackBar, _router);
  }
  ngOnInit() {
    this.tipoproyecto= this.data;
    this.getfase();
    this.getactividad();
    this.get_tabla();
  }

  selectFase(idfase) {
    this.idfase = idfase;
    this.getactividad();
  }
  selectActividad(idactividad) {
    this.idactividad = idactividad;
    this.get_tabla();
  }
  get_tabla() {
    
    let req = {
      n_idgen_tipoproyecto:this.tipoproyecto.n_idgen_tipoproyecto,
      n_idgen_actividad:this.idactividad
    } 
    this._tarea_service.get(req,this.getToken().token).subscribe(
      result => {
        try {
          console.log(result)
          if (result.estado) {
            this.tabla = new MatTableDataSource<any>(result.data);
            this.tabla.sort = this.sort;
            this.tabla.paginator = this.paginator;
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
          this.applyFilter(this.textfilter);
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }

  getfase() {
    this._tarea_service.get_fase(this.getToken().token).subscribe(
      result => {
        try {
          console.log(result)
          if (result.estado) {
          this.fases = result.data;
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

  getactividad() {
    let req = {
      n_idgen_fase:this.idfase
    } 
    this._tarea_service.get_actividad(req,this.getToken().token).subscribe(
      result => {
        try {
          console.log(result)
          if (result.estado) {
          this.actividades = result.data;
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

  applyFilter(filterValue: String) {
    this.tabla.filter = filterValue.trim().toLowerCase();
  }

  

  guardar(elemento) {
    if(elemento.n_idgen_tipoproyecto==0){
      elemento.n_idgen_tipoproyecto=this.tipoproyecto.n_idgen_tipoproyecto;
    }
    this._tarea_service.save_tipoproyecto_tarea(elemento, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.get_tabla();
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
}

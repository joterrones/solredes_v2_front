import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings'
import { Router } from "@angular/router";
import { BaseComponent } from '../../base/base.component';
import { Confirmar } from '../../../interface/confirmar.interface';
import { TareaService } from '../../../service/tarea.service';
import { TareaeditComponent } from '../tareaedit/tareaedit.component';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { TareaconfigComponent } from '../tareaconfig/tareaconfig.component';
@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css'],
  providers: [TareaService]
})
export class TareaComponent extends BaseComponent implements OnInit {
  textfilter = '';
  displayedColumns: string[] = ['editar', 'c_nombre','c_descripcion','n_duracion', 'b_diasferiados', 'c_prede', 'hitocontrol','config', 'eliminar'];
  public tabla: MatTableDataSource<any>;
  public confirmar: Confirmar;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  fases = [];
  idfase = 0;
  actividades = [];
  idactividad = 0;
  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _tarea_service: TareaService,
    public dialog: MatDialog
  ) {
    super(snackBar, router);
  }

  ngOnInit() {
    this.getfase();
    this.getActividad();
    this.get_tabla();
  }

  selectFase(idfase) {
    this.idfase = idfase;
    this.getActividad();
  }

  selectActividad(iactividad) {
    this.idactividad = iactividad;
    this.get_tabla();
  }


  applyFilter(filterValue: String) {
    this.tabla.filter = filterValue.trim().toLowerCase();
  }
  get_tabla() {
    let req = { n_idgen_actividad: this.idactividad }
    this._tarea_service.get_tarea(req, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.tabla = new MatTableDataSource<any>(result.data);
            this.tabla.sort = this.sort;
            this.tabla.paginator = this.paginator;
            this.applyFilter(this.textfilter);
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
  getfase() {
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
  getActividad() {
    let req = { n_idgen_fase: this.idfase }
    this._tarea_service.get_actividad(req, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.actividades = result.data
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
  openDialog(item): void {
    if (this.idfase > 0 && this.idactividad > 0) {
      const dialogRef = this.dialog.open(TareaeditComponent, {
        width: '850px',
        data: { item: item, n_idgen_fase: this.idfase, n_idgen_actividad: this.idactividad }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.get_tabla();

      });
    } else {
      this.openSnackBar("Seleccione una fase y actividad", 99);
    }
  }
  configuracion(item): void {
    const dialogRef = this.dialog.open(TareaconfigComponent, {
      width: '850px',
      maxHeight: '650px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      this.get_tabla();

    });

  }
  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      maxHeight: '650px',
      data: { titulo: "¿Desea eliminar la tarea " + item.c_descripcion + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
       this.eliminar_tarea(item);
      }
    });

  }
  eliminar_tarea(tarea){
    console.log(tarea);
    this._tarea_service.delete_tarea(tarea, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.get_tabla();
            this.openSnackBar("Registro eliminado", 200);
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

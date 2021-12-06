import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings'
import { Router } from "@angular/router";
import { BaseComponent } from '../../base/base.component';
import { Confirmar } from '../../../interface/confirmar.interface';
import { TareaService } from '../../../service/tarea.service';
import { ActividadeditComponent } from '../actividadedit/actividadedit.component';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css'],
  providers: [TareaService]
})
export class ActividadComponent extends BaseComponent implements OnInit {
  textfilter = '';
  displayedColumns: string[] = ['editar', 'c_nombre','c_descripcion', 'eliminar'];
  public tabla: MatTableDataSource<any>;
  public confirmar: Confirmar;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  fases = [];
  idfase = 0;
  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _tarea_service: TareaService,
    public dialog: MatDialog
  ) {
    super(snackBar, router);
  }

  ngOnInit() {
    this.getFase();
    this.get_tabla();
  }

  selectFase(idfase) {
    this.idfase = idfase;
    this.get_tabla();
  }


  applyFilter(filterValue: String) {
    this.tabla.filter = filterValue.trim().toLowerCase();
  }
  get_tabla() {
    let req = { n_idgen_fase: this.idfase }
    this._tarea_service.get_actividad(req, this.getToken().token).subscribe(
      result => {
        try {
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
  openDialog(item): void {
    console.log(item)
    const dialogRef = this.dialog.open(ActividadeditComponent, {
      width: '850px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      this.get_tabla();

    });
  }

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar la fase " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.eliminar_actividad(item);
      }
    });

  }
  eliminar_actividad(actividad) {
    this._tarea_service.delete_actividad(actividad, this.getToken().token).subscribe(
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

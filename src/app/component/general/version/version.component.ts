import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings'
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../base/base.component';
import { Confirmar } from '../../../interface/confirmar.interface';
import { ProgramaService } from '../../../service/programa.service';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { ProgramaComponent } from '../programa/programa.component';
import { VersioneditComponent } from '../versionedit/versionedit.component';
import { TareaService } from '../../../service/tarea.service';
@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css'],
  providers: [ProgramaService, TareaService]
})
export class VersionComponent extends BaseComponent implements OnInit {
  n_idgen_proyecto = "";
  displayedColumns: string[] = ['editar', 'n_version', 'c_descripcion','c_fase', 'conf', 'eliminar'];
  public tabla: MatTableDataSource<any>;
  public confirmar: Confirmar;
  public textfilter = '';
  public fases = [];
  public n_idgen_fase= 0;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _programa_service: ProgramaService,
    public dialog: MatDialog,
    private _Activatedroute: ActivatedRoute,
    private _tarea_service: TareaService,
  ) {
    super(snackBar, router);
  }

  ngOnInit() {
    this.n_idgen_proyecto = this._Activatedroute.snapshot.paramMap.get("n_idgen_proyecto");
    this.getFase();
    this.get();
  }

  selectFase(id){
    this.n_idgen_fase = id;
    this.get();
  }

  get() {
    let rq = {
      n_idgen_proyecto: this.n_idgen_proyecto,
      n_idgen_fase: this.n_idgen_fase
    }

    this._programa_service.getversion(rq).subscribe(
      result => {
        try {
          if (result.estado) {
            console.log(result);
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
        this.openSnackBar(error.stack, 99);
      });
  }

  applyFilter(filterValue: String) {
    this.tabla.filter = filterValue.trim().toLowerCase();
  }


  openDialog(item): void {
    if (item == null) {
      item = {
        n_idgen_version: 0,
        n_idgen_proyecto: this.n_idgen_proyecto,
        c_descripcion: "",
        n_version: 0,
        n_idgen_fase: 0,
      }
    }
    console.log(item);
    const dialogRef = this.dialog.open(VersioneditComponent, {
      width: '750px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      this.get();
    });
  }

  programa(item): void {
    const dialogRef = this.dialog.open(ProgramaComponent, {
      width: '800px',
      maxHeight: '650px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getFase() {
    this._tarea_service.get_fase(this.getToken().token).subscribe(
      result => {
        try {
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

  
  delete(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el versión " + item.c_descripcion + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.eliminar(item);
      }
    });
  }

  eliminar(item){
    this._programa_service.deleteversion(item).subscribe(
      result => {
        try {
          if (result.estado) {
            this.get();
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

}


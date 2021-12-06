import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings'
import { Router } from "@angular/router";
import { BaseComponent } from '../../base/base.component';
import { Confirmar } from '../../../interface/confirmar.interface';
import { ProgramaService } from '../../../service/programa.service';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.css'],
  providers: [ProgramaService]
})
export class ProgramaComponent extends BaseComponent implements OnInit {
  n_idgen_version: number = 0;
  n_idgen_proyecto: number = 0;
  n_idgen_fase: number = 0;
  n_idgen_versioncopy = 0;

  programas = [];
  versiones = [];

  textfilter = '';
  displayedColumns: string[] = ['editar', 'n_orden', 'n_mes', 'n_anio', 'n_monto', 'eliminar'];

  public tabla: MatTableDataSource<any>;
  public confirmar: Confirmar;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _programa_service: ProgramaService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProgramaComponent>
  ) {
    super(snackBar, router);
  }

  ngOnInit() {

    this.n_idgen_version = this.data.n_idgen_version;
    this.n_idgen_proyecto = this.data.n_idgen_proyecto;
    this.n_idgen_fase = this.data.n_idgen_fase;
    console.log("get data programa");
    console.log(this.data);
    this.getversion();
    this.get();
  }

  selectVersionCopy(id) {
    this.n_idgen_versioncopy = id;
  }


  getversion() {
    let rq = {
      n_idgen_proyecto: this.n_idgen_proyecto,
      n_idgen_fase: this.n_idgen_fase
    }

    this._programa_service.getversion(rq).subscribe(
      result => {
        try {
          if (result.estado) {
            console.log(result);
            this.versiones = result.data;
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



  get() {
    let rq = {
      n_idgen_version: this.n_idgen_version
    };
    this._programa_service.getprograma(rq).subscribe(
      result => {
        console.log(result);
        try {
          if (result.estado) {
            this.programas = result.data;
            this.cargarTabla();
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

  applyFilter(filterValue: String) {
    this.tabla.filter = filterValue.trim().toLowerCase();
  }

  addRow() {
    let obj = {
      b_nuevo: true,
      n_idgen_programa: 0,
      n_idgen_version: this.n_idgen_version,
      n_orden: "",
      n_mes: "",
      n_anio: "",
      n_monto: ""
    }
    this.programas.push(obj);
    this.cargarTabla();
  }

  cargarTabla() {
    this.tabla = new MatTableDataSource<any>(this.programas);
    this.tabla.sort = this.sort;
    this.tabla.paginator = this.paginator;
  }

  saveprograma(item) {
    console.log("guardando")
    console.log(item)

    this._programa_service.saveprograma(item).subscribe(
      result => {
        console.log(result);
        try {
          if (result.estado) {
            this.cargarTabla();
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

  copiar() {
    let rq = {
      n_idgen_version: this.n_idgen_version,
      n_idgen_versioncopy: this.n_idgen_versioncopy
    }
    this._programa_service.copiar(rq).subscribe(
      result => {
        console.log(result);
        try {
          if (result.estado) {
            this.get();
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

  
  delete(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el programa " + item.n_orden + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteprograma(item);
      }
    });
  }

  deleteprograma(item) {
    this._programa_service.deleteprograma(item).subscribe(
      result => {
        console.log(result);
        try {
          if (result.estado) {
            this.get();
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
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings'
import { Router } from "@angular/router";

import { BaseComponent } from '../../base/base.component';

import { ResultadoApi } from '../../../interface/common.interface';
import { Confirmar } from '../../../interface/confirmar.interface';

import { BolsaProyectoService } from '../../../service/bolsaproyecto.service';
import { GeneralService } from '../../../service/general.service';

import { ResetearclaveComponent } from '../../generico/resetarclave/resetarclave.component';
import { ConfirmarComponent } from '../../generico/confirmar/confirmar.component';
import { BolsaproyectoeditComponent } from '../bolsaproyectoedit/bolsaproyectoedit.component';
import { UbigeoService } from '../../../service/ubigeo.service';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { ExcelFormatService } from '../../../service/excelformat.service';

@Component({
  selector: 'app-bolsaproyecto',
  templateUrl: './bolsaproyecto.component.html',
  styleUrls: ['./bolsaproyecto.component.css'],
  providers: [BolsaProyectoService, UbigeoService]
})
export class BolsaproyectoComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['editar', 'num', 'c_nombre', 'c_cui', 'n_numerominem', 'n_annioprograma', 'c_areaasignada', 'c_estado', 'config'];
  public tabla: MatTableDataSource<any>;
  public confirmar: Confirmar;
  public textfilter = '';

  departamentos = [];
  provincias = [];
  distritos = [];
  annios = [];

  iddepartamento: number = 0;
  idprovincia: number = 0;
  iddistrito: number = 0;
  annio: number = 0;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private _excel_service: ExcelFormatService,
    public snackBar: MatSnackBar,
    public router: Router,
    public _bolsa_service: BolsaProyectoService,
    private _ubigeo_service: UbigeoService,
    public dialog: MatDialog
  ) {
    super(snackBar, router);
  }

  ngOnInit() {
    this.getDepartamento();
    this.getAnnio();
    this.get();
  }

  selectDepartamento(id) {
    this.iddepartamento = id;
    this.getProvincia();
    this.get();
  }

  selectProvincia(id) {
    this.idprovincia = id;
    this.getDistrito();
    this.get();
  }

  selectDistrito(id) {
    this.iddistrito = id;
    this.get();
  }

  selectAnnio(id) {
    this.annio = id;
    this.get();
  }

  get() {
    let req = {
      n_idgen_departamento: this.iddepartamento,
      n_idgen_provincia: this.idprovincia,
      n_idgen_distrito: this.iddistrito,
      n_annio: this.annio
    };

    this._bolsa_service.get(req, this.getToken().token).subscribe(
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

  getDepartamento() {
    this._bolsa_service.getdepartamento({}, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
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
    this._bolsa_service.getprovincia({ n_idgen_departamento: this.iddepartamento }, this.getToken().token).subscribe(
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
    this._bolsa_service.getdistrito({ n_idgen_provincia: this.idprovincia, n_idgen_departamento: this.iddepartamento }, this.getToken().token).subscribe(
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

  getAnnio() {
    this._bolsa_service.getannio({}, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.annios = result.data
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

  openDialog(item): void {
    console.log(item);
    const dialogRef = this.dialog.open(BolsaproyectoeditComponent, {
      width: '1200px',
      maxHeight: '650px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      this.get();
    });
  }

  crearproyecto(item) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Está seguro de Transferir el Proyecto al formulario de Seguimiento?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._bolsa_service.crearproyecto(item).subscribe(
          result => {
            try {
              if (result.estado) {
                this.get();
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
    });
  }

  delete(item) {
    console.log(item)

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar la bolsa de proyecto?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._bolsa_service.delete(item, this.getToken().token).subscribe(
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
    });
  }

  generaralldatabolsadetalle_x_id(item) {
    let req = {
      n_idgen_departamento: this.iddepartamento,
      n_idgen_provincia: this.idprovincia,
      n_idgen_distrito: this.iddistrito,
      n_idgen_bolsaproyecto: item.n_idgen_bolsaproyecto,
      n_annio: this.annio
    }

    this._bolsa_service.get_exportbolsadetalle(req).subscribe(
      result => {
        if (result.estado) {
          const detalles = result.data;
          console.log(detalles);
          this._excel_service.generarallbolsadetalle(detalles);
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

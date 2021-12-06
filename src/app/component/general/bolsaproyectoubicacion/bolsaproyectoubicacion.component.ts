import { Component, Inject, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';
import { UbigeoService } from '../../../service/ubigeo.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { BolsaProyectoService } from '../../../service/bolsaproyecto.service';

@Component({
  selector: 'app-bolsaproyectoubicacion',
  templateUrl: './bolsaproyectoubicacion.component.html',
  styleUrls: ['./bolsaproyectoubicacion.component.css'],
  providers: [UbigeoService, BolsaProyectoService]
})
export class BolsaproyectoubicacionComponent extends BaseComponent implements OnInit {
  @Input() bolsaproyecto: any;
  displayedColumns: string[] = ['check', 'c_departamento', 'c_provincia', 'c_distrito'];
  public tabla: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  textfilter = '';

  ubicaciones = [];

  departamentos = [];
  provincias = [];
  distritos = [];

  iddepartamento = 0;
  idprovincia = 0;
  iddistrito = 0;
  idestado = 0;

  ubigeos = [];
  ubigeo1 = "";
  ubigeo2 = "";
  ubigeo3 = "";
  numdist = 0;
  bloqueado = false;

  constructor(
    private _ubigeo_service: UbigeoService,
    private _bolsa_proyecto: BolsaProyectoService,
    public _router: Router,
    public snackBar: MatSnackBar,
    private changeDetectorRefs: ChangeDetectorRef) {
    super(snackBar, _router);
  }

  ngOnInit() {
    this.bloqueado = false;
    this.get_departamento();
    this.get_tabla();
    this.getUbigeoBolsaProyecto();
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

  selectEstado(id) {
    this.idestado = id;
    this.get_tabla();
  }

  get_departamento() {
    this._bolsa_proyecto.getdepartamento({}, this.getToken().token).subscribe(
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

  get_provincia() {
    this._bolsa_proyecto.getprovincia({ n_idgen_departamento: this.iddepartamento }, this.getToken().token).subscribe(
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

  get_distrito() {
    this._bolsa_proyecto.getdistrito({ n_idgen_provincia: this.idprovincia, n_idgen_departamento: this.iddepartamento }, this.getToken().token).subscribe(
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

  get_tabla() {
    this.refresh();
    let req = {
      n_idgen_bolsaproyecto: this.bolsaproyecto.n_idgen_bolsaproyecto,
      n_idgen_departamento: this.iddepartamento,
      n_idgen_provincia: this.idprovincia,
      n_idgen_distrito: this.iddistrito
    };

    this._bolsa_proyecto.getubigeobolsa(req, this.getToken().token).subscribe(
      result => {
        try {
          console.log(result)
          if (result.estado) {
            this.ubicaciones = result.data;
            this.tabla = new MatTableDataSource<any>(this.ubicaciones);
            this.tabla.sort = this.sort;
            this.tabla.paginator = this.paginator;

            if (this.bloqueado == false) {
              this.numdist = this.ubicaciones.filter(o => o.b_asignado == true).length;
              console.log(this.numdist);
              this.bloqueado = true;
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
  applyFilter(filterValue: String) {
    this.tabla.filter = filterValue.trim().toLowerCase();
  }


  guardarcheck(element) {

    let req = {
      n_idgen_bolsaproyecto: this.bolsaproyecto.n_idgen_bolsaproyecto,
      n_idgen_distrito: element.n_idgen_distrito,
      n_idgen_bolsadistrito: element.n_idgen_bolsadistrito
    };

    this._bolsa_proyecto.saveubigeobolsa(req, this.getToken().token).subscribe(
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

  changetabubigeo(faseubigeo) {
    console.log(faseubigeo)
    this.get_tabla();
  }

  refresh() {
    this.ubicaciones = [];
    this.tabla = new MatTableDataSource<any>(this.ubicaciones);
    this.tabla.sort = this.sort;
    this.tabla.paginator = this.paginator;
  }

  getUbigeoBolsaProyecto() {
    let rq = {
      n_idgen_bolsaproyecto: this.bolsaproyecto.n_idgen_bolsaproyecto
    };
    this._bolsa_proyecto.getUbigeoBolsaProyecto(rq, this.getToken().token).subscribe(
      result => {
        ;
        if (result.estado) {
          this.ubigeos = result.data;

          this.ubigeo1 = this.ubigeos.filter(o => o.n_fila == 1)[0].c_ubigeo;
          this.ubigeo2 = this.ubigeos.filter(o => o.n_fila == 2)[0].c_ubigeo;
          this.ubigeo3 = this.ubigeos.filter(o => o.n_fila == 3)[0].c_ubigeo;

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

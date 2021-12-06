import { Component, Inject, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';
import { BolsaProyectoService } from '../../../service/bolsaproyecto.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ConfirmComponent } from '../../general/confirm/confirm.component';

@Component({
  selector: 'app-bolsaproyectodetalle',
  templateUrl: './bolsaproyectodetalle.component.html',
  styleUrls: ['./bolsaproyectodetalle.component.css']
})
export class BolsaproyectodetalleComponent extends BaseComponent implements OnInit {

  @Input() bolsaproyecto: any;
  displayedColumns: string[] = ['editar', 'n_annioprograma', 'c_areaasignada', 'n_costoinversion', 'c_observaciones', 'eliminar'];
  public tabla: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  textfilter = '';

  detallebolsa = [];
  editdetalle = false;
  enablededit = false;

  detallebolsaedit = {
    n_idgen_bolsadetalle: 0,
    n_idgen_bolsaproyecto: 0,
    n_annioprograma: 0,
    c_areaasignada: "",
    n_costoinversion: 0,
    c_observaciones: "",
    n_montoprogramadoannio: 0,
    n_montoejecutadoannio: 0,
    n_diferenciatotal: 0,
    n_presupuestoinicial: 0,
    n_montoprogene: 0,
    n_montoprogfeb: 0,
    n_montoprogmar: 0,
    n_montoprogabr: 0,
    n_montoprogmay: 0,
    n_montoprogjun: 0,
    n_montoprogjul: 0,
    n_montoprogago: 0,
    n_montoprogset: 0,
    n_montoprogoct: 0,
    n_montoprognov: 0,
    n_montoprogdic: 0,
    n_montoejecene: 0,
    n_montoejecfeb: 0,
    n_montoejecmar: 0,
    n_montoejecabr: 0,
    n_montoejecmay: 0,
    n_montoejecjun: 0,
    n_montoejecjul: 0,
    n_montoejecago: 0,
    n_montoejecset: 0,
    n_montoejecoct: 0,
    n_montoejecnov: 0,
    n_montoejecdic: 0,
    n_montoreprene: 0,
    n_montoreprfeb: 0,
    n_montoreprmar: 0,
    n_montoreprabr: 0,
    n_montoreprmay: 0,
    n_montoreprjun: 0,
    n_montoreprjul: 0,
    n_montoreprago: 0,
    n_montoreprset: 0,
    n_montoreproct: 0,
    n_montoreprnov: 0,
    n_montoreprdic: 0
  };

  constructor(private _bolsaproyecto_service: BolsaProyectoService,
    public _router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) {
    super(snackBar, _router);
  }

  ngOnInit() {
    this.getDetalleBolsa()
  }

  getDetalleBolsa() {
    this.refresh();
    let req = {
      n_idgen_bolsaproyecto: this.bolsaproyecto.n_idgen_bolsaproyecto
    };
    console.log("Tabla Bolsa Detalle")
    console.log(req)

    this._bolsaproyecto_service.getdetalle(req, this.getToken().token).subscribe(
      result => {
        try {
          console.log(result)
          if (result.estado) {
            this.detallebolsa = result.data;
            this.tabla = new MatTableDataSource<any>(this.detallebolsa);
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
        this.openSnackBar(error.error, 99);
      });
  }

  applyFilter(filterValue: String) {
    this.tabla.filter = filterValue.trim().toLowerCase();
  }

  refresh() {
    this.detallebolsa = [];
    this.tabla = new MatTableDataSource<any>(this.detallebolsa);
    this.tabla.sort = this.sort;
    this.tabla.paginator = this.paginator;
  }

  adddetalle(item) {
    this.editdetalle = true;

    if (item) {
      this.detallebolsaedit = {
        n_idgen_bolsadetalle: item.n_idgen_bolsadetalle,
        n_idgen_bolsaproyecto: this.bolsaproyecto.n_idgen_bolsaproyecto,
        n_annioprograma: item.n_annioprograma,
        c_areaasignada: item.c_areaasignada,
        n_costoinversion: item.n_costoinversion,
        c_observaciones: item.c_observaciones,
        n_montoprogramadoannio: item.n_montoprogramadoannio,
        n_montoejecutadoannio: item.n_montoejecutadoannio,
        n_diferenciatotal: item.n_diferenciatotal,
        n_presupuestoinicial: item.n_presupuestoinicial,
        
        n_montoprogene: item.n_montoprogene,
        n_montoprogfeb: item.n_montoprogfeb,
        n_montoprogmar: item.n_montoprogmar,
        n_montoprogabr: item.n_montoprogabr,
        n_montoprogmay: item.n_montoprogmay,
        n_montoprogjun: item.n_montoprogjun,
        n_montoprogjul: item.n_montoprogjul,
        n_montoprogago: item.n_montoprogago,
        n_montoprogset: item.n_montoprogset,
        n_montoprogoct: item.n_montoprogoct,
        n_montoprognov: item.n_montoprognov,
        n_montoprogdic: item.n_montoprogdic,
        n_montoejecene: item.n_montoejecene,
        n_montoejecfeb: item.n_montoejecfeb,
        n_montoejecmar: item.n_montoejecmar,
        n_montoejecabr: item.n_montoejecabr,
        n_montoejecmay: item.n_montoejecmay,
        n_montoejecjun: item.n_montoejecjun,
        n_montoejecjul: item.n_montoejecjul,
        n_montoejecago: item.n_montoejecago,
        n_montoejecset: item.n_montoejecset,
        n_montoejecoct: item.n_montoejecoct,
        n_montoejecnov: item.n_montoejecnov,
        n_montoejecdic: item.n_montoejecdic,
        n_montoreprene: item.n_montoreprene,
        n_montoreprfeb: item.n_montoreprfeb,
        n_montoreprmar: item.n_montoreprmar,
        n_montoreprabr: item.n_montoreprabr,
        n_montoreprmay: item.n_montoreprmay,
        n_montoreprjun: item.n_montoreprjun,
        n_montoreprjul: item.n_montoreprjul,
        n_montoreprago: item.n_montoreprago,
        n_montoreprset: item.n_montoreprset,
        n_montoreproct: item.n_montoreproct,
        n_montoreprnov: item.n_montoreprnov,
        n_montoreprdic: item.n_montoreprdic
      };
      this.enablededit = true;
    } else {
      this.detallebolsaedit = {
        n_idgen_bolsadetalle: 0,
        n_idgen_bolsaproyecto: this.bolsaproyecto.n_idgen_bolsaproyecto,
        n_annioprograma: 0,
        c_areaasignada: "",
        n_costoinversion: 0,
        c_observaciones: "",
        n_montoprogramadoannio: 0,
        n_montoejecutadoannio: 0,
        n_diferenciatotal: 0,
        n_presupuestoinicial: 0,
        n_montoprogene: 0,
        n_montoprogfeb: 0,
        n_montoprogmar: 0,
        n_montoprogabr: 0,
        n_montoprogmay: 0,
        n_montoprogjun: 0,
        n_montoprogjul: 0,
        n_montoprogago: 0,
        n_montoprogset: 0,
        n_montoprogoct: 0,
        n_montoprognov: 0,
        n_montoprogdic: 0,
        n_montoejecene: 0,
        n_montoejecfeb: 0,
        n_montoejecmar: 0,
        n_montoejecabr: 0,
        n_montoejecmay: 0,
        n_montoejecjun: 0,
        n_montoejecjul: 0,
        n_montoejecago: 0,
        n_montoejecset: 0,
        n_montoejecoct: 0,
        n_montoejecnov: 0,
        n_montoejecdic: 0,
        n_montoreprene: 0,
        n_montoreprfeb: 0,
        n_montoreprmar: 0,
        n_montoreprabr: 0,
        n_montoreprmay: 0,
        n_montoreprjun: 0,
        n_montoreprjul: 0,
        n_montoreprago: 0,
        n_montoreprset: 0,
        n_montoreproct: 0,
        n_montoreprnov: 0,
        n_montoreprdic: 0
      };
      this.enablededit = false;
    }
    console.log(this.detallebolsaedit);
  }

  canceldetalle() {
    this.editdetalle = false;
  }

  guardardetalle() {
    console.log(this.detallebolsaedit)
    this._bolsaproyecto_service.savedetalle(this.detallebolsaedit, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getDetalleBolsa();
            this.editdetalle = false;
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

  deletedetalle(item) {
    console.log(item)

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el detalle ?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._bolsaproyecto_service.deletedetalle(item, this.getToken().token).subscribe(
          result => {
            try {
              if (result.estado) {
                this.getDetalleBolsa();
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
}

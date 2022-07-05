import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { Confirmar } from 'src/app/interface/confirmar.interface';
import { confGeneralService } from 'src/app/service/confGeneral.service';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { BaseComponent } from '../../base/base.component';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { VersiondetalleeditarComponent } from '../versiondetalleeditar/versiondetalleeditar.component';

@Component({
  selector: 'app-versiondetalle',
  templateUrl: './versiondetalle.component.html',
  styleUrls: ['./versiondetalle.component.css'],
  providers: [confGeneralService, SeguridadService]
})
export class VersiondetalleComponent extends BaseComponent implements OnInit {

  pantallaRol= [];
  permisoEdit: boolean = false;
  textfilter = '';  
  n_idv_cabecera = '';
  cabecera = ''

  displayedColumns: string[] = ['editar','c_detalle', 'eliminar'];
  public tablaTipoLinea: MatTableDataSource<any>;
  public confirmar: Confirmar;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _confiGeneral_service: confGeneralService,
    public _seguridad_service: SeguridadService,
    private _Activatedroute: ActivatedRoute, 
    public dialog: MatDialog
  ) { 
    super(snackBar, router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    this.getPantallaRol();
    this.n_idv_cabecera = this._Activatedroute.snapshot.paramMap.get("n_idv_cabecera");
    this.cabecera = this._Activatedroute.snapshot.paramMap.get("c_cabecera");
    console.log(this.n_idv_cabecera);
    
    this.getDetalleVersion();
  }

  getDetalleVersion(){
    let request = {
      n_idv_cabecera: this.n_idv_cabecera,
    }
    this._confiGeneral_service.getDetalleVersion(request,this.getToken().token).subscribe(
      result => {                
        console.log(result);
        this.tablaTipoLinea = new MatTableDataSource<any>(result.data);
        this.tablaTipoLinea.sort = this.sort;
        this.tablaTipoLinea.paginator = this.paginator;
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }

  openDialog(detalle_version): void {
    
    console.log(detalle_version);
    
    const dialogRef = this.dialog.open(VersiondetalleeditarComponent, {
      width: '750px',
      data: { detalle_version, n_idv_cabecera: this.n_idv_cabecera, cabecera: this.cabecera }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {
        this.getDetalleVersion();

      } catch (error) {
        console.log(error);
        this.getDetalleVersion();
      }
    });
  }

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el detalle " + item.c_detalle + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteDetalleVersion(item);
      }
    });
  }

  deleteDetalleVersion(item) {
    
    let request = {
      n_idv_detalle: item.n_idv_detalle,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    this._confiGeneral_service.deleteDetalleVersion(request).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getDetalleVersion();
            this.openSnackBar("Versión Eliminado", 200);
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  applyFilter(filterValue: String) {
    this.tablaTipoLinea.filter = filterValue.trim().toLowerCase();
  }

  getPantallaRol() {
    let request = {
      n_idseg_userprofile: this.usuarioLog.n_idseg_userprofile
    }
    this._seguridad_service.getPantallaRol(request, this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          this.pantallaRol = resultado.data;
          this.pantallaRol.forEach(element => {            
            if(element.c_codigo === 'ma-adtil'){
              console.log(element);
              console.log(element.c_codigo);
              if(element.c_permiso === 'MO'){
                this.permisoEdit = true;
              }
            }
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

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { Confirmar } from 'src/app/interface/confirmar.interface';
import { confGeneralService } from 'src/app/service/confGeneral.service';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { BaseComponent } from '../../base/base.component';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { VersioneditarComponent } from '../versioneditar/versioneditar.component';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css'],
  providers: [confGeneralService, SeguridadService]
})
export class VersionComponent extends BaseComponent implements OnInit {

  pantallaRol= [];
  permisoEdit: boolean = false;
  textfilter = '';  

  displayedColumns: string[] = ['editar','c_nombre', 'c_fecha', 'detalle','eliminar'];
  public tablaTipoLinea: MatTableDataSource<any>;
  public confirmar: Confirmar;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _confiGeneral_service: confGeneralService,
    public _seguridad_service: SeguridadService,

    public dialog: MatDialog
  ) { 
    super(snackBar, router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    this.getPantallaRol();
    this.getVersion();
  }
  getVersion(){

    this._confiGeneral_service.getVersion(this.getToken().token).subscribe(
      result => {                
        console.log(result);
        this.tablaTipoLinea = new MatTableDataSource<any>(result.data);
        this.tablaTipoLinea.sort = this.sort;
        this.tablaTipoLinea.paginator = this.paginator;
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }

  applyFilter(filterValue: String) {
    this.tablaTipoLinea.filter = filterValue.trim().toLowerCase();
  }

  openDialog(version): void {
    const dialogRef = this.dialog.open(VersioneditarComponent, {
      width: '750px',
      data: { version }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {
        this.getVersion();

      } catch (error) {
        console.log(error);
        this.getVersion();
      }
    });
  }

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar la version " + item.c_cabecera + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteVersion(item);
      }
    });
  }

  deleteVersion(item) {
    
    let request = {
      n_idv_cabecera: item.n_idv_cabecera,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    this._confiGeneral_service.deleteVersion(request).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getVersion();
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

  showDetalle(element): void {    
    this.router.navigate(["/detalle_version/"+element.n_idv_cabecera+"/"+element.c_cabecera]);
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
            if(element.c_codigo === 've-adver'){
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

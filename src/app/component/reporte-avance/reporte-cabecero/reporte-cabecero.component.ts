import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { Confirmar } from 'src/app/interface/confirmar.interface';
import { Reporte } from 'src/app/interface/reporte.interface';
import { confGeneralService } from 'src/app/service/confGeneral.service';
import { ReporteService } from 'src/app/service/reporte.service';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { BaseComponent } from '../../base/base.component';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { ConfigReporteAvanceComponent } from '../config-reporte-avance/config-reporte-avance.component';
import { ReporteAvanceComponent } from '../reporte-avance/reporte-avance.component';
import { ReporteCabeceroEditarComponent } from '../reporte-cabecero-editar/reporte-cabecero-editar.component';

@Component({
  selector: 'app-reporte-cabecero',
  templateUrl: './reporte-cabecero.component.html',
  styleUrls: ['./reporte-cabecero.component.css'],
  providers: [confGeneralService, SeguridadService, ReporteService]
})
export class ReporteCabeceroComponent extends BaseComponent implements OnInit {
  pantallaRol= [];
  permisoEdit: boolean = false;
  displayedColumns: string[] = ['eliminar','insertar-editar','detalle','anio','mes','zona','fecha', 'config'];


  public CabeceroReporte: MatTableDataSource<any>;
  public confirmar: Confirmar;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _confiGeneral_service: confGeneralService,
    public _seguridad_service: SeguridadService,
    public reporteService: ReporteService,
    public dialog: MatDialog,
  ) { 

    super(snackBar, router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    this.getPantallaRol();
    this.getCabeceroReporte();
  }

   //OBTENER REPORTES
   getCabeceroReporte() {  
    let request = {
      n_idpl_tipolinea: this.proyecto.n_idpro_proyecto      
    }
    this.reporteService.getReporteCabecero(request,this.getToken().token).subscribe(
      result => {                
        this.CabeceroReporte = new MatTableDataSource<any>(result.data);
        this.CabeceroReporte.sort = this.sort;
        this.CabeceroReporte.paginator = this.paginator;
      }, error => {
        this.openSnackBar(error.error, 99);
      });
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

  openDialog(item): void {
    const dialogRef = this.dialog.open(ReporteAvanceComponent, {
      width: '80%',
      data: { item }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {
        this.getCabeceroReporte();

      } catch (error) {
        console.log(error);
        this.getCabeceroReporte();
      }
    });
  }

  openEdit(item){
    const dialogRef = this.dialog.open(ReporteCabeceroEditarComponent, {
      width: '80%',
      data: { item }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {
        this.getCabeceroReporte();

      } catch (error) {
        console.log(error);
        this.getCabeceroReporte();
      }
    });
  }

  delete(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar reporte de " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        console.log('Eliminando..');
        this.deleteTipoEmpresa(item);
      }
    });
  }

  deleteTipoEmpresa(item) {
    let request = {
      n_idctrl_cabecerareporteavance: item.n_idctrl_cabecerareporteavance,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    this.reporteService.deleteReporteCabecero(request).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getCabeceroReporte();
            this.openSnackBar("Reporte eliminado", 200);
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

  openConfig(item){
    const dialogRef = this.dialog.open(ConfigReporteAvanceComponent, {
      width: '80%',
      data: { item }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {
        this.getCabeceroReporte();

      } catch (error) {
        console.log(error);
        this.getCabeceroReporte();
      }
    });
  }

}

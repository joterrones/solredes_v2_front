import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base/base.component';
import { MatDialog, MatDialogRef, MatPaginator, MatSnackBar, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { confGeneralService } from 'src/app/service/confGeneral.service';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { ReporteService } from 'src/app/service/reporte.service';
import { Confirmar } from 'src/app/interface/confirmar.interface';
import { AppSettings } from 'src/app/common/appsettings';
import { ConfirmComponent } from '../../general/confirm/confirm.component';

@Component({
  selector: 'app-config-reporte-avance',
  templateUrl: './config-reporte-avance.component.html',
  styleUrls: ['./config-reporte-avance.component.css'],
  providers: [confGeneralService, SeguridadService, ReporteService]
})
export class ConfigReporteAvanceComponent extends BaseComponent implements OnInit {

  public Reportes: MatTableDataSource<any>;
  public confirmar: Confirmar;
  displayedColumns: string[] = [
    "seccion",
    "poste",
    "metradoc",
    "metrador",
    "llegadoo",
    "cantidadesp",
    "editar",
    "eliminar"
  ];

  id: number;

  reporte : any ={
    n_idctrl_reporteavance:0,
    c_tipo:'',
    n_metrado_contractual:0,
    n_metrado_replanteo: 0,
    n_llegado_obra: 0,
    n_cantidadesposteizado:0, 
    c_seccion: '',
    n_id_usermodi: 0,
    n_idctrl_cabeceroreporteavance : this.data.item.n_idctrl_cabecerareporteavance
  }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(
    public dialogRef: MatDialogRef<ConfigReporteAvanceComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    public _confiGeneral_service: confGeneralService,
    public router: Router,
    public reporteService: ReporteService
  ) { 

    super(snackBar, router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    this.id = this.data.item.n_idctrl_cabecerareporteavance;
    this.getReportes();
    console.log(this.reporte);
  }

  getReportes() {
    let request = {
      n_idpl_tipolinea: this.id,
    };
    this.reporteService.getReporte(request, this.getToken().token).subscribe(
      (result) => {
        this.Reportes = new MatTableDataSource<any>(result.data);
        this.Reportes.sort = this.sort;
        this.Reportes.paginator = this.paginator;
      },
      (error) => {
        this.openSnackBar(error.error, 99);
      }
    );
  }

  limpiar(){
    //this.reporte.n_idctrl_cabeceroreporteavance = 0
    this.reporte.c_tipo = ''
    this.reporte.n_metrado_contractual = 0
    this.reporte.n_metrado_replanteo = 0
    this.reporte.n_llegado_obra = 0
    this.reporte.n_cantidadesposteizado = 0
    this.reporte.c_seccion = ''
    this.reporte.n_idctrl_reporteavance = 0
    console.log('data limpiada: ',this.reporte);
    
  }

  editar(item){
    this.reporte.n_idctrl_reporteavance = item.n_idctrl_reporteavance,
    this.reporte.c_tipo = item.c_tipo;
    this.reporte.n_metrado_contractual = item.n_metrado_contractual;
    this.reporte.n_metrado_replanteo = item.n_metrado_replanteo;
    this.reporte.n_llegado_obra = item.n_llegado_obra;
    this.reporte.n_cantidadesposteizado = item.n_cantidadesposteizado;
    this.reporte.c_seccion = item.c_seccion;
    console.log('data para editar: ',this.reporte);
  }

  guardar(newForm){
    console.log('Guardando ...',this.reporte);
    this.saveReporteCabecero();
  }

  saveReporteCabecero(){
    this.reporte.n_id_usermodi= this.usuarioLog.n_idseg_userprofile;
    this.reporteService.saveReporte(this.reporte, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            //this.dialogRef.close({ flag: true, data: this.reporte });
            this.limpiar()
            this.getReportes()
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


  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar de la seccion " + item.c_seccion + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        console.log('Eliminando..');
        this.deleteReporte(item);
      }
    });
  }

  deleteReporte(item) {
    let request = {
      n_idctrl_reporteavance: item.n_idctrl_reporteavance,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    this.reporteService.deleteReporte(request).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getReportes();
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

}

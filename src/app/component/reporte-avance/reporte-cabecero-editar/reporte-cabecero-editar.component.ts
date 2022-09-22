import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MatSort, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { Reporte } from 'src/app/interface/reporte.interface';
import { confGeneralService } from 'src/app/service/confGeneral.service';
import { ReporteService } from 'src/app/service/reporte.service';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-reporte-cabecero-editar',
  templateUrl: './reporte-cabecero-editar.component.html',
  styleUrls: ['./reporte-cabecero-editar.component.css'],
  providers: [confGeneralService, SeguridadService, ReporteService],
})
export class ReporteCabeceroEditarComponent extends BaseComponent implements OnInit {

  zonas :[];
  periodos:[];
  fechaInicio = ''

  reporte : Reporte
  editar: boolean;
  cabecero: any ={
    n_idgen_periodo: 0,
    n_idgen_zona: 0, 
    c_nombre: '' ,
    d_fechacorte: new Date,
    n_id_usermodi: 0,
    n_id_n_idctrl_cabecerareporteavance:0
  };

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<ReporteCabeceroEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    public _router: Router,
    private _confiGeneral_service: confGeneralService,
    public _seguridad_service: SeguridadService,
    public dialog: MatDialog,
    public reporteService: ReporteService,
  ) {
    super(snackBar, _router);
   }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    if (this.data.item == null) {
      console.log("guardando");
      this.editar = false;
      this.cabecero = {
        n_idgen_periodo: 0,
        n_idgen_zona: 0,
        c_nombre: '' ,
        d_fechacorte: Date,
        n_id_usermodi: 0,
        n_idctrl_cabecerareporteavance:0              
      };      
    } else {
      this.editar = true;
      this.cabecero = this.data.item;
      console.log("editando");
      console.log('data: ',this.data.item)    
    } 
    this.getPeriodos()
    this.getZonasProyecto()
  }

  getZonasProyecto() {  
    let request = {
      n_idpl_tipolinea: this.proyecto.n_idpro_proyecto      
    }
    this.reporteService.getZonasProyectos(request,this.getToken().token).subscribe(
      result => {                
        console.log(result.data, 'dato de zonas');
        this.zonas = result.data
      }, error => {
        this.openSnackBar(error.error, 99);
      });
      console.log('zonas: ',this.zonas);
  }

  getPeriodos() {  
    let request = {
      n_idpl_tipolinea: this.proyecto.n_idpro_proyecto      
    }
    this.reporteService.getPeriodos(request,this.getToken().token).subscribe(
      result => {                
        console.log(result.data, 'dato de periodos');
        this.periodos = result.data
      }, error => {
        this.openSnackBar(error.error, 99);
      });
      console.log('zonas: ',this.periodos);
  }

  guardar(newForm){
    console.log('Guardando ...',this.cabecero);
    this.saveReporteCabecero();
  }

  saveReporteCabecero(){
    this.cabecero.n_id_usermodi= this.usuarioLog.n_idseg_userprofile;
    this.reporteService.saveReporteCabecero(this.cabecero, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.cabecero });
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

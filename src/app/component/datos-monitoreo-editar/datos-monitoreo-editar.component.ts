import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { confGeneralService } from 'src/app/service/confGeneral.service';
import { MapaService } from 'src/app/service/mapa.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-datos-monitoreo-editar',
  templateUrl: './datos-monitoreo-editar.component.html',
  styleUrls: ['./datos-monitoreo-editar.component.css'],
  providers: [MapaService]
})
export class DatosMonitoreoEditarComponent extends BaseComponent implements OnInit {
  
  editar: boolean;
  inspeccion;
  lineas: [];
  zonas:[];
  tipolineas:[];

  obs=[]
  genobs = [];
  constructor(
    public dialogRef: MatDialogRef<DatosMonitoreoEditarComponent>,    
    public _mapa_service: MapaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _router: Router,
    public snackBar: MatSnackBar) {
      super(snackBar, _router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    
    if (this.data.inspeccion == null) {
      this.editar = false;
      this.inspeccion = {
        n_idmon_inspeccion: 0,
        n_idpl_zona: 0,
        n_idpl_linea: 0,
        n_idpl_tipolinea: 0,
        c_codigo: "",
        c_latitud: "",
        c_longitud: "",
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile
      };
      
    } else {
      this.editar = true;
      this.inspeccion = this.data.inspeccion; 
    } 
    this.tipolineas = this.data.tipolineas;  
    this.zonas = this.data.zonas;  
    this.lineas = this.data.lineas
    console.log('Contenido de inspeccion');
    console.log(this.inspeccion);

    this.getObservaciones();
  }

  getObservaciones(){
    let request ={
      n_idmon_inspeccion: this.inspeccion.n_idmon_inspeccion
    }
    this._mapa_service.getObservaciones(request, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            console.log(result.data);
            this.obs = result.data.observaciones
            this.genobs = result.data.genObservaciones
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

  guardar(newForm) {
    let request = {
      n_idmon_inspeccion: this.inspeccion.n_idmon_inspeccion,
      c_codigo: this.inspeccion.c_codigo,
      n_idpl_linea: this.inspeccion.n_idpl_linea,
      n_idpl_tipolinea: this.inspeccion.n_idpl_tipolinea,
      n_idpl_zona: this.inspeccion.n_idpl_zona,
      c_latitud: this.inspeccion.c_latitud,
      c_longitud: this.inspeccion.c_longitud,
      n_idseg_userprofile: this.usuarioLog.n_idseg_userprofile
    }

    console.log(request);
    
    this._mapa_service.saveMon(request, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.inspeccion });
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

  onSelectChange(item){
    let request = {      
      n_idmon_inspeccion: item.n_idmon_inspeccion,
      n_idmon_inspecciondetalle: item.n_idmon_inspecciondetalle,
      c_observacion: item.c_observacion,
      n_idseg_userprofile: this.usuarioLog.n_idseg_userprofile
    }
    console.log(request);
    
    this._mapa_service.saveObservacion(request, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.openSnackBar("Observación guardada", 99);
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

  onSelectChange2(item){
    let request = {}
    if (item.n_idmon_inspeccionobservacion) {
      request = {      
        n_idmon_inspeccionobservacion: item.n_idmon_inspeccionobservacion,
        n_idmon_inspecciondetalle: item.n_idmon_inspecciondetalle,
        n_idgen_observacion: item.n_idgen_observacion,
        n_idseg_userprofile: this.usuarioLog.n_idseg_userprofile
      }
    }else{
      request = {      
        n_idmon_inspeccionobservacion: 0,
        n_idmon_inspecciondetalle: item.n_idmon_inspecciondetalle,
        n_idgen_observacion: item.n_idgen_observacion,
        n_idseg_userprofile: this.usuarioLog.n_idseg_userprofile
      }
    }
    console.log(request);
    this._mapa_service.saveGenObservacion(request, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.openSnackBar("Observación guardada", 99);
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

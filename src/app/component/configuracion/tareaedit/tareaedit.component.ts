import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';
import { ResultadoApi } from '../../../interface/common.interface';
import { TareaService } from '../../../service/tarea.service';
import { ProyectoInterface } from '../../../interface/proyecto.interface';

@Component({
  selector: 'app-tareaedit',
  templateUrl: './tareaedit.component.html',
  styleUrls: ['./tareaedit.component.css'],
  providers: [TareaService]
})
export class TareaeditComponent extends BaseComponent implements OnInit {
  tarea: any;
  actividades = [];
  idactividad = 0;
  tareas = [];
  idtareas = 0;
  feriados = [{ n_id_aplica: 1, c_valor: 'Si' }, { n_id_aplica: 2, c_valor: 'No' }];
  n_id_aplica = 2;
  n_hitocontrol = 2;

  constructor(public dialogRef: MatDialogRef<TareaeditComponent>,
    private _tarea_service: TareaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _router: Router,
    public snackBar: MatSnackBar) {
    super(snackBar, _router);
  }

  ngOnInit() {
    this.tarea = this.data.item;
    console.log(this.tarea)
    if (this.tarea == null) {
      this.tarea = {
        n_idgen_tarea: 0,
        c_descripcion: ""
      }
    }
    this.tarea.n_idgen_fase = this.data.n_idgen_fase;
    this.tarea.n_idgen_actividad = this.data.n_idgen_actividad;
    if (this.tarea.b_diasferiados != null) {
      if (this.tarea.b_diasferiados == true) {
        this.n_id_aplica = 1;
      } else {
        this.n_id_aplica = 2;
      }
    } else {
      this.n_id_aplica = 2;
    }

    if (this.tarea.b_hitocontrol != null) {
      if (this.tarea.b_hitocontrol == true) {
        this.n_hitocontrol = 1;
      } else {
        this.n_hitocontrol = 2;
      }
    } else {
      this.n_hitocontrol = 2;
    }


    this.getActividad();
    this.getPredecesoras();
  }
  getPredecesoras() {

    let req = { n_idgen_actividad: -1 }
    this._tarea_service.get_tarea(req, this.getToken().token).subscribe(
      result => {

        try {
          if (result.estado) {
            this.tareas = result.data
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

  getActividad() {
    let req = { n_idgen_fase: this.tarea.n_idgen_fase }
    this._tarea_service.get_actividad(req, this.getToken().token).subscribe(
      result => {

        try {
          if (result.estado) {
            this.actividades = result.data
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

  guardar(newForm) {
    console.log("guardar tarea");
    
    console.log(this.n_id_aplica);
    if(this.n_id_aplica==1){
      this.tarea.b_diasferiados = true;
    }else{
      this.tarea.b_diasferiados = false;
    }

    if(this.n_hitocontrol==1){
      this.tarea.b_hitocontrol = true;
    }else{
      this.tarea.b_hitocontrol = false;
    }

    
    
    console.log(this.tarea);
    this._tarea_service.save_tarea(this.tarea, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.tarea });
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

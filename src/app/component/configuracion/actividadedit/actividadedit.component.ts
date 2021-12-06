import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';
import { ResultadoApi} from '../../../interface/common.interface';
import { TareaService } from '../../../service/tarea.service';
import {ProyectoInterface} from '../../../interface/proyecto.interface';
@Component({
  selector: 'app-actividadedit',
  templateUrl: './actividadedit.component.html',
  styleUrls: ['./actividadedit.component.css'],
  providers:[TareaService]
})
export class ActividadeditComponent  extends BaseComponent implements OnInit{
  actividad:any;
  fases=[];
  idfase = 0;

  constructor(public dialogRef: MatDialogRef<ActividadeditComponent>,
    private _tarea_service: TareaService,
    @Inject(MAT_DIALOG_DATA) public data: ProyectoInterface,
    public _router: Router,
    public snackBar: MatSnackBar) {
    super(snackBar, _router);
  }

  ngOnInit() {
    this.getFase();
    this.actividad = this.data;
    if (this.actividad == null) {
      this.actividad = {
        n_idgen_actividad: 0,
        n_idgen_fase:0,
        c_nombre: '',
     
      }
    }
    console.log(this.actividad)
  }
  selectFase(idfase){
    this.idfase=idfase;
  }
  getFase() {

    this._tarea_service.get_fase(this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
           this.fases=result.data
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
    this._tarea_service.save_actividad(this.actividad, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.actividad });
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

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';
import { ResultadoApi} from '../../../interface/common.interface';
import { TareaService } from '../../../service/tarea.service';
import {ProyectoInterface} from '../../../interface/proyecto.interface';
@Component({
  selector: 'app-faseedit',
  templateUrl: './faseedit.component.html',
  styleUrls: ['./faseedit.component.css'],
  providers:[TareaService]
})
export class FaseeditComponent  extends BaseComponent implements OnInit{
  fase:any;

  constructor(public dialogRef: MatDialogRef<FaseeditComponent>,
    private _tarea_service: TareaService,
    @Inject(MAT_DIALOG_DATA) public data: ProyectoInterface,
    public _router: Router,
    public snackBar: MatSnackBar) {
    super(snackBar, _router);
  }

  ngOnInit() {
  
    this.fase = this.data;
    if (this.fase == null) {
      this.fase = {
        n_idgen_fase: 0,
        c_nombre: '',
     
      }
    }
    console.log(this.fase)
  }

  guardar(newForm) {
    this._tarea_service.save_fase(this.fase, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.fase });
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

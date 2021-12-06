import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';
import { ResultadoApi} from '../../../interface/common.interface';
import { TipoProyectoService } from '../../../service/tipoproyecto.service';
import {ProyectoInterface} from '../../../interface/proyecto.interface';
@Component({
  selector: 'app-tipoproyectoedit',
  templateUrl: './tipoproyectoedit.component.html',
  styleUrls: ['./tipoproyectoedit.component.css'],
  providers:[TipoProyectoService]
})
export class TipoproyectoeditComponent  extends BaseComponent implements OnInit{
  tipoproyecto:any;

  constructor(public dialogRef: MatDialogRef<TipoproyectoeditComponent>,
    private _tipo_proyecto_service: TipoProyectoService,
    @Inject(MAT_DIALOG_DATA) public data: ProyectoInterface,
    public _router: Router,
    public snackBar: MatSnackBar) {
    super(snackBar, _router);
  }

  ngOnInit() {
  
    this.tipoproyecto = this.data;
    if (this.tipoproyecto == null) {
      this.tipoproyecto = {
        n_idgen_tipoproyecto: 0,
        c_nombre: '',
     
      }
    }
    console.log(this.tipoproyecto)
  }

  guardar(newForm) {
    this._tipo_proyecto_service.save(this.tipoproyecto, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.tipoproyecto });
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

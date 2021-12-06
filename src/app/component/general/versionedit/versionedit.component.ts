import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';
import {ProgramaService} from '../../../service/programa.service';
import { TareaService } from '../../../service/tarea.service';
@Component({
  selector: 'app-versionedit',
  templateUrl: './versionedit.component.html',
  styleUrls: ['./versionedit.component.css'],
  providers:[ProgramaService,TareaService]
})
export class VersioneditComponent  extends BaseComponent implements OnInit {
  item: any;
  editar: boolean;
  fases=[];


  constructor(public dialogRef: MatDialogRef<VersioneditComponent>,
    private _programa_service: ProgramaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _router: Router,
    public snackBar: MatSnackBar,
    private _tarea_service:TareaService) {
    super(snackBar, _router);
  }

  ngOnInit() {
    if (this.data.n_idgen_version == 0) {
      this.editar = false;
    } else {
      this.editar = true;
    }
    this.item=this.data;
    this.getFase();
  }

  getFase() {
    this._tarea_service.get_fase(this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            console.log(result);
           this.fases=result.data;
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
    this._programa_service.save(this.item).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.item });
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

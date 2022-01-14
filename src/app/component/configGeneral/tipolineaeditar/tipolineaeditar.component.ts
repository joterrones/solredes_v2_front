import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { Tipolinea, EditarTipoLinea } from '../../../interface/configGeneral.interface';

import { confGeneralService } from '../../../service/confGeneral.service';


@Component({
  selector: 'app-tipolineaeditar',
  templateUrl: './tipolineaeditar.component.html',
  styleUrls: ['./tipolineaeditar.component.css'],
  providers: [confGeneralService]
})
export class TipolineaeditarComponent extends BaseComponent implements OnInit {

  tipolinea: Tipolinea;  
  editar: boolean;
  
  constructor(
    
    public dialogRef: MatDialogRef<TipolineaeditarComponent>,
    private _configGeneralservice: confGeneralService,    
    @Inject(MAT_DIALOG_DATA) public data: EditarTipoLinea,
    public _router: Router,
    public snackBar: MatSnackBar

  ) { 
    super(snackBar, _router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    if (this.data.tipolinea == null) {
      this.editar = false;
      this.tipolinea = {
        n_idpl_tipolinea:0,
        c_nombre:'',         
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile
      };      
    } else {
      this.editar = true;
      this.tipolinea = this.data.tipolinea;      
    }    
    console.log('Contenido de empresa');
    console.log(this.data.tipolinea);
  }

  guardar(newForm) {
    this.tipolinea.n_id_usermodi = this.usuarioLog.n_idseg_userprofile;
    this._configGeneralservice.saveTipoLinea(this.tipolinea, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.tipolinea });
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

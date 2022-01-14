import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { EditarTipoFoto, TipoFoto } from '../../../interface/configGeneral.interface';

import { confGeneralService } from '../../../service/confGeneral.service';


@Component({
  selector: 'app-tipofotoeditar',
  templateUrl: './tipofotoeditar.component.html',
  styleUrls: ['./tipofotoeditar.component.css'],
  providers: [confGeneralService]
})
export class TipofotoeditarComponent extends BaseComponent implements OnInit {

  tipofoto: TipoFoto;  
  editar: boolean;
  //roles: Roleditar;
  constructor(
    
    public dialogRef: MatDialogRef<TipofotoeditarComponent>,
    private _configGeneralservice: confGeneralService,    
    @Inject(MAT_DIALOG_DATA) public data: EditarTipoFoto,
    public _router: Router,
    public snackBar: MatSnackBar

  ) { 
    super(snackBar, _router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    if (this.data.tipofoto == null) {
      this.editar = false;
      this.tipofoto = {
        n_idgen_tipofoto:0,
        c_nombre:'',
        c_codigo:'',
        n_tipo:'',        
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile        
      };      
    } else {
      this.editar = true;
      this.tipofoto = this.data.tipofoto;      
    }    
    console.log('Contenido de tipo foto');
    console.log(this.data.tipofoto);
  }

  guardar(newForm) {
    this.tipofoto.n_id_usermodi= this.usuarioLog.n_idseg_userprofile;
    this._configGeneralservice.saveTipoFoto(this.tipofoto, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.tipofoto });
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

import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { EditarTipoEmpresa, TipoEmpresa } from '../../../interface/configGeneral.interface';

import { confGeneralService } from '../../../service/confGeneral.service';

@Component({
  selector: 'app-tipoempresaeditar',
  templateUrl: './tipoempresaeditar.component.html',
  styleUrls: ['./tipoempresaeditar.component.css'],
  providers: [confGeneralService]
})
export class TipoempresaeditarComponent extends BaseComponent implements OnInit {

  tipoempresa: TipoEmpresa;  
  editar: boolean;
  
  constructor(
    
    public dialogRef: MatDialogRef<TipoempresaeditarComponent>,
    private _configGeneralservice: confGeneralService,    
    @Inject(MAT_DIALOG_DATA) public data: EditarTipoEmpresa,
    public _router: Router,
    public snackBar: MatSnackBar    

  ){ 
    super(snackBar, _router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    if (this.data.tipoempresa == null) {
      this.editar = false;
      this.tipoempresa = {
        n_idgen_tipoempresa:0,
        c_nombre:'',        
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile              
      };      
    } else {
      this.editar = true;
      this.tipoempresa = this.data.tipoempresa;      
    }    
    console.log('Contenido de proyecto');
    console.log(this.data.tipoempresa);
  }
  
  guardar(newForm) {
    this.tipoempresa.n_id_usermodi= this.usuarioLog.n_idseg_userprofile;
    this._configGeneralservice.saveTipoEmpresa(this.tipoempresa, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.tipoempresa });
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

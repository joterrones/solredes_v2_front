import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { EditarTipoElemento, TipoElemento } from '../../../interface/configGeneral.interface';

import { confGeneralService } from '../../../service/confGeneral.service';

@Component({
  selector: 'app-tipoelementoeditar',
  templateUrl: './tipoelementoeditar.component.html',
  styleUrls: ['./tipoelementoeditar.component.css'],
  providers: [confGeneralService]
})
export class TipoelementoeditarComponent extends BaseComponent implements OnInit {

  tipoelemento: TipoElemento;  
  editar: boolean;
  
  constructor(
    
    public dialogRef: MatDialogRef<TipoelementoeditarComponent>,
    private _configGeneralservice: confGeneralService,    
    @Inject(MAT_DIALOG_DATA) public data: EditarTipoElemento,
    public _router: Router,
    public snackBar: MatSnackBar    

  ){ 
    super(snackBar, _router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    if (this.data.tipoelemento == null) {
      this.editar = false;
      this.tipoelemento = {
        n_idpl_tipoelemento:0,
        c_codigo:'',
        c_nombre:'',  
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile            
      };      
    } else {
      this.editar = true;
      this.tipoelemento = this.data.tipoelemento;      
    }    
    console.log('Contenido de tipo elemento');
    console.log(this.data.tipoelemento);
  }
  
  guardar(newForm) {
    this.tipoelemento.n_id_usermodi= this.usuarioLog.n_idseg_userprofile;
    this._configGeneralservice.saveTipoElemento(this.tipoelemento, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.tipoelemento });
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

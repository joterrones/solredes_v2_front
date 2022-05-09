import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { EditarTipoMontaje, TipoMontaje } from '../../../interface/configGeneral.interface';

import { confGeneralService } from '../../../service/confGeneral.service';

@Component({
  selector: 'app-categoriatipomontajeeditar',
  templateUrl: './categoriatipomontajeeditar.component.html',
  styleUrls: ['./categoriatipomontajeeditar.component.css'],
  providers: [confGeneralService]
})
export class CategoriatipomontajeeditarComponent extends BaseComponent implements OnInit {

  tipomontaje: TipoMontaje;  
  editar: boolean;
  
  constructor(
    
    public dialogRef: MatDialogRef<CategoriatipomontajeeditarComponent>,
    private _configGeneralservice: confGeneralService,    
    @Inject(MAT_DIALOG_DATA) public data: EditarTipoMontaje,
    public _router: Router,
    public snackBar: MatSnackBar    

  ){ 
    super(snackBar, _router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    if (this.data.tipomontaje == null) {
      this.editar = false;
      this.tipomontaje = {
        n_idmon_categoriatipomontaje:0,
        c_codigo:'',
        c_nombre:'',        
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile,
        n_idpro_proyecto: this.proyecto.n_idpro_proyecto              
      };      
    } else {
      this.editar = true;
      this.tipomontaje = this.data.tipomontaje;      
    }    
    console.log('Contenido de tipo montaje');
    console.log(this.data.tipomontaje);
  }
  
  guardar(newForm) {
    let val;
    let val2;
    console.log(this.tipomontaje.c_codigo);
    val = (this.tipomontaje.c_codigo).toString().split('_');

    if ( val[1] ) {
      val2 = parseInt(val[1]);
      if ( !isNaN(val2) ) {
        this.tipomontaje.n_id_usermodi= this.usuarioLog.n_idseg_userprofile;
        this._configGeneralservice.saveCateTipoMontaje(this.tipomontaje, this.getToken().token).subscribe(
          result => {
            try {
              if (result.estado) {
                this.dialogRef.close({ flag: true, data: this.tipomontaje });
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
      }else{
        this.openSnackBar("Código invalido", 200);
      }
    }else{
      this.openSnackBar("Código invalido", 200);
    }
  }

}

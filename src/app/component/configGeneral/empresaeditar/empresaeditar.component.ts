import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { Empresa, EmpresaEditar } from '../../../interface/configGeneral.interface';

import { confGeneralService } from '../../../service/confGeneral.service';


@Component({
  selector: 'app-empresaeditar',
  templateUrl: './empresaeditar.component.html',
  styleUrls: ['./empresaeditar.component.css'],
  providers: [confGeneralService]
})
export class EmpresaeditarComponent extends BaseComponent implements OnInit {
  empresa: Empresa;  
  editar: boolean;
  //roles: Roleditar;
  constructor(
    
    public dialogRef: MatDialogRef<EmpresaeditarComponent>,
    private _configGeneralservice: confGeneralService,    
    @Inject(MAT_DIALOG_DATA) public data: EmpresaEditar,
    public _router: Router,
    public snackBar: MatSnackBar

  ) { 
    super(snackBar, _router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    if (this.data.empresa == null) {
      this.editar = false;
      this.empresa = {
        n_idgen_empresa:0,
        c_nombrecorto:'',
        c_ruc:'',
        c_razonsocial:'',  
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile      
      };      
    } else {
      this.editar = true;
      this.empresa = this.data.empresa;      
    }    
    console.log('Contenido de empresa');
    console.log(this.data.empresa);
  }

  guardar(newForm) {
    this.empresa.n_id_usermodi= this.usuarioLog.n_idseg_userprofile;
    console.log(this.empresa);
    
    this._configGeneralservice.saveEmpresa(this.empresa, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.empresa });
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

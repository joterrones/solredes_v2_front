import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { confGeneralService } from '../../../service/confGeneral.service';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { TraGrupos } from 'src/app/interface/configGeneral.interface';

@Component({
  selector: 'app-lineausuario',
  templateUrl: './lineausuario.component.html',
  styleUrls: ['./lineausuario.component.css'],
  providers: [confGeneralService]
})
export class LineausuarioComponent extends BaseComponent implements OnInit {

  lineaUser: [];

  constructor(
    public dialogAsigPro: MatDialogRef<LineausuarioComponent>,
    private _confiGeneral_service: confGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: TraGrupos,
    public _router: Router,
    public snackBar: MatSnackBar
    ){
    super(snackBar, _router);
    }

  ngOnInit() {
    this.getLineaUser();
  }


  getLineaUser(){
    console.log(this.data.n_idtra_grupo);
    let request = {
      n_idtra_grupo: this.data.n_idtra_grupo
    }
    this._confiGeneral_service.getLineaUser(request,this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          console.log("ProUser",resultado.data);
          this.lineaUser = resultado.data;
        } else {
          this.openSnackBar(resultado.mensaje, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  resetLineaUser(){
    let request = {
      n_idtra_grupo: this.data.n_idtra_grupo
    }
    console.log(this.data.n_idtra_grupo);
    
    this._confiGeneral_service.resetLineaUser(request,this.getToken().token).subscribe(
      result => {
        if (result.estado) {
          this.dialogAsigPro.close({ flag: true });
        } else {
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  
  guardar(newForm) {
    if(this.lineaUser.length){
      this.resetLineaUser();
    }
    console.log(newForm);
    console.log(this.data.n_idtra_grupo);
    console.log(this.lineaUser.length);
    
    for(let i = 0; i < newForm.length; i++ ){
      let request  ={ 
        n_idtra_grupo: this.data.n_idtra_grupo,
        n_idpl_linea: newForm[i]
      }
      console.log("Envio datos lineaUser",request);
      
      this._confiGeneral_service.saveLineaUser(request, this.getToken().token).subscribe(
        result => {
          try {
            if (result.estado) {
              this.dialogAsigPro.close({ flag: true });
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

}

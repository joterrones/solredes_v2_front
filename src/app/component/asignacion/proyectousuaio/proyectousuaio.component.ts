import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { confGeneralService } from '../../../service/confGeneral.service';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { TraGrupos } from 'src/app/interface/configGeneral.interface';

@Component({
  selector: 'app-proyectousuaio',
  templateUrl: './proyectousuaio.component.html',
  styleUrls: ['./proyectousuaio.component.css'],
  providers: [confGeneralService]
})
export class ProyectousuaioComponent extends BaseComponent implements OnInit {
  
  ProUser: [];

  constructor(
    public dialogAsigPro: MatDialogRef<ProyectousuaioComponent>,
    private _confiGeneral_service: confGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: TraGrupos,
    public _router: Router,
    public snackBar: MatSnackBar
    ){
    super(snackBar, _router);
    }

  ngOnInit() {
    this.getProUser();
  }


  getProUser(){
    console.log(this.data.n_idtra_grupo);
    let request = {
      n_idtra_grupo: this.data.n_idtra_grupo
    }
    this._confiGeneral_service.getProUser(request,this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          console.log("ProUser",resultado.data);
          this.ProUser = resultado.data;
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

  resetProUser(){
    let request = {
      n_idtra_grupo: this.data.n_idtra_grupo
    }
    console.log(this.data.n_idtra_grupo);
    
    this._confiGeneral_service.resetProUser(request,this.getToken().token).subscribe(
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
    if(this.ProUser.length){
      this.resetProUser();
    }
    console.log(newForm);
    console.log(this.data.n_idtra_grupo);
    console.log(this.ProUser.length);
    
    for(let i = 0; i < newForm.length; i++ ){
      let request  ={ 
        n_idtra_grupo: this.data.n_idtra_grupo,
        n_idseg_userprofile: newForm[i]
      }
      console.log("Envio datos ProUser",request);
      
      this._confiGeneral_service.saveProUser(request, this.getToken().token).subscribe(
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

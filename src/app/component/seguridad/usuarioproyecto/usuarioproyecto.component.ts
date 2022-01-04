import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { UsuarioEditar } from '../../../interface/seguridad.interface';
import { SeguridadService } from '../../../service/seguridad.service';
import { ResultadoApi } from 'src/app/interface/common.interface';


@Component({
  selector: 'app-usuarioproyecto',
  templateUrl: './usuarioproyecto.component.html',
  styleUrls: ['./usuarioproyecto.component.css'],
  providers: [SeguridadService]
})
export class UsuarioproyectoComponent extends BaseComponent implements OnInit {
  titulo: String;
  proyectos: [];
  UserPro: [];

  constructor(
    public dialogAsigPro: MatDialogRef<UsuarioproyectoComponent>,
    private _seguridad_service: SeguridadService,
    @Inject(MAT_DIALOG_DATA) public data: UsuarioEditar,
    public _router: Router,
    public snackBar: MatSnackBar
    ){
    super(snackBar, _router);
    }

  ngOnInit() {
    console.log("PRUEBA DIALOG");
    
    this.getUserPro();
  }


  getUserPro(){
    let request = {
      n_idseg_userprofile: this.data.usuario.n_idseg_userprofile
    }
    this._seguridad_service.getUserPro(request,this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          console.log("UserPro",resultado.data);
          this.UserPro = resultado.data;
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

  resetUserPro(){
    let request = {
      n_idseg_userprofile: this.data.usuario.n_idseg_userprofile
    }
    this._seguridad_service.resetUserPro(request,this.getToken().token).subscribe(
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
    if(this.UserPro.length){
      this.resetUserPro();
    }
    console.log(newForm);
    console.log(this.data.usuario.n_idseg_userprofile);
    console.log(this.UserPro.length);
    
    for(let i = 0; i < newForm.length; i++ ){
      let request  ={ 
        n_idseg_userprofile: this.data.usuario.n_idseg_userprofile,
        n_idpro_proyecto: newForm[i]
      }
      console.log("Envio datos UserPro",request);
      
      this._seguridad_service.saveUserPro(request, this.getToken().token).subscribe(
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

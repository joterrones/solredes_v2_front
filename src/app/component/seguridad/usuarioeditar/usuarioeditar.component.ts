import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { Usuario, UsuarioEditar, Role } from '../../../interface/seguridad.interface';
import { SeguridadService } from '../../../service/seguridad.service';
import { GeneralService } from '../../../service/general.service';

@Component({
  selector: 'app-usuarioeditar',
  templateUrl: './usuarioeditar.component.html',
  styleUrls: ['./usuarioeditar.component.css'],
  providers: [SeguridadService,GeneralService]
})
export class UsuarioeditarComponent extends BaseComponent implements OnInit {
  usuario: Usuario;
  editar: boolean;
  roles: Role[];

  constructor(
    public dialogRef: MatDialogRef<UsuarioeditarComponent>,
    private _seguridadservice: SeguridadService,
    @Inject(MAT_DIALOG_DATA) public data: UsuarioEditar,
    public _router: Router,
    public snackBar: MatSnackBar) {
    super(snackBar, _router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    if (this.data.usuario == null) {
      this.editar = false;
      this.usuario = {
        n_idseg_userprofile: 0,
        c_username: "",
        c_nombre1: "",
        c_nombre2: "",
        c_appaterno: "",
        c_apmaterno:"",
        c_dni: "",
        c_reclave: "",
        c_clave: "",
        n_idseg_rol: 0,
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile
      };
    } else {
      this.editar = true;
      this.usuario = this.data.usuario;
      this.usuario.c_clave = "0000000";
      this.usuario.c_reclave = "0000000";
      
    }
    this.roles = this.data.roles;
    console.log('Contenido de usuario');
    console.log(this.usuario);
  }

  guardar(newForm) {
    console.log(this.editar);
    
    if(!this.editar){
      this.usuario;
      this._seguridadservice.valDni(this.usuario).subscribe(
      result => {
        try {
          console.log(result.data);          
          if (result.data.length == 0) {
            this.guardarUser(newForm);             
          } else {
            this.openSnackBar(result.mensaje, 200); 
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
      this.guardarUser(newForm); 
    }
    
  }

  guardarUser(newForm) {
    console.log(this.usuarioLog.n_idseg_userprofile);    
    this.usuario.n_id_usermodi = this.usuarioLog.n_idseg_userprofile;
    this._seguridadservice.saveUser(this.usuario, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.usuario });
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

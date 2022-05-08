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
  array: any;

  usernameVal;
  dniVal;
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

      this.dniVal = this.data.usuario.c_dni
      this.usernameVal = this.data.usuario.c_username
      
      this.usuario.c_clave = "0000000";
      this.usuario.c_reclave = "0000000";
      
    }
    this.roles = this.data.roles;
    console.log('Contenido de usuario');
    console.log(this.usuario);
    this.validarDatos();
  }

  validarDatos(){
    this._seguridadservice.validarDatos(this.getToken().token).subscribe(
      result =>{
        try {
          console.log(result.data);
                    
          this.array = result.data;    
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

  guardar(newForm) {
    console.log(this.usuario);

    if(!this.editar){

      let userExist = 0;
      let dniExist = 0;
      
      this.array.forEach(element => {
        if(element.c_username == this.usuario.c_username){
          userExist += 1;
        }else{
          if(element.c_dni == this.usuario.c_dni){
            dniExist += 1;
          }
        }
      });

      if(userExist == 0 && dniExist == 0){
        this.guardarUser(newForm); 
      }else if( userExist != 0){
        this.openSnackBar("El usuario existe", 200);
      }else if( dniExist != 0 ){
        this.openSnackBar("El DNI existe", 200);
      }

    }else{
      let u = 0;
      let d = 0;
      if( this.usernameVal != this.usuario.c_username || this.dniVal != this.usuario.c_dni ){
        if(this.usernameVal != this.usuario.c_username){
          this.array.forEach(element => {
            if(element.c_username == this.usuario.c_username){
              u += 1;
            }
          });
        }
        if(this.dniVal != this.usuario.c_dni){
          this.array.forEach(element => {
            if(element.c_dni == this.usuario.c_dni){
              d += 1;
            }
          });
        }
        
        if( u != 0){
          this.openSnackBar("El usuario existe", 200);
        }else if( d != 0 ){
          this.openSnackBar("El DNI existe", 200);
        }else{
          this.guardarUser(newForm); 
        }

      }else{
        this.guardarUser(newForm); 
      }
      
    }
    
  }

  guardarUser(newForm) {
    console.log(this.usuarioLog.n_idseg_userprofile);  
    let request = {
      c_username : this.usuario.c_username,
      c_clave : this.usuario.c_clave,
      c_nombre1 : this.usuario.c_nombre1,
      c_nombre2 : this.usuario.c_nombre2,
      c_appaterno : this.usuario.c_appaterno,
      c_apmaterno : this.usuario.c_apmaterno,
      c_dni : this.usuario.c_dni,
      n_idseg_userprofile : this.usuario.n_idseg_userprofile,
      n_idseg_rol : this.usuario.n_idseg_rol,
      n_id_usermodi : this.usuarioLog.n_idseg_userprofile,
      n_idpro_proyecto : this.proyecto.n_idpro_proyecto
    }
    //this.usuario.n_id_usermodi = this.usuarioLog.n_idseg_userprofile;    
    this._seguridadservice.saveUser(request, this.getToken().token).subscribe(
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

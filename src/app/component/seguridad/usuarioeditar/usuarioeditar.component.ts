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

    if (this.data.usuario == null) {
      this.editar = false;
      this.usuario = {
        n_idseg_userprofile: 0,
        c_username: "",
        c_nombre1: "",
        c_appaterno: "",
        c_dni: "",
        c_reclave: "",
        c_clave: "",
        n_idseg_rol: 0
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
    this.usuario;
    this._seguridadservice.save(this.usuario, this.getToken().token).subscribe(
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

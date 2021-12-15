import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { Role, Roleditar } from '../../../interface/seguridad.interface';

import { SeguridadService } from '../../../service/seguridad.service';
import { GeneralService } from '../../../service/general.service';


@Component({
  selector: 'app-roleditar',
  templateUrl: './roleditar.component.html',
  styleUrls: ['./roleditar.component.css'],
  providers: [SeguridadService,GeneralService]
})
export class RoleditarComponent extends BaseComponent implements OnInit {
  rol: Role;
  editar: boolean;
  //roles: Roleditar;
  constructor(
    public dialogRef: MatDialogRef<RoleditarComponent>,
    private _seguridadservice: SeguridadService,
    private _generalservice: GeneralService,
    @Inject(MAT_DIALOG_DATA) public data: Roleditar,
    public _router: Router,
    public snackBar: MatSnackBar
  ) { 
    super(snackBar, _router);
  }

  ngOnInit() {
    if (this.data.rol == null) {
      this.editar = false;
      this.rol = {
        n_idseg_rol:0,
        c_nombre:'',
        n_nivel:''        
      };      
    } else {
      this.editar = true;
      this.rol = this.data.rol;      
    }    
    console.log('Contenido de usuario');
    console.log(this.rol);
  }

  guardar(newForm) {
    this.rol;
    this._seguridadservice.saveRol(this.rol, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.rol });
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

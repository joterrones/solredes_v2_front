import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { Almacen, AlmacenEditar, Proyecto } from '../../../interface/almacen.interface';
import { AlmacenService } from 'src/app/service/almacen.service';

@Component({
  selector: 'app-almaceneditar',
  templateUrl: './almaceneditar.component.html',
  styleUrls: ['./almaceneditar.component.css'],
  providers: [AlmacenService]
})
export class AlmaceneditarComponent extends BaseComponent implements OnInit {

  almacen: Almacen;
  editar: boolean;
  proyectos: Proyecto[];

  constructor(
    public dialogRef: MatDialogRef<AlmaceneditarComponent>,    
    public _almacen_service: AlmacenService,
    @Inject(MAT_DIALOG_DATA) public data: AlmacenEditar,
    public _router: Router,
    public snackBar: MatSnackBar) {
      super(snackBar, _router);
  }

  ngOnInit() {    
    this.usuarioLog = this.getUser().data;
    if (this.data.almacen == null) {
      this.editar = false;
      this.almacen = {
        n_idalm_almacen: 0,
        c_nombre: "",
        c_direccion: "",
        n_idpro_proyecto: this.proyecto.n_idpro_proyecto,    
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile
      };
      
    } else {
      this.editar = true;
      this.almacen = this.data.almacen; 
    }
    this.proyectos = this.data.proyectos;    
    console.log('Contenido de almacen');
    console.log(this.almacen);
  }

  guardar(newForm) {
    this.almacen.n_id_usermodi= this.usuarioLog.n_idseg_userprofile;
    this._almacen_service.saveAlmacen(this.almacen, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.almacen });
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

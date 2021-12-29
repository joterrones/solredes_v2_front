import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';


import { ArchivosServices } from 'src/app/service/archivos.service';
import { Carpeta, CarpetaEditar } from 'src/app/interface/archivos.interface';


@Component({
  selector: 'app-admi-archivos-editar',
  templateUrl: './admi-archivos-editar.component.html',
  styleUrls: ['./admi-archivos-editar.component.css'],
  providers: [ArchivosServices]
})
export class AdmiArchivosEditarComponent extends BaseComponent implements OnInit {

  carpeta: Carpeta;
  editar: boolean;

  constructor(
    public dialogRef: MatDialogRef<AdmiArchivosEditarComponent>,    
    public _archivos_service: ArchivosServices,  
    @Inject(MAT_DIALOG_DATA) public data: CarpetaEditar,
    public _router: Router,
    public snackBar: MatSnackBar) {
      super(snackBar, _router);
  }

  ngOnInit() {

    if (this.data.carpeta == null) {
      this.editar = false;
      this.carpeta = {
        id_carpeta: 0,
        c_nombre: "",
        d_fechamodi: ""
      };
      
    } else {
      this.editar = true;
      this.carpeta = this.data.carpeta; 
    }
    console.log(this.carpeta);
  }

  guardar(newForm) {
    this.carpeta;
    this._archivos_service.saveCarpeta(this.carpeta, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.carpeta });
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

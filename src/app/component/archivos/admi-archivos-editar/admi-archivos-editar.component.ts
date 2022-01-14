import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';


import { ArchivosServices } from 'src/app/service/archivos.service';
import { Archivo, ArchivoEditar} from 'src/app/interface/archivos.interface';


@Component({
  selector: 'app-admi-archivos-editar',
  templateUrl: './admi-archivos-editar.component.html',
  styleUrls: ['./admi-archivos-editar.component.css'],
  providers: [ArchivosServices]
})
export class AdmiArchivosEditarComponent extends BaseComponent implements OnInit {

  archivo: Archivo;
  editar: boolean;
  carpetas: [];
  constructor(
    public dialogRef: MatDialogRef<AdmiArchivosEditarComponent>,    
    public _archivos_service: ArchivosServices,  
    @Inject(MAT_DIALOG_DATA) public data: ArchivoEditar,
    public _router: Router,
    public snackBar: MatSnackBar) {
      super(snackBar, _router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    this.getCarpetas();
    if (this.data.archivo == null) {
      this.editar = false;
      this.archivo = {
        n_iddoc_archivo: 0,
        n_idpro_proyecto: this.proyecto.n_idpro_proyecto,    
        c_nombre: "",
        c_ruta: "",
        c_rutalogica: "",
        c_checksum: "",
        c_tipo: "1",
        n_iddoc_archivopadre: this.data.n_iddoc_archivopadre,
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile
      };
      
    } else {
      this.editar = true;
      this.archivo = this.data.archivo; 
    }
    console.log(this.archivo);

  }

  getCarpetas(){    
    this._archivos_service.getCarpetas(this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {     
            console.log(result.data)
            this.carpetas = result.data;           
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          console.log(error)
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }

  guardar(newForm) {
    this.archivo.n_id_usermodi= this.usuarioLog.n_idseg_userprofile;
    this._archivos_service.saveArchivo(this.archivo, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.archivo });
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

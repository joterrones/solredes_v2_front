import { Component, Inject, OnInit,ViewChild } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings'
import { Router } from "@angular/router";
import { BaseComponent } from '../../base/base.component';

import { confGeneralService } from '../../../service/confGeneral.service';

import { EditarProyecto, Proyecto } from 'src/app/interface/configGeneral.interface';

@Component({
  selector: 'app-confproyectoimglogo',
  templateUrl: './confproyectoimglogo.component.html',
  styleUrls: ['./confproyectoimglogo.component.css'],
  providers: [confGeneralService]
})
export class ConfproyectoimglogoComponent extends BaseComponent implements OnInit {

  file: File;
  editar: boolean;
  proyecto: Proyecto; 
  showImg: string | ArrayBuffer;
  urlImagen: string;
  showImgDefault: string;
  constructor(
    public dialogRef: MatDialogRef<ConfproyectoimglogoComponent>,    
    public _confiGeneral_service: confGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: EditarProyecto,
    public _router: Router,
    public snackBar: MatSnackBar) {
      super(snackBar, _router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    this.showImgDefault = "assets/images/imgDefault.jpg";
    this.editar = true;
    this.proyecto = this.data.proyecto;
    this.urlImagen = AppSettings.URL_ARCHIVO+this.proyecto.c_rutalogo;
    console.log(this.urlImagen);
    console.log('Contenido de Detalle Proyecto');
    console.log(this.proyecto);
  }


  guardar(newForm) {
    this.proyecto.n_id_usermodi= this.usuarioLog.n_idseg_userprofile;
    console.log(this.proyecto);
    this._confiGeneral_service.saveProImgLogo(this.proyecto, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            
            this.dialogRef.close({ flag: true, data: this.proyecto });
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

  uploadfile(files: FileList) {
    this.file = files.item(0);
    const reader = new FileReader();
    reader.onload = e => this.showImg = reader.result;
    reader.readAsDataURL(this.file);    
    this.uploadFileToActivity()
  }

  uploadFileToActivity() {
    
    let extension = this.file.name;
    this._confiGeneral_service.uploadfile(extension, this.proyecto.n_idpro_proyecto+"_Proyecto", this.file, this.getToken().token).subscribe(
      result => {
        console.log("uploadFileToActivity",result)
        if (result.estado) {
          this.proyecto.c_rutalogo = result.c_ruta;
          console.log(this.proyecto.c_rutalogo);
          
          //this.proyecto.c_nombreImg = result.c_nombreImg;
        } else {
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        this.openSnackBar(<any>error, 99);
        alert(error.error);
      });
  }

}

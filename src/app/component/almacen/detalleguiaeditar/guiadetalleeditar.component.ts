import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { DetalleGuia, DetalleGuiaEditar, Elementos, Guias } from '../../../interface/almacen.interface';
import { AlmacenService } from 'src/app/service/almacen.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-guiadetalleeditar',
  templateUrl: './guiadetalleeditar.component.html',
  styleUrls: ['./guiadetalleeditar.component.css'],
  providers: [AlmacenService]
})
export class GuiadetalleeditarComponent extends BaseComponent implements OnInit {

  file: File;
  photo="";
  detalleguia: DetalleGuia;
  editar: boolean;
  guias: Guias[]; 
  elemento: Elementos[]; 
  showImg: string | ArrayBuffer;
  urlImagen: string;
  constructor(
    public dialogRef: MatDialogRef<GuiadetalleeditarComponent>,    
    public _almacen_service: AlmacenService,
    @Inject(MAT_DIALOG_DATA) public data: DetalleGuiaEditar,
    public _router: Router,
    public snackBar: MatSnackBar) {
      super(snackBar, _router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    if (this.data.detalleguia == null) {
      this.editar = false;
      this.detalleguia = {
        n_idalm_detalleguia: 0,
        n_idalm_guia: this.data.n_idalm_guia,
        n_idpl_elemento: 0, 
        c_nombreguia:"",
        c_nombreel: "",
        n_cantidad: 0,
        c_ruta: "",
        c_nombreImg:"",
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile      
      };
      
    } else {
      this.editar = true;
      this.detalleguia = this.data.detalleguia;
      this.urlImagen = environment.urlArchivo+this.detalleguia.c_ruta;
    }
    
    this.elemento = this.data.elemento;  
    console.log('Contenido de Detalle Guia');
    console.log(this.detalleguia);
  }


  guardar(newForm) {
    this.detalleguia.n_id_usermodi= this.usuarioLog.n_idseg_userprofile
    this._almacen_service.saveDetalleGuia(this.detalleguia, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            
            this.dialogRef.close({ flag: true, data: this.guias });
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
    this._almacen_service.uploadfile(extension, "DetalleGuia_" + this.detalleguia.n_idalm_detalleguia, this.file, this.getToken().token).subscribe(
      result => {
        console.log("uploadFileToActivity",result)
        if (result.estado) {
          this.detalleguia.c_ruta = result.c_ruta;
          this.detalleguia.c_nombreImg = result.c_nombreImg;
        } else {
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        this.openSnackBar(<any>error, 99);
        alert(error.error);
      });
  }

}

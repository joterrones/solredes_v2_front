import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router } from "@angular/router";
import { AppSettings } from 'src/app/common/appsettings';
import { Archivo, ArchivoEditar, Carpeta } from 'src/app/interface/archivos.interface';
import { ArchivosServices } from 'src/app/service/archivos.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-archivos-editar',
  templateUrl: './archivos-editar.component.html',
  styleUrls: ['./archivos-editar.component.css'],
  providers: [ArchivosServices]
})
export class ArchivosEditarComponent extends BaseComponent implements OnInit {
  file: File;
  archivo: Archivo;
  editar: boolean;
  carpetas: Carpeta[];
  
  constructor(
    public dialogRef: MatDialogRef<ArchivosEditarComponent>,    
    public _archivos_service: ArchivosServices,  
    @Inject(MAT_DIALOG_DATA) public data: ArchivoEditar,
    public _router: Router,
    public snackBar: MatSnackBar) {
      super(snackBar, _router); 
  }

  ngOnInit() {
    console.log(this.carpetas)
    if (this.data.archivo == null) {
      this.editar = false;
      this.archivo = {
        id_archivo: 0,
        id_carpeta: this.data.id_carpeta,
        c_nombre: "",
        c_ruta: ""    
      };
      
    } else {
      this.editar = true;
      this.archivo = this.data.archivo;
    }
    this.carpetas = this.data.carpetas;   
    console.log('Contenido de ARCHIVO');
    console.log(this.archivo);
  }

  uploadfile(files: FileList) {
    this.file = files.item(0);  
    console.log("CARGA ARC",this.file)
    this.uploadFileToActivity();
  }

  guardar(newForm) {    
    console.log("entra a saveArchivo",this.archivo)

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

  
  uploadFileToActivity() {
    
    let extension = this.file.name;
    this._archivos_service.uploadfile(extension, "Carpeta_" + this.archivo.id_carpeta, this.file, this.getToken().token).subscribe(
      result => {
        console.log("uploadFileToActivity",result)
        if (result.estado) {
          this.archivo.c_ruta = result.c_ruta;
          this.archivo.c_nombre = result.c_nombre;
        } else {
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        this.openSnackBar(<any>error, 99);
        alert(error.error);
      });
  }

}

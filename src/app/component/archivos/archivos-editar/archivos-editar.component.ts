import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router } from "@angular/router";
import { AppSettings } from 'src/app/common/appsettings';
import { Archivo, ArchivoEditar } from 'src/app/interface/archivos.interface';
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
  carpetas: [];
  constructor(
    public dialogRef: MatDialogRef<ArchivosEditarComponent>,    
    public _archivos_service: ArchivosServices,  
    @Inject(MAT_DIALOG_DATA) public data: ArchivoEditar,
    public _router: Router,
    public snackBar: MatSnackBar) {
      super(snackBar, _router); 
  }

  ngOnInit() {
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
        c_tipo: "2",
        n_iddoc_archivopadre: this.data.n_iddoc_archivopadre
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
    console.log(this.file.type);
    
    this._archivos_service.uploadfile(extension, this.proyecto.n_idpro_proyecto+"_Proyecto", this.file, this.getToken().token).subscribe(
      result => {
        console.log("uploadFileToActivity",result)
        if (result.estado) {
          this.archivo.c_ruta = result.c_ruta;
          this.archivo.c_nombre = result.c_nombre;
          this.archivo.c_checksum = result.c_checksum;
          console.log("CHECKSUM: ",this.archivo.c_checksum);
          
        } else {
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        this.openSnackBar(<any>error, 99);
        alert(error.error);
      });
  }

}

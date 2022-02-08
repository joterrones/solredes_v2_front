import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
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
  rutas = [];
  nombres = [];
  checksums = [];
  procesando: boolean = false;
  editNomArchivo: boolean = false;
  list: boolean = false;
  
  constructor(
    public dialogRef: MatDialogRef<ArchivosEditarComponent>,    
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
        c_tipo: "2",
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
    console.log("procesando",this.procesando);
    this.editNomArchivo = true;
    this.procesando = false;
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

  uploadfile= async (files: FileList) =>{
    console.log("inicia");
    
    for(let i = 0; i < files.length; i++){
      this.procesando = true;
      this.file = files.item(i);  
      console.log("CARGA ARC",this.file)      
      this.uploadFileToActivity();
    }
      
    this.editNomArchivo = false; 
  }

  guardar(newForm) {   
    
    this.archivo.n_id_usermodi= this.usuarioLog.n_idseg_userprofile
    if(this.editar){
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
    }else{
      for(let i = 0; i < this.nombres.length; i++) {  
        this.archivo.c_ruta =this.rutas[i];
        this.archivo.c_nombre =this.nombres[i];
        this.archivo.c_checksum =this.checksums[i];
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

  } 
  
  uploadFileToActivity() {
    let extension = this.file.name;
    //console.log(this.file.type);
    this._archivos_service.uploadfile(extension, this.proyecto.n_idpro_proyecto+"_Proyecto", this.file, this.getToken().token).subscribe(
      result => {
        //console.log("uploadFileToActivity",result)
        if (result.estado) {
          this.procesando = false;
          this.list = true;  
          this.rutas.push(result.c_ruta);
          this.nombres.push(result.c_nombre);
          this.checksums.push(result.c_checksum);    
          this.archivo.c_nombre = result.c_nombre;                   
          //console.log("CHECKSUM: ",this.archivo.c_checksum);
          /* */
        } else {
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        this.procesando = false;
        this.openSnackBar(<any>error, 99);
        alert(error.error);
        console.log(error);
        
      });
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';

import { BaseComponent } from '../../base/base.component';

import { ArchivosServices } from 'src/app/service/archivos.service';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Confirmar } from 'src/app/interface/confirmar.interface';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { AdmiArchivosEditarComponent } from '../admi-archivos-editar/admi-archivos-editar.component';
import { ArchivosEditarComponent } from '../archivos-editar/archivos-editar.component';
import { saveAs } from 'file-saver';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { ResultadoApi } from 'src/app/interface/common.interface';

@Component({
  selector: 'app-admi-archivos',
  templateUrl: './admi-archivos.component.html',
  styleUrls: ['./admi-archivos.component.css'],
  providers: [ArchivosServices,SeguridadService]
})
export class AdmiArchivosComponent extends BaseComponent implements OnInit {

  pantallaRol= [];
  permisoEdit: boolean = false;

  boolCarpeta: boolean = false;
  boolArchivo: boolean = false;

  textfilter = '';
  archivos= [];
  n_iddoc_archivopadre: number = 0;
  i: number = -1;

  retorno= [];
  nameRetorno=[];

  public tablaCarpetas: MatTableDataSource<any>;
  public confirmar: Confirmar;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  
  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _archivos_service: ArchivosServices,
    public _seguridad_service: SeguridadService,    
    public dialog: MatDialog
  ) {
    super(snackBar, router);
  }
  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    this.getPantallaRol();
    this.getTablaArchivos();
  }

  getTablaArchivos(){    
    let request = {
      n_iddoc_archivopadre: this.n_iddoc_archivopadre,
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto
    }
    this._archivos_service.getArchivo(request,this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {     
            console.log(result.data)
            this.archivos = result.data;   
            this.boolArchivo = false;
            this.boolCarpeta = false;         
            this.archivos.forEach(element => {
              if(element.c_tipo == 1){
                this.boolCarpeta = true;
                console.log(this.boolCarpeta)
              }
              if(element.c_tipo == 2){
                this.boolArchivo = true;
                console.log(this.boolArchivo)
              }
            });
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          console.log(error)
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
          
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }

  editArchivo(archivo){
    console.log(archivo);
    console.log(archivo.c_tipo);
    if(archivo.c_tipo === "2"){
      this.openDialogArchivo(archivo);
    }else{
      this.openDialogCarpeta(archivo);
    }
    return false;
  }

  openDialogCarpeta(archivo): void {
    console.log(archivo);
    
    const dialogRef = this.dialog.open(AdmiArchivosEditarComponent, {
      width: '750px', 
      data: { archivo: archivo, n_iddoc_archivopadre: this.n_iddoc_archivopadre}
    });
    dialogRef.afterClosed().subscribe(result => {
      try {        
        this.getTablaArchivos();

      } catch (error) {
        console.log(error);
        this.getTablaArchivos();
      }
    });
  }  

  openDialogArchivo(archivo): void {
    console.log(archivo);
    const dialogRef = this.dialog.open(ArchivosEditarComponent, {
      width: '750px', 
      data: { archivo: archivo, n_iddoc_archivopadre: this.n_iddoc_archivopadre}
    });
    dialogRef.afterClosed().subscribe(result => {
      try {        
        this.getTablaArchivos();

      } catch (error) {
        console.log(error);
        this.getTablaArchivos();
      }
    });
  }

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Esta seguro que desea eliminar: " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.delete_archivo(item);
      }
    });
  }

  delete_archivo(item) {
    
    let request = {
      n_iddoc_archivo: item.n_iddoc_archivo,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    this._archivos_service.deleteArchivo(request).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaArchivos();
            this.openSnackBar("Archivo eliminado", 200);
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  showArchivos(element): void {   
    
    this.i++; 
    this.n_iddoc_archivopadre = element.n_iddoc_archivo;
    this.retorno[this.i] = element.n_iddoc_archivopadre;    
    this.nameRetorno[this.i] = {c_nombre: element.c_nombre, n_iddoc_archivo: element.n_iddoc_archivo}; 
    this.getTablaArchivos();
  }
  
  showArchivosBarra(element): void {
    
    if(element == 0){      
      for(let r = 0; r <= this.retorno.length; r++){
        this.nameRetorno.pop();
        this.retorno.pop();
      }
      this.nameRetorno.pop();
      this.retorno.pop();
      this.i= -1;
      console.log(this.i);
      this.n_iddoc_archivopadre = element;
      this.getTablaArchivos();
    }else{
      this.n_iddoc_archivopadre = element.n_iddoc_archivo;

      for(let f = this.nameRetorno.length-1; f >= 0; f--){     
        if(element.n_iddoc_archivo == this.nameRetorno[f].n_iddoc_archivo){
          f = 0;
        }else{
          this.nameRetorno.pop();
          this.retorno.pop();
          this.i--; 
        }
      }
    }
    
    this.getTablaArchivos();
  }

  showArchivosBack(): void {    
    
    console.log(this.nameRetorno);
    this.n_iddoc_archivopadre = this.retorno[this.i];  
    this.nameRetorno.pop();
    this.i --;
    if(this.i < 0){
      this.i = 0;
      this.n_iddoc_archivopadre = 0;
    }
    this.getTablaArchivos();
  }

  download(element) {
    this._archivos_service.downloadArchivo( element.c_ruta).subscribe(
      result => {
        saveAs(result,element.c_nombre);
      }, error => {
        this.openSnackBar(<any>error, 99);
      });
  }

  getPantallaRol() {
    let request = {
      n_idseg_userprofile: this.usuarioLog.n_idseg_userprofile
    }
    this._seguridad_service.getPantallaRol(request, this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          this.pantallaRol = resultado.data;
          this.pantallaRol.forEach(element => {            
            if(element.c_codigo === 'as-adarc'){
              //console.log(element);
              //console.log(element.c_codigo);
              if(element.c_permiso === 'MO'){
                this.permisoEdit = true;
              }
            }
          });
        } else {
          this.openSnackBar(resultado.mensaje, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }


}

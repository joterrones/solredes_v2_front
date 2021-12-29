import { Component, OnInit, ViewChild } from '@angular/core';

import { BaseComponent } from '../../base/base.component';

import { ArchivosServices } from 'src/app/service/archivos.service';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Confirmar } from 'src/app/interface/confirmar.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { AdmiArchivosEditarComponent } from '../admi-archivos-editar/admi-archivos-editar.component';
import { ArchivosEditarComponent } from '../archivos-editar/archivos-editar.component';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css'],
  providers: [ArchivosServices]
})
export class ArchivosComponent extends BaseComponent implements OnInit {

  id_carpeta="";
  c_nombre="";
  file: File;
  carpetas: [];
  
  idalmacen = 0;  
  periodos:[];
  idperiodo = 0;
  
  textfilter = '';

  displayedColumns: string[] = ['editar', 'c_nombre','d_fechamodi','download','eliminar'];
  public tablaArchivos: MatTableDataSource<any>;
  public confirmar: Confirmar;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _archivos_service: ArchivosServices,  
    private _Activatedroute: ActivatedRoute, 
    public dialog: MatDialog
  ) {
    super(snackBar, router);
  }

  ngOnInit() {   
    
    this.id_carpeta = this._Activatedroute.snapshot.paramMap.get("id_carpeta");
    this.c_nombre = this._Activatedroute.snapshot.paramMap.get("c_nombre");
    console.log("id_carpeta"+this.id_carpeta)
    this.getCarpetas();
    this.getTablaArchivos();
  }  

  getTablaArchivos() {
    let request = {
      id_carpeta: this.id_carpeta
    }
    this._archivos_service.getArchivo(request,this.getToken().token).subscribe(
      result => {
        
        try {
          if (result.estado) {            
            this.tablaArchivos = new MatTableDataSource<any>(result.data);
            this.tablaArchivos.sort = this.sort;
            this.tablaArchivos.paginator = this.paginator;
            
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
          this.applyFilter(this.textfilter);
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }

  getCarpetas() {
    this._archivos_service.getCarpetas(this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          this.carpetas = resultado.data;
          console.log(this.carpetas)
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

  applyFilter(filterValue: String) {
    this.tablaArchivos.filter = filterValue.trim().toLowerCase();
  }

  openDialog(archivo): void {    
    
    const dialogRef = this.dialog.open(ArchivosEditarComponent, {
      width: '750px',
      data: { archivo: archivo, id_carpeta: this.id_carpeta ,carpetas: this.carpetas}    
      
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
      data: { titulo: "¿Desea eliminar el archivo " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteArchivo(item);
      }
    });
  }

  deleteArchivo(item) {
    this._archivos_service.deleteArchivo(item).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaArchivos();
            this.openSnackBar("Guia eliminada", 200);
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

  download(element) {
    this._archivos_service.downloadArchivo( element.c_ruta).subscribe(
      result => {
        saveAs(result,element.c_nombre);
      }, error => {
        this.openSnackBar(<any>error, 99);
      });
  }

}

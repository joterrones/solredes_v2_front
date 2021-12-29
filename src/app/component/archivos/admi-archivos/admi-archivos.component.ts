import { Component, OnInit, ViewChild } from '@angular/core';

import { BaseComponent } from '../../base/base.component';

import { ArchivosServices } from 'src/app/service/archivos.service';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Confirmar } from 'src/app/interface/confirmar.interface';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { AdmiArchivosEditarComponent } from '../admi-archivos-editar/admi-archivos-editar.component';
import { ResultadoApi } from 'src/app/interface/common.interface';


@Component({
  selector: 'app-admi-archivos',
  templateUrl: './admi-archivos.component.html',
  styleUrls: ['./admi-archivos.component.css'],
  providers: [ArchivosServices]
})
export class AdmiArchivosComponent extends BaseComponent implements OnInit {

  textfilter = '';

  displayedColumns: string[] = ['editar', 'c_nombre','d_fechamodi','eliminar'];
  public tablaCarpetas: MatTableDataSource<any>;
  public confirmar: Confirmar;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  
  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _archivos_service: ArchivosServices,    
    public dialog: MatDialog
  ) {
    super(snackBar, router);
  }
  ngOnInit() {
    this.getTablaArchivos();
  }

  getTablaArchivos(){
    this._archivos_service.getCarpetas(this.getToken().token).subscribe(
      result => {
        try {
          console.log(result)
          if (result.estado) {            
            this.tablaCarpetas = new MatTableDataSource<any>(result.data);
            this.tablaCarpetas.sort = this.sort;
            this.tablaCarpetas.paginator = this.paginator;
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          console.log(error)
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
          this.applyFilter(this.textfilter);
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }

  

  applyFilter(filterValue: String) {
    this.tablaCarpetas.filter = filterValue.trim().toLowerCase();
  }

  openDialog(carpeta): void {
    const dialogRef = this.dialog.open(AdmiArchivosEditarComponent, {
      width: '750px',
      data: { carpeta: carpeta}
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
      data: { titulo: "¿Desea eliminar la Carpeta " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.delete_carpeta(item);
      }
    });
  }

  delete_carpeta(item) {
    this._archivos_service.deleteCarpeta(item).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaArchivos();
            this.openSnackBar("Carpeta eliminada", 200);
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
    this.router.navigate(["/archivos/"+element.id_carpeta+"/"+element.c_nombre]);
  }

}

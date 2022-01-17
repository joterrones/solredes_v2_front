import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings'
import { Router } from "@angular/router";
import { BaseComponent } from '../../base/base.component';
import { ResultadoApi } from '../../../interface/common.interface';
import { Confirmar } from '../../../interface/confirmar.interface';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { AlmacenService } from 'src/app/service/almacen.service';
import { AlmaceneditarComponent } from '../almaceneditar/almaceneditar.component';
import { SeguridadService } from 'src/app/service/seguridad.service';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css'],
  providers: [AlmacenService,SeguridadService]
})
export class AlmacenComponent extends BaseComponent implements OnInit {

  tit: String = "SEGURIDAD > GESTOR DE ALMACEN";

  pantallaRol= [];
  permisoEdit: boolean = false;

  textfilter = '';

  displayedColumns: string[] = ['editar', 'c_nombre', 'c_direccion','detalle','eliminar'];
  public tablaAlmacen: MatTableDataSource<any>;
  public confirmar: Confirmar;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _almacen_service: AlmacenService,
    public _seguridad_service: SeguridadService,    
    public dialog: MatDialog
  ) {
    super(snackBar, router);
  }

  ngOnInit() {       
    this.usuarioLog = this.getUser().data;    
    this.getPantallaRol();
    this.getTablaAlmacen();
  } 
  
  getTablaAlmacen() {
    console.log(this.proyecto.n_idpro_proyecto);
    let request = {
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto,      
    }
    
    this._almacen_service.getAlmacen(request,this.getToken().token).subscribe(
      result => {        
        try {
          
          if (result.estado) {
            console.log(result.data);
            this.tablaAlmacen = new MatTableDataSource<any>(result.data);
            this.tablaAlmacen.sort = this.sort;
            this.tablaAlmacen.paginator = this.paginator;
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
  
  applyFilter(filterValue: String) {
    this.tablaAlmacen.filter = filterValue.trim().toLowerCase();
  }

  showGuia(element): void {    
    this.router.navigate(["/guia/"+element.n_idalm_almacen+"/"+element.c_nombre]);
  }  

  openDialog(almacen): void {
    const dialogRef = this.dialog.open(AlmaceneditarComponent, {
      width: '750px',
      data: { almacen: almacen/*, proyecto: this.proyecto*/ }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {        
        this.getTablaAlmacen();

      } catch (error) {
        console.log(error);
        this.getTablaAlmacen();
      }
    });
  }  

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el Almacen " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteAlmacen(item);
      }
    });
  }

  deleteAlmacen(item) {
    let request = {
      n_idalm_almacen: item.n_idalm_almacen,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    this._almacen_service.deleteAlmacen(request).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaAlmacen();
            this.openSnackBar("Almacen eliminada", 200);
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
            if(element.c_codigo === 'al-adalm'){
              console.log(element);
              console.log(element.c_codigo);
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

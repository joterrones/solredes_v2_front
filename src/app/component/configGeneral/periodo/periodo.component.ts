import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { Confirmar } from 'src/app/interface/confirmar.interface';
import { AlmacenService } from 'src/app/service/almacen.service';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { BaseComponent } from '../../base/base.component';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { PeriodoeditarComponent } from '../periodoeditar/periodoeditar.component';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css'],
  providers: [AlmacenService, SeguridadService]
})
export class PeriodoComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['editar','periodo','eliminar'];
  public tabla: MatTableDataSource<any>;
  public confirmar: Confirmar;

  pantallaRol= [];
  permisoEdit: boolean = false;

  periodoAll: any;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  textfilter = '';
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
    this.getPeriodos();  
    this.getPantallaRol();
  }

  getPeriodos() {
    let request = {
      n_idgen_periodo: 0      
    }
    this._almacen_service.getPeriodos(request,this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          console.log(resultado.data);
          this.periodoAll = resultado.data
          this.tabla = new MatTableDataSource<any>(result.data.periodos);
          this.tabla.sort = this.sort;
          this.tabla.paginator = this.paginator;
                
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
    this.tabla.filter = filterValue.trim().toLowerCase();
  }

  openDialog(element): void {    
    
    const dialogRef = this.dialog.open(PeriodoeditarComponent, {
      width: '750px',
      data: { periodo: element, periodoAll: this.periodoAll}    
      
    });
    dialogRef.afterClosed().subscribe(result => {
      try {        
        this.getPeriodos();

      } catch (error) {
        console.log(error);
        this.getPeriodos();
      }
    });
  }  

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el Periodo " + item.c_descripcion + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deletePeriodo(item);
      }
    });
  }

  deletePeriodo(item) {
    let request = {
      n_idgen_periodo: item.n_idgen_periodo,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    this._almacen_service.deletePeriodo(request).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getPeriodos();
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
            if(element.c_codigo === 'ma-adper'){
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

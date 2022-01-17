import { Component, OnInit,ViewChild } from '@angular/core';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings'
import { Router } from "@angular/router";
import { BaseComponent } from '../../base/base.component';
import { Confirmar } from '../../../interface/confirmar.interface';
import { confGeneralService } from '../../../service/confGeneral.service';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { CategoriatipomontajeeditarComponent } from '../categoriatipomontajeeditar/categoriatipomontajeeditar.component';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { ResultadoApi } from 'src/app/interface/common.interface';

@Component({
  selector: 'app-categoriatipomontaje',
  templateUrl: './categoriatipomontaje.component.html',
  styleUrls: ['./categoriatipomontaje.component.css'],
  providers: [confGeneralService, SeguridadService]
})
export class CategoriatipomontajeComponent extends BaseComponent implements OnInit {

  tit: String = "ADMINISTRACIÓN DE CATEGORIA TIPO MONTAJE";

  pantallaRol= [];
  permisoEdit: boolean = false;

  textfilter = '';

  displayedColumns: string[] = ['editar','c_nombre', 'c_codigo', 'eliminar'];
  public tabla: MatTableDataSource<any>;
  public confirmar: Confirmar;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _confiGeneral_service: confGeneralService,
    public _seguridad_service: SeguridadService,
    public dialog: MatDialog
  ) { 
    super(snackBar, router);
  }

  ngOnInit() {       
    this.usuarioLog = this.getUser().data;
    this.getPantallaRol();
    this.getTablaTipoMontaje();
  }  
  
  getTablaTipoMontaje() {  
    this._confiGeneral_service.getTipoMontaje(this.getToken().token).subscribe(
      result => {      
        console.log('retorna del node a tablatipoMontaje')  
        console.log(result);
        this.tabla = new MatTableDataSource<any>(result.data);
        this.tabla.sort = this.sort;
        this.tabla.paginator = this.paginator;

      }, error => {
        this.openSnackBar(error.error, 99);
      });
  } 

  applyFilter(filterValue: String) {
    this.tabla.filter = filterValue.trim().toLowerCase();
  }

  openDialog(tipomontaje): void {
    console.log(tipomontaje)
    const dialogRef = this.dialog.open(CategoriatipomontajeeditarComponent, {
      width: '750px',
      data: {tipomontaje }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {
        this.getTablaTipoMontaje();

      } catch (error) {
        console.log(error);
        this.getTablaTipoMontaje();
      }
    });
  }

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el Tipo Montaje " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteTipoMontaje(item);
      }
    });
  }

  deleteTipoMontaje(elemento) {
    let request = {
      n_idmon_categoriatipomontaje: elemento.n_idmon_categoriatipomontaje,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    this._confiGeneral_service.deleteTipoMontaje(request).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaTipoMontaje();
            this.openSnackBar("Tipo Montaje Eliminado", 200);
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
            if(element.c_codigo === 'ma-adtmo'){
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

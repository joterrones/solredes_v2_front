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
import { EmpresaeditarComponent } from '../empresaeditar/empresaeditar.component';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { ResultadoApi } from 'src/app/interface/common.interface';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
  providers: [confGeneralService, SeguridadService]
})
export class EmpresaComponent extends BaseComponent implements OnInit {

  tit: String = "SEGURIDAD > GESTOR DE EMPRESAS";

  pantallaRol= [];
  permisoEdit: boolean = false;

  textfilter = '';

  displayedColumns: string[] = ['editar','c_nombrecorto', 'c_ruc', 'c_razonsocial', 'eliminar'];
  public tablaEmpresa: MatTableDataSource<any>;
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
    this.getTablaEmpresa();
  }  
  
  getTablaEmpresa() {  
    this._confiGeneral_service.getempresa(this.getToken().token).subscribe(
      result => {      
          
        console.log(result);
        this.tablaEmpresa = new MatTableDataSource<any>(result.data);
        this.tablaEmpresa.sort = this.sort;
        this.tablaEmpresa.paginator = this.paginator;

      }, error => {
        this.openSnackBar(error.error, 99);
      });
  } 

  applyFilter(filterValue: String) {
    this.tablaEmpresa.filter = filterValue.trim().toLowerCase();
  }

  openDialog(empresa): void {
    const dialogRef = this.dialog.open(EmpresaeditarComponent, {
      width: '750px',
      data: { empresa}
    });
    dialogRef.afterClosed().subscribe(result => {
      try {
        this.getTablaEmpresa();

      } catch (error) {
        console.log(error);
        this.getTablaEmpresa();
      }
    });
  }

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar la Empresa " + item.c_nombrecorto + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.delete_proyecto(item);
      }
    });
  }

  delete_proyecto(proyecto) {
    let request = {
      n_idgen_empresa: proyecto.n_idgen_empresa,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    this._confiGeneral_service.deleteEmpresa(request).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaEmpresa();
            this.openSnackBar("Empresa Eliminado", 200);
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
            if(element.c_codigo === 'ma-ademp'){
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

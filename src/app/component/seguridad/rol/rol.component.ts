import { Component, OnInit, ViewChild } from '@angular/core';


import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings'
import { Router } from "@angular/router";
import { BaseComponent } from '../../base/base.component';
import { ResultadoApi } from '../../../interface/common.interface';
import { Confirmar } from '../../../interface/confirmar.interface';
import { SeguridadService } from '../../../service/seguridad.service';
import { GeneralService } from '../../../service/general.service';
import { RoleditarComponent } from '../roleditar/roleditar.component';
import { ConfirmComponent } from '../../general/confirm/confirm.component';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css'],
  providers: [SeguridadService, GeneralService]
})
export class RolComponent extends BaseComponent implements OnInit {


  tit: String = "SEGURIDAD > GESTOR DE ROLES";

  roles: [];
  idroles = 0;
  textfilter = '';

  displayedColumns: string[] = ['editar','c_nombre', 'n_nivel', 'eliminar'];
  public tablaRoles: MatTableDataSource<any>;
  public confirmar: Confirmar;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _seguridad_service: SeguridadService,
    public _general_service: GeneralService,
    public dialog: MatDialog
  ) { 
    super(snackBar, router);
  }

  ngOnInit() {
    this.getrole();    
    this.getTablaRol();
  }
  
  selectRole(n_idseg_rol) {
    this.idroles = n_idseg_rol;
    this.getTablaRol();
  }
  getTablaRol() {
    let request = {
      n_idseg_rol: this.idroles      
    }
    this._seguridad_service.getrole(this.getToken().token).subscribe(
      result => {

        try {
          if (result.estado) {
            console.log(result);
            this.tablaRoles = new MatTableDataSource<any>(result.data);
            this.tablaRoles.sort = this.sort;
            this.tablaRoles.paginator = this.paginator;
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

  getrole() {
    this._seguridad_service.getrole(this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          this.roles = resultado.data;
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
    this.tablaRoles.filter = filterValue.trim().toLowerCase();
  }

  openDialog(usuario): void {
    const dialogRef = this.dialog.open(RoleditarComponent, {
      width: '750px',
      data: { usuario: usuario, roles: this.roles}
    });
    dialogRef.afterClosed().subscribe(result => {
      try {
        this.getTablaRol();

      } catch (error) {
        console.log(error);
        this.getTablaRol();
      }
    });
  }

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el usuario " + item.c_username + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.delete_proyecto(item);
      }
    });
  }

  delete_proyecto(proyecto) {
    this._seguridad_service.delete(proyecto).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaRol();
            this.openSnackBar("Usuario eliminado", 200);
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

}

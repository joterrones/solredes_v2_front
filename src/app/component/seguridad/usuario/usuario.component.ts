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
import { ResetearclaveComponent } from '../../generico/resetarclave/resetarclave.component';
import { UsuarioeditarComponent } from '../usuarioeditar/usuarioeditar.component';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { UsuarioproyectoComponent } from '../usuarioproyecto/usuarioproyecto.component';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [SeguridadService, GeneralService]
})
export class UsuarioComponent extends BaseComponent implements OnInit {
  tit: String = "SEGURIDAD > GESTOR DE USUARIOS";

  roles: [];
  idroles = 0;
  entidades: [];
  identidad = 0;
  textfilter = '';

  displayedColumns: string[] = ['editar', 'username', 'c_nombre', 'c_dni', 'c_rol', 'asigProyecto','resetear', 'eliminar'];
  public tablaUsuarios: MatTableDataSource<any>;
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
    this.getTablaUsuario();
  }

  selectRole(n_idseg_rol) {
    this.idroles = n_idseg_rol;
    this.getTablaUsuario();
  }

  selectEntidad(n_idgen_entidad) {
    this.identidad = n_idgen_entidad;
    this.getTablaUsuario();
  }

  getTablaUsuario() {
    let request = {
      n_idseg_rol: this.idroles,
      n_idgen_entidad: this.identidad
    }
    console.log( this.idroles)
    console.log(this.identidad);
    
    this._seguridad_service.get(request, this.getToken().token).subscribe(
      result => {

        try {
          if (result.estado) {
            console.log(result);
            this.tablaUsuarios = new MatTableDataSource<any>(result.data);
            this.tablaUsuarios.sort = this.sort;
            this.tablaUsuarios.paginator = this.paginator;
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
    let request = {
      n_idseg_rol: this.idroles      
    }
    this._seguridad_service.getrole(request,this.getToken().token).subscribe(
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

  getentidad() {
    this._general_service.get(this.getToken().token).subscribe(
      result => {
        console.log(result)
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          this.entidades = resultado.data;
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
    this.tablaUsuarios.filter = filterValue.trim().toLowerCase();
  }

  openDialog(usuario): void {
    const dialogRef = this.dialog.open(UsuarioeditarComponent, {
      width: '750px',
      data: { usuario: usuario, roles: this.roles }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {
        this.getentidad();
        this.getTablaUsuario();

      } catch (error) {
        console.log(error);
        this.getTablaUsuario();
      }
    });
  }

  openDialogProyecto(usuario): void {
    console.log("PUREBA");
    
    let data = {
      usuario: usuario,
      titulo: "Asignar Proyecto"
    };
    const dialogAsigPro = this.dialog.open(UsuarioproyectoComponent, {
      width: '750px',
      data: data
    });
    dialogAsigPro.afterClosed().subscribe(result => {
    });
  }

  openDialogClave(usuario): void {
    let data = {
      data: usuario,
      titulo: "Resetear Contraseña",
      esresetpassword: true
    };
    const dialogRefClave = this.dialog.open(ResetearclaveComponent, {
      width: '750px',
      data: data
    });
    dialogRefClave.afterClosed().subscribe(result => {
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
            this.getTablaUsuario();
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


import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings'
import { Router } from "@angular/router";
import { BaseComponent } from '../../base/base.component';
import { Confirmar } from '../../../interface/confirmar.interface';
import { confGeneralService } from '../../../service/confGeneral.service';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { TragrupoEditarComponent } from '../tragrupo-editar/tragrupo-editar.component';
import { ProyectousuaioComponent } from '../proyectousuaio/proyectousuaio.component';
import { LineausuarioComponent } from '../lineausuario/lineausuario.component';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { ResultadoApi } from 'src/app/interface/common.interface';


@Component({
  selector: 'app-tragrupo',
  templateUrl: './tragrupo.component.html',
  styleUrls: ['./tragrupo.component.css'],
  providers: [confGeneralService,SeguridadService]
})
export class TragrupoComponent extends BaseComponent implements OnInit {
  pantallaRol= [];
  permisoEdit: boolean = false;
  proyectos: [];
  textfilter = '';
  dataCard = [];
  stringBuscar: String = '';
  displayedColumns: string[] = ['editar', 'c_nombre', 'asigLinea','asigUsuario','eliminar'];
  public tablaTraGrupos: MatTableDataSource<any>;
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
    this.getTablaTraGrupos();
  }
  
  getTablaTraGrupos() {
    console.log(this.proyecto.n_idpro_proyecto);
    let request = {
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto,
      stringBuscar: this.stringBuscar
    }
    this._confiGeneral_service.getTraGrupos(request, this.getToken().token).subscribe(
      result => {

        try {
          if (result.estado) {
            console.log(result.data);
            this.dataCard = result.data;
            this.tablaTraGrupos = new MatTableDataSource<any>(result.data);
            this.tablaTraGrupos.sort = this.sort;
            this.tablaTraGrupos.paginator = this.paginator;
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
    this.tablaTraGrupos.filter = filterValue.trim().toLowerCase();
  }
  onSelectBuscar(value){
    this.stringBuscar = value
    this.getTablaTraGrupos();
  }

  openDialog(traGrupos): void {
    const dialogRef = this.dialog.open(TragrupoEditarComponent, {
      
      width: '750px',
      data: { traGrupos: traGrupos, proyectos: this.proyectos}
      
    });
    dialogRef.afterClosed().subscribe(result => {
      try {        
        this.getTablaTraGrupos();

      } catch (error) {
        console.log(error);
        this.getTablaTraGrupos();
      }
    });
  }  

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el Grupo " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deletetraGrupos(item);
      }
    });
  }

  deletetraGrupos(item) {
    let request = {
      n_idtra_grupo: item.n_idtra_grupo,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    this._confiGeneral_service.deletetraGrupos(request).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaTraGrupos();
            this.openSnackBar("Grupo eliminada", 200);
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

  openDialogUsuarios(grupo): void {
    const dialogAsigPro = this.dialog.open(ProyectousuaioComponent, {
      width: '750px',
      data: grupo, 
    });
    dialogAsigPro.afterClosed().subscribe(result => {
      this.getTablaTraGrupos();
    });
  }

  openDialogLinea(grupo): void {
    const dialogAsigPro = this.dialog.open(LineausuarioComponent, {
      width: '750px',
      data: grupo, 
    });
    dialogAsigPro.afterClosed().subscribe(result => {
      this.getTablaTraGrupos();
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
            if(element.c_codigo === 'as-adgru'){
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

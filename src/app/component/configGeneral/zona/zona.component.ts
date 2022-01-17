import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings'
import { Router } from "@angular/router";
import { BaseComponent } from '../../base/base.component';
import { ResultadoApi } from '../../../interface/common.interface';
import { Confirmar } from '../../../interface/confirmar.interface';
import { confGeneralService } from '../../../service/confGeneral.service';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { ZonaeditComponent } from '../zonaedit/zonaedit.component';
import { SeguridadService } from 'src/app/service/seguridad.service';

@Component({
  selector: 'app-zona',
  templateUrl: './zona.component.html',
  styleUrls: ['./zona.component.css'],
  providers: [confGeneralService, SeguridadService]
})
export class ZonaComponent extends BaseComponent implements OnInit {

  tit: String = "SEGURIDAD > GESTOR DE ZONAS";

  pantallaRol= [];
  permisoEdit: boolean = false;

  idzona = 0;
  textfilter = '';
  //displayedColumns: string[] = ['Buscar'];
  displayedColumns: string[] = ['editar', 'c_codigo', 'c_nombre', 'eliminar'];
  public tablaLineas: MatTableDataSource<any>;
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
    this.getTablaZona();
    console.log(this.proyecto.n_idpro_proyecto);
  }
  
  getTablaZona() {
    let request = {
      n_idpl_zona: this.idzona,      
    }
    console.log(this.idzona);
    
    this._confiGeneral_service.getZona(request, this.getToken().token).subscribe(
      result => {

        try {
          if (result.estado) {
            console.log(result.data);
            this.tablaLineas = new MatTableDataSource<any>(result.data);
            this.tablaLineas.sort = this.sort;
            this.tablaLineas.paginator = this.paginator;
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
    this.tablaLineas.filter = filterValue.trim().toLowerCase();
  }

  openDialog(zona): void {
    const dialogRef = this.dialog.open(ZonaeditComponent, {
      width: '750px',
      data: { zona: zona, proyecto: this.proyecto.n_idpro_proyecto }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {        
        this.getTablaZona();

      } catch (error) {
        console.log(error);
        this.getTablaZona();
      }
    });
  }  

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar la Zona " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.delete_linea(item);
      }
    });
  }

  delete_linea(item) {
    let request = {
      n_idpl_zona: item.n_idpl_zona,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    this._confiGeneral_service.deleteZona(request).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaZona();
            this.openSnackBar("Zona eliminada", 200);
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
            if(element.c_codigo === 'ma-adzon'){
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

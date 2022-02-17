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
import { SeguridadService } from 'src/app/service/seguridad.service';
import { PartidamontajeeditarComponent } from '../partidamontajeeditar/partidamontajeeditar.component';

@Component({
  selector: 'app-partidamontaje',
  templateUrl: './partidamontaje.component.html',
  styleUrls: ['./partidamontaje.component.css'],
  providers: [confGeneralService, SeguridadService]
})
export class PartidamontajeComponent extends BaseComponent implements OnInit {

  tit: String = "ADMINISTRACIÓN DE PARTIDAS DE MONTAJE";

  idCategorioaMontaje: number = 0;
  idtipoLinea: number = 0;
  tipolinea: [];

  pantallaRol = [];
  categoriaMon = [];
  permisoEdit: boolean = false;

  textfilter = '';

  displayedColumns: string[] = ['editar', 'c_codigo','c_nombre','categoriaMon','tipolinea', 'c_unidadmedida','eliminar'];
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
    this.gettipolinea();
    this.getCategorioaMontaje();
  }

  selectTipolinea(select) {
    this.idtipoLinea = select;
    this.getTablaTipoMontaje();
  }

  selectCategorioaMontaje(select) {
    this.idCategorioaMontaje = select;
    this.getTablaTipoMontaje();
  }

  getTablaTipoMontaje() {
    let request = {
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto,
      n_idmon_categoriatipomontaje: this.idCategorioaMontaje,
      n_idpl_tipolinea: this.idtipoLinea
    }
    console.log(request);
    
    this._confiGeneral_service.getTipoMontaje(request, this.getToken().token).subscribe(
      result => {

        try {
          if (result.estado) {
            console.log(result.data);
            this.tabla = new MatTableDataSource<any>(result.data);
            this.tabla.sort = this.sort;
            this.tabla.paginator = this.paginator;
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
    this.tabla.filter = filterValue.trim().toLowerCase();
  }

  gettipolinea() {
    let request = {
      n_idpl_tipolinea: 0,    
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto  
    }
    this._confiGeneral_service.gettipolinea(request,this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          this.tipolinea = resultado.data;
          console.log(this.tipolinea);
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

  getCategorioaMontaje() {
    let request = {       
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto  
    }
    this._confiGeneral_service.getTablaCateTipoMontaje(request,this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          this.categoriaMon = resultado.data;
          console.log(this.tipolinea);
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

  openDialog(tipoMontaje): void {
    const dialogRef = this.dialog.open(PartidamontajeeditarComponent, {
      width: '750px',
      data: { tipoMontaje: tipoMontaje, tipolinea: this.tipolinea, categoriaMon: this.categoriaMon}
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
      data: { titulo: "¿Desea eliminar la Partida Montaje" + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deletePartidaMontaje(item);
      }
    });
  }

  deletePartidaMontaje(item) {
    let request = {
      n_idmon_tipomontaje: item.n_idmon_tipomontaje,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    console.log(request);
    
    this._confiGeneral_service.deleteTipoMontaje(request).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaTipoMontaje();
            this.openSnackBar("Partida eliminada", 200);
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
            if(element.c_codigo === 'ma-adpmo'){
              console.log(element);
              console.log(element.c_codigo);
              if(element.c_permiso === 'MO'){
                this.permisoEdit = true;              
              }
              console.log(this.permisoEdit);
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

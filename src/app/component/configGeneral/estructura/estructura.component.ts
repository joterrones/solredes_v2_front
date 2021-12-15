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
import { EstructuraeditarComponent } from '../estructuraeditar/estructuraeditar.component';
import { ResultadoApi } from 'src/app/interface/common.interface';

@Component({
  selector: 'app-estructura',
  templateUrl: './estructura.component.html',
  styleUrls: ['./estructura.component.css'],
  providers: [confGeneralService]
})
export class EstructuraComponent extends BaseComponent implements OnInit {

  tit: String = "SEGURIDAD > GESTOR DE ESTRUCTURAS";
  idestructura = 0;
  textfilter = '';
  idzona= 0;
  zona: [];

  displayedColumns: string[] = ['editar','c_nombre', 'c_latitud', 'n_altitud','n_longitud', 'eliminar'];
  public tablaEstructura: MatTableDataSource<any>;
  public confirmar: Confirmar;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _confiGeneral_service: confGeneralService,
    public dialog: MatDialog
  ) { 
    super(snackBar, router);
  }

  ngOnInit() {      
    this.getzona(); 
    this.getTablaEstructura();
  }  
  
  getTablaEstructura() {  
    let request = {
      n_idpl_zona: this.idzona,  
      n_idpl_estructura: this.idestructura    
    }
    this._confiGeneral_service.getEstructura(request, this.getToken().token).subscribe(
      result => {      
        console.log('retorna del node a tablatipoFoto')  
        console.log(result);
        this.tablaEstructura = new MatTableDataSource<any>(result.data);
        this.tablaEstructura.sort = this.sort;
        this.tablaEstructura.paginator = this.paginator;

      }, error => {
        this.openSnackBar(error.error, 99);
      });
  } 

  applyFilter(filterValue: String) {
    this.tablaEstructura.filter = filterValue.trim().toLowerCase();
  }

  openDialog(estructura): void {
    console.log(estructura)
    const dialogRef = this.dialog.open(EstructuraeditarComponent, {
      width: '750px',
      data: { estructura:estructura, zona:this.zona }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {
        this.getTablaEstructura();

      } catch (error) {
        console.log(error);
        this.getTablaEstructura();
      }
    });
  }

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar la Estructura de la Zona " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteEstructura(item);
      }
    });
  }

  deleteEstructura(proyecto) {
    this._confiGeneral_service.deleteEstructura(proyecto).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaEstructura();
            this.openSnackBar("Estructura Eliminado", 200);
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

  getzona() {
    let request = {
      n_idpl_zona: this.idzona     
    }
    this._confiGeneral_service.getZona(request,this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          this.zona = resultado.data;
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

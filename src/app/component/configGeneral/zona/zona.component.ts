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

@Component({
  selector: 'app-zona',
  templateUrl: './zona.component.html',
  styleUrls: ['./zona.component.css'],
  providers: [confGeneralService]
})
export class ZonaComponent extends BaseComponent implements OnInit {

  tit: String = "SEGURIDAD > GESTOR DE ZONAS";

  proyecto: [];
  idpro = 0;  
  idzona = 0;
  textfilter = '';
  //displayedColumns: string[] = ['Buscar'];
  displayedColumns: string[] = ['editar', 'c_codigo', 'c_nombre', 'c_nombreP', 'eliminar'];
  public tablaLineas: MatTableDataSource<any>;
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
    this.getProyecto();    
    this.getTablaZona();
  }

  selectProyecto(n_idpl_proyecto) {
    this.idpro = n_idpl_proyecto;
    this.getTablaZona();
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

  getProyecto() {
    console.log(this.idpro );
    let request = {
      n_idpl_proyecto: this.idpro      
    }
    this._confiGeneral_service.getProyecto(request,this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          this.proyecto = resultado.data;
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
    this.tablaLineas.filter = filterValue.trim().toLowerCase();
  }

  openDialog(zona): void {
    const dialogRef = this.dialog.open(ZonaeditComponent, {
      width: '750px',
      data: { zona: zona, proyecto: this.proyecto }
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
    this._confiGeneral_service.deleteZona(item).subscribe(
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


}

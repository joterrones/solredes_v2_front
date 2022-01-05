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
import { ConfproyectoeditarComponent } from '../confproyectoeditar/confproyectoeditar.component';

@Component({
  selector: 'app-confproyecto',
  templateUrl: './confproyecto.component.html',
  styleUrls: ['./confproyecto.component.css'],
  providers: [confGeneralService]
})
export class ConfproyectoComponent extends BaseComponent implements OnInit {

  tit: String = "SEGURIDAD > GESTOR DE TIPOS DE PROYECTOS";
  
  idproyecto = 0;
  textfilter = '';  

  displayedColumns: string[] = ['editar','c_nombrep', 'eliminar'];
  public tablaProyecto: MatTableDataSource<any>;
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
    this.getTablaProyecto();
  }  
  
  getTablaProyecto() {  
    let request = {
      n_idpro_proyecto: this.idproyecto      
    }
    this._confiGeneral_service.getProyecto(request,this.getToken().token).subscribe(
      result => {                
        console.log(result);
        this.tablaProyecto = new MatTableDataSource<any>(result.data);
        console.log(result.data);        
        this.tablaProyecto.sort = this.sort;
        this.tablaProyecto.paginator = this.paginator;

      }, error => {
        this.openSnackBar(error.error, 99);
      });
  } 

  applyFilter(filterValue: String) {
    this.tablaProyecto.filter = filterValue.trim().toLowerCase();
  }

  openDialog(proyecto): void {
    console.log(proyecto)
    const dialogRef = this.dialog.open(ConfproyectoeditarComponent, {
      width: '750px',
      data: { proyecto }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {
        this.getTablaProyecto();

      } catch (error) {
        console.log(error);
        this.getTablaProyecto();
      }
    });
  }
  
  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el Proyecto " + item.c_nombret + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.delete_proyecto(item);
      }
    });
  }

  delete_proyecto(item) {
    this._confiGeneral_service.deleteProyecto(item).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaProyecto();
            this.openSnackBar("Proyecto Eliminado", 200);
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

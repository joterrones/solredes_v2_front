import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings'
import { Router } from "@angular/router";
import { BaseComponent } from '../../base/base.component';
import { ResultadoApi } from '../../../interface/common.interface';
import { Confirmar } from '../../../interface/confirmar.interface';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { AlmacenService } from 'src/app/service/almacen.service';
import { AlmaceneditarComponent } from '../almaceneditar/almaceneditar.component';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css'],
  providers: [AlmacenService]
})
export class AlmacenComponent extends BaseComponent implements OnInit {

  tit: String = "SEGURIDAD > GESTOR DE ALMACEN";

  proyecto: [];
  idtproyecto = 0;  
  textfilter = '';

  displayedColumns: string[] = ['editar', 'c_nombre', 'c_direccion','c_nombrep','detalle','eliminar'];
  public tablaAlmacen: MatTableDataSource<any>;
  public confirmar: Confirmar;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _almacen_service: AlmacenService,    
    public dialog: MatDialog
  ) {
    super(snackBar, router);
  }

  ngOnInit() {       
    this.getProyectos();     
    this.getTablaAlmacen();
  }  

  selectProyecto(n_idpro_proyecto) {
    this.idtproyecto = n_idpro_proyecto;
    this.getTablaAlmacen();
  }
  
  getTablaAlmacen() {
    let request = {
      n_idpro_proyecto: this.idtproyecto,      
    }
    
    this._almacen_service.getAlmacen(request,this.getToken().token).subscribe(
      result => {        
        try {
          
          if (result.estado) {
            console.log(result);
            this.tablaAlmacen = new MatTableDataSource<any>(result.data);
            this.tablaAlmacen.sort = this.sort;
            this.tablaAlmacen.paginator = this.paginator;
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

  getProyectos() {
    let request = {
      n_idpro_proyecto: this.idtproyecto      
    }
    this._almacen_service.getProyecto(request,this.getToken().token).subscribe(
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
    this.tablaAlmacen.filter = filterValue.trim().toLowerCase();
  }

  showGuia(element): void {    
    this.router.navigate(["/guia/"+element.n_idalm_almacen+"/"+element.c_nombre]);
  }  

  openDialog(almacen): void {
    const dialogRef = this.dialog.open(AlmaceneditarComponent, {
      width: '750px',
      data: { almacen: almacen, proyecto: this.proyecto }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {        
        this.getTablaAlmacen();

      } catch (error) {
        console.log(error);
        this.getTablaAlmacen();
      }
    });
  }  

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el Almacen " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteAlmacen(item);
      }
    });
  }

  deleteAlmacen(item) {
    this._almacen_service.deleteAlmacen(item).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaAlmacen();
            this.openSnackBar("Almacen eliminada", 200);
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

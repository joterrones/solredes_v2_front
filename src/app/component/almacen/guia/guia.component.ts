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
import { GuiaeditarComponent } from '../guiaeditar/guiaeditar.component';

@Component({
  selector: 'app-guia',
  templateUrl: './guia.component.html',
  styleUrls: ['./guia.component.css'],
  providers: [AlmacenService]
})
export class GuiaComponent extends BaseComponent implements OnInit {

  tit: String = "SEGURIDAD > GESTOR DE GUIA";

  almacen: [];
  idalmacen = 0;  
  periodos:[];
  idperiodo = 0;
  
  textfilter = '';

  displayedColumns: string[] = ['editar', 'c_nombre', 'c_direccion','c_nombreal','periodo','c_ruc','c_nroguia', 'c_observacion','eliminar'];
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
    this.getAlmacenes();     
    this.getPeriodos();  
    this.getTablaGuia();
  }  

  selectAlmacenes(n_idalm_almacen) {
    this.idalmacen = n_idalm_almacen;
    this.getTablaGuia();
  }
  
  selectPeriodos(n_idgen_periodo) {
    this.idperiodo = n_idgen_periodo;
    this.getTablaGuia();
  }

  getTablaGuia() {
    let request = {
      n_idalm_almacen: this.idalmacen,    
      n_idgen_periodo: this.idperiodo  
    }
    
    this._almacen_service.getGuia(request,this.getToken().token).subscribe(
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

  getAlmacenes() {
    let request = {
      n_idalm_almacen: this.almacen      
    }
    this._almacen_service.getAlmacenes(request,this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          this.almacen = resultado.data;
          console.log("datos almacen")
          console.log(this.almacen)
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

  getPeriodos() {
    let request = {
      n_idgen_periodo: this.periodos      
    }
    this._almacen_service.getPeriodos(request,this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          this.periodos = resultado.data;
          console.log("datos Periodos")
          console.log(this.almacen)
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

  openDialog(guia): void {    
    const dialogRef = this.dialog.open(GuiaeditarComponent, {
      width: '750px',
      data: { guia: guia, almacen: this.almacen, periodos: this.periodos }    
      
    });
    dialogRef.afterClosed().subscribe(result => {
      try {        
        this.getTablaGuia();

      } catch (error) {
        console.log(error);
        this.getTablaGuia();
      }
    });
  }  

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar la Guia " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteGuia(item);
      }
    });
  }

  deleteGuia(item) {
    this._almacen_service.deleteGuia(item).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaGuia();
            this.openSnackBar("Guia eliminada", 200);
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

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
import { ValoresGeneralesEditarComponent } from '../valores-generales-editar/valores-generales-editar.component';

@Component({
  selector: 'app-valores-generales',
  templateUrl: './valores-generales.component.html',
  styleUrls: ['./valores-generales.component.css'],
  providers: [confGeneralService]
})
export class ValoresGeneralesComponent extends BaseComponent implements OnInit {

  idtipolinea = 0;
  textfilter = '';  

  displayedColumns: string[] = ['editar', 'c_codigo','c_nombre', 'eliminar'];
  public tablaValoresGnr: MatTableDataSource<any>;
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
    this.getTablaValoresGenerales();
  }  
  
  getTablaValoresGenerales() {  
  
    this._confiGeneral_service.getValoresGnr(this.getToken().token).subscribe(
      result => {                
        console.log(result);
        this.tablaValoresGnr = new MatTableDataSource<any>(result.data);
        this.tablaValoresGnr.sort = this.sort;
        this.tablaValoresGnr.paginator = this.paginator;

      }, error => {
        this.openSnackBar(error.error, 99);
      });
  } 

  applyFilter(filterValue: String) {
    this.tablaValoresGnr.filter = filterValue.trim().toLowerCase();
  }

  openDialog(valoresGnr): void {
    const dialogRef = this.dialog.open(ValoresGeneralesEditarComponent, {
      width: '750px',
      data: { valoresGnr }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {
        this.getTablaValoresGenerales();

      } catch (error) {
        console.log(error);
        this.getTablaValoresGenerales();
      }
    });
  }

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el Valor General " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteValorGnr(item);
      }
    });
  }

  deleteValorGnr(item) {
    this._confiGeneral_service.deleteValorGnr(item).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaValoresGenerales();
            this.openSnackBar("Valor General Eliminado", 200);
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

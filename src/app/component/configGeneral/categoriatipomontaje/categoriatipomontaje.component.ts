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
import { CategoriatipomontajeeditarComponent } from '../categoriatipomontajeeditar/categoriatipomontajeeditar.component';

@Component({
  selector: 'app-categoriatipomontaje',
  templateUrl: './categoriatipomontaje.component.html',
  styleUrls: ['./categoriatipomontaje.component.css'],
  providers: [confGeneralService]
})
export class CategoriatipomontajeComponent extends BaseComponent implements OnInit {

  tit: String = "ADMINISTRACIÓN DE CATEGORIA TIPO MONTAJE";

  textfilter = '';

  displayedColumns: string[] = ['editar','c_nombre', 'c_codigo', 'eliminar'];
  public tabla: MatTableDataSource<any>;
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
    this.getTablaTipoMontaje();
  }  
  
  getTablaTipoMontaje() {  
    this._confiGeneral_service.getTipoMontaje(this.getToken().token).subscribe(
      result => {      
        console.log('retorna del node a tablatipoMontaje')  
        console.log(result);
        this.tabla = new MatTableDataSource<any>(result.data);
        this.tabla.sort = this.sort;
        this.tabla.paginator = this.paginator;

      }, error => {
        this.openSnackBar(error.error, 99);
      });
  } 

  applyFilter(filterValue: String) {
    this.tabla.filter = filterValue.trim().toLowerCase();
  }

  openDialog(tipomontaje): void {
    console.log(tipomontaje)
    const dialogRef = this.dialog.open(CategoriatipomontajeeditarComponent, {
      width: '750px',
      data: {tipomontaje }
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
      data: { titulo: "¿Desea eliminar el Tipo Montaje " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteTipoFoto(item);
      }
    });
  }

  deleteTipoFoto(elemento) {
    this._confiGeneral_service.deleteTipoMontaje(elemento).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaTipoMontaje();
            this.openSnackBar("Tipo Montaje Eliminado", 200);
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

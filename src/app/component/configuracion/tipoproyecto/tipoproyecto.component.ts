import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings'
import { Router } from "@angular/router";
import { BaseComponent } from '../../base/base.component';
import { Confirmar } from '../../../interface/confirmar.interface';
import { TipoProyectoService } from '../../../service/tipoproyecto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TipoproyectoeditComponent} from '../tipoproyectoedit/tipoproyectoedit.component';
import {TipoproyectoconfigComponent} from '../tipoproyectoconfig/tipoproyectoconfig.component';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
@Component({
  selector: 'app-tipoproyecto',
  templateUrl: './tipoproyecto.component.html',
  styleUrls: ['./tipoproyecto.component.css'],
  providers: [TipoProyectoService]
})
export class TipoproyectoComponent extends BaseComponent implements OnInit  {

  textfilter = '';


  displayedColumns: string[] = ['editar', 'c_nombre','confi', 'eliminar'];
  public tabla: MatTableDataSource<any>;
  public confirmar: Confirmar;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _tipoproyecto_service: TipoProyectoService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    super(snackBar, router);
  }


  ngOnInit() {
    this.get_tabla();
  }

  applyFilter(filterValue: String) {
    this.tabla.filter = filterValue.trim().toLowerCase();
  }
  get_tabla() {
    this._tipoproyecto_service.get(this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
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
  openDialog(item): void {
    console.log(item)
    const dialogRef = this.dialog.open(TipoproyectoeditComponent, {
      width: '850px',
      maxHeight: '650px',
      data:item
    });
      dialogRef.afterClosed().subscribe(result => {
        this.get_tabla();
   
    });
  }
  configurar(item):void {
    console.log(item)
    const dialogRef = this.dialog.open(TipoproyectoconfigComponent, {
      width: '850px',
      maxHeight: '650px',
      data:item
    });
      dialogRef.afterClosed().subscribe(result => {
        this.get_tabla();
   
    });
  }
  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar la plantilla " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
       this.delete_proyecto(item);
      }
    });

  }
  delete_proyecto(proyecto){
    console.log(proyecto);
    this._tipoproyecto_service.delete_tipoproyecto(proyecto, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.get_tabla();
            this.openSnackBar("Registro eliminado", 200);
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      }, error => {
        console.error(error);
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }
}

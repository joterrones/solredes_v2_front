import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings'
import { Router } from "@angular/router";
import { BaseComponent } from '../../base/base.component';
import { ProyectoService } from '../../../service/proyecto.service';
import { DetalleproyectoComponent } from '../../general/detalleproyecto/detalleproyecto.component';
@Component({
  selector: 'app-lineatiempo',
  templateUrl: './lineatiempo.component.html',
  styleUrls: ['./lineatiempo.component.css'],
  providers:[ProyectoService]
})
export class LineatiempoComponent extends BaseComponent implements OnInit {

  fases=[];


  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _proyecto_service: ProyectoService,
    public dialog: MatDialog
  ) {
    super(snackBar, router);
  }

  ngOnInit() {
    this.getfase();
  }

  getfase() {
    this._proyecto_service.get_dato_fase(this.getToken().token).subscribe(
      result => {
        console.log(result);
        try {
          if (result.estado) {
            this.fases = result.data;

          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }
  openDialog(item): void {
    const dialogRef = this.dialog.open(DetalleproyectoComponent, {
      width: '850px',
      maxHeight: '650px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

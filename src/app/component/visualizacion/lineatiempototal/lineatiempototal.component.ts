import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings'
import { Router } from "@angular/router";
import { BaseComponent } from '../../base/base.component';
import { ProyectoService } from '../../../service/proyecto.service';
import { DetalleproyectoComponent } from '../../general/detalleproyecto/detalleproyecto.component';
@Component({
  selector: 'app-lineatiempototal',
  templateUrl: './lineatiempototal.component.html',
  styleUrls: ['./lineatiempototal.component.css'],
  providers:[ProyectoService]
})
export class LineatiempototalComponent extends BaseComponent implements OnInit {
  n_idgen_proyecto="";
  c_nombreproyecto="";
  fases=[];


  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _proyecto_service: ProyectoService,
    private _Activatedroute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    super(snackBar, router);
  }

  ngOnInit() {
    this.n_idgen_proyecto = this._Activatedroute.snapshot.paramMap.get("n_idgen_proyecto");
    this.c_nombreproyecto= this._Activatedroute.snapshot.paramMap.get("c_nombreproyecto");
    this.getfase();
  }

  getfase() {
    let rq ={
      n_idgen_proyecto:this.n_idgen_proyecto
    }
    this._proyecto_service.get_dato_fase_historico(rq).subscribe(
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

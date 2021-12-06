import { Component, Inject, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';
import { ProyectoService } from '../../../service/proyecto.service';
import { TipoProyectoService } from '../../../service/tipoproyecto.service';
import { ProyectoInterface } from '../../../interface/proyecto.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-proyectousuario',
  templateUrl: './proyectousuario.component.html',
  styleUrls: ['./proyectousuario.component.css'],
  providers: [ProyectoService]
})
export class ProyectousuarioComponent  extends BaseComponent implements OnInit {
  proyecto: any;
  public tabla: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns: string[] = ['check', 'c_usuario'];

  constructor(public dialogRef: MatDialogRef<ProyectousuarioComponent>,
    private _proyecto_service: ProyectoService,
    @Inject(MAT_DIALOG_DATA) public data: ProyectoInterface,
    public _router: Router,
    public snackBar: MatSnackBar) {
    super(snackBar, _router);
  }

  ngOnInit() {
    this.proyecto = this.data;
    this.getusuarioproyecto();
  }

  getusuarioproyecto() {
    let req = { n_idgen_proyecto: this.proyecto.n_idgen_proyecto }
    this._proyecto_service.getusuarioproyecto(req, this.getToken().token).subscribe(
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
        }
      }, error => {
        this.openSnackBar(error.stack, 99);
      });
  }
  guardar(item) {
    console.log(item);
    item.n_idgen_proyecto = this.proyecto.n_idgen_proyecto;
    this._proyecto_service.guardarusuarioproyecto(item, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
              

            
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
        }
      }, error => {
        this.openSnackBar(error.stack, 99);
      });
  }
}

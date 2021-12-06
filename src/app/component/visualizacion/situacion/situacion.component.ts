import { Component, Inject, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar,MatDialog } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';
import { ProyectoService } from '../../../service/proyecto.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
@Component({
  selector: 'app-situacion',
  templateUrl: './situacion.component.html',
  styleUrls: ['./situacion.component.css'],
  providers: [ProyectoService]
})
export class SituacionComponent extends BaseComponent implements OnInit {
  b_edit = false;
  proyecto: any;
  situacion = { c_situacionactual: "", c_comentario: "", n_idgen_proyecto: 0, n_id_usercrea: 0 };

  constructor(public dialogRef: MatDialogRef<SituacionComponent>,
    private _proyecto_service: ProyectoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) {
    super(snackBar, _router);
  }


  displayedColumns: string[] = ['edit', 'c_situacion', 'c_comentario', 'c_usuario', 'd_fecha', 'eliminar'];
  public tabla: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  ngOnInit() {
    this.proyecto = this.data;
    this.get_situacion();
  }

  edit(item) {
    this.b_edit = true;
    if(item!=null){
    this.situacion = item;
    }else{
      this.situacion = { c_situacionactual: "", c_comentario: "", n_idgen_proyecto: 0, n_id_usercrea: 0 };
    }
  }

  cancelar() {
    this.b_edit = false;
    this.situacion = { c_situacionactual: "", c_comentario: "", n_idgen_proyecto: 0, n_id_usercrea: 0 };
  }

  get_situacion() {
    let req = { n_idgen_proyecto: this.proyecto.n_idgen_proyecto }
    this._proyecto_service.get_situacion(req).subscribe(
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

  guardar() {
    if (this.situacion.c_situacionactual.length > 0) {
      this.situacion.n_idgen_proyecto = this.proyecto.n_idgen_proyecto;
      this.situacion.n_id_usercrea = this.getUser().n_idseg_user;
      this._proyecto_service.save_situacion(this.situacion).subscribe(
        result => {
          try {
            if (result.estado) {
              this.get_situacion();
              this.situacion = { c_situacionactual: "", c_comentario: "", n_idgen_proyecto: 0, n_id_usercrea: 0 };
              this.b_edit = false;
            } else {
              this.openSnackBar(result.mensaje, 99);

            }
          } catch (error) {
            this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER + error, 99);
          }
        }, error => {
          console.error(error);
          try {
            this.openSnackBar(error.error.Detail, error.error.StatusCode);
          } catch (error) {
            this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
          }
        });
    } else {
      this.openSnackBar("Ingrese la situación actual", 200);
    }
  }

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar " + item.c_situacionactual + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.delete_proyecto(item);
      }
    });
  }

  delete_proyecto(item) {
    console.log("Eliminando");
    console.log(item);
    this._proyecto_service.delete_situacion(item).subscribe(
      result => {
        try {
          if (result.estado) {
            this.get_situacion();
            this.openSnackBar("Usuario eliminado", 200);
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

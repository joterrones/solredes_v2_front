import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';
import { ProyectoService } from '../../../service/proyecto.service';
import { MatDialog } from '@angular/material';
import { TarearegistroComponent } from '../../visualizacion/tarearegistro/tarearegistro.component';
@Component({
  selector: 'app-proyectoregistro',
  templateUrl: './proyectoregistro.component.html',
  styleUrls: ['./proyectoregistro.component.css'],
  providers: [ProyectoService]
})
export class ProyectoregistroComponent extends BaseComponent implements OnInit {

  proyecto: any;
  fases = [];
  minDate: Date;
  maxDate: Date;
  c_nombreproyecto=""

  displayedColumns: string[] = ['botones', 'tarea'];
  public tabla: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private _proyecto_service: ProyectoService,
    public _router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) {
    super(snackBar, _router);
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit() {
  }

  cargardatos(proyecto) {
    this.proyecto = proyecto;
    this.c_nombreproyecto = this.proyecto.c_nombreproyecto
    this.get_tarea_proyecto_registro();
  }


  get_tarea_proyecto_registro() {
    let req = { n_idgen_proyecto: this.proyecto.n_idgen_proyecto }
    this._proyecto_service.get_tarea_proyecto_registro(req).subscribe(
      result => {
        try {
          if (result.estado) {
            this.fases = result.data;
            try {
              if (this.fases.length > 0) {
                if (this.fases[0].actividades.length > 0) {
                  this.changetab(this.fases[0].actividades[0].tareas);
                }
              }
            }
            catch (error) {
              this.openSnackBar("No se pudo cargar la lista inicial de tareas!" +error.stack, 99);
            }
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

  changetab(tareas) {
    this.tabla = new MatTableDataSource<any>([]);
    let datagrilla = tareas;
    this.tabla = new MatTableDataSource<any>(datagrilla);
    this.tabla.sort = this.sort;
    this.tabla.paginator = this.paginator;
  }

  openDialogTareaRegistro(item): void {
    const dialogRef = this.dialog.open(TarearegistroComponent, {
      width: '1050px',
      maxHeight: '650px',
      data: {tarea:item, proyecto : this.proyecto}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}


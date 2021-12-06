import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { MatDialog } from '@angular/material';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';
import { ResultadoApi } from '../../../interface/common.interface';
import { TipoProyectoService } from '../../../service/tipoproyecto.service';
import { ProyectoService } from '../../../service/proyecto.service';
import { ProyectoInterface } from '../../../interface/proyecto.interface';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { TareaService } from '../../../service/tarea.service';

@Component({
  selector: 'app-proyectoconfig',
  templateUrl: './proyectoconfig.component.html',
  styleUrls: ['./proyectoconfig.component.css'],
  providers: [TipoProyectoService, ProyectoService, TareaService]
})
export class ProyectoconfigComponent extends BaseComponent implements OnInit {

  edit=false;
  tarea = {
    n_idpro_tareaproyecto:0,
    n_idgen_tarea:0,
    n_posicion:0,
    n_duracion:0,
    b_diasferiados:false,
    n_idgen_proyecto:0,
  };
  proyecto: any;
  plantillas: [];
  fases: [];
  tareas: [];
  actividades: [];
  idplantilla: 0;
  idfase = 0;
  idactividad = 0;
  idtarea = 0;

  displayedColumns: string[] = ['check', 'fase', 'd_fecha', 'n_duracion', 'eliminar'];

  public tabla: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  textfilter = '';
  constructor(public dialogRef: MatDialogRef<ProyectoconfigComponent>,
    private _tipoproyecto_service: TipoProyectoService,
    private _proyecto_services: ProyectoService,
    private _tarea_services: TareaService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: ProyectoInterface,
    public _router: Router,
    public snackBar: MatSnackBar) {
    super(snackBar, _router);
  }
  ngOnInit() {
    this.proyecto = this.data;
    this.getriporpoyecto();
    this.getfase();
    this.getActividad();
    this.getTarea();
   
    this.get_tabla();
  }

  selectPlantilla(idfase) {
    this.idplantilla = idfase;
  }

  selectFase(id) {
    this.idfase = id;
    this.getActividad();
    this.getTarea();
  }

  selectActividad(id) {
    this.idactividad = id;
    this.getTarea();
  }

  selectTarea(id) {
    this.idtarea = id;

  }

  get_tabla() {
    let req = {
      n_idgen_proyecto: this.proyecto.n_idgen_proyecto
    }
    this._proyecto_services.get_tarea_proyecto(req, this.getToken().token).subscribe(
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


  getfase() {
    this._tarea_services.get_fase(this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            console.log(result)
            this.fases = result.data
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

  getTarea() {
    let req = {
      n_idgen_fase: this.idfase,
      n_idgen_actividad: this.idactividad
    }
    this._tarea_services.get_tarea(req, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            console.log(result)
            this.tareas = result.data
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
  
  getActividad() {
    let req = { n_idgen_fase: this.idfase }
    this._tarea_services.get_actividad(req, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            console.log(result)
            this.actividades = result.data
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

  getriporpoyecto() {
    this._tipoproyecto_service.get(this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.plantillas = result.data;
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

  applyFilter(filterValue: String) {
    this.tabla.filter = filterValue.trim().toLowerCase();
  }



  gettarea() {
    if (this.idplantilla != 0) {
      let req = {
        n_idgen_proyecto: this.proyecto.n_idgen_proyecto,
        n_idgen_tipoproyecto: this.idplantilla
      }
      this._proyecto_services.save_tarea_proyecto(req, this.getToken().token).subscribe(
        result => {
          try {
            if (result.estado) {
              this.get_tabla();
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
    } else {
      this.openSnackBar("Seleccione una plantilla", 99);
    }
  }


  guardar() {
   console.log(this.tarea)
    this._proyecto_services.save_tarea_proyecto_individual(this.tarea).subscribe(
      result => {
        try {
          if (result.estado) {
            this.get_tabla();
            this.edit=false;
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

  addTarea(item){
    this.edit=true;
  
    if(item){
      this.tarea = {
        n_idpro_tareaproyecto:item.n_idpro_tareaproyecto,
        n_idgen_tarea:item.n_idgen_tarea,
        n_posicion:item.n_posicion,
        n_duracion:item.n_duracion,
        b_diasferiados:item.b_diasferiados,
        n_idgen_proyecto:this.proyecto.n_idgen_proyecto,
      };
    }else{
      this.tarea = {
        n_idpro_tareaproyecto:0,
        n_idgen_tarea:0,
        n_posicion:0,
        n_duracion:0,
        b_diasferiados:false,
        n_idgen_proyecto:this.proyecto.n_idgen_proyecto,
      };
    }
    console.log(this.tarea);
  }
  cancel(){
    this.edit=false;
  }


  deleteTarea(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el tarea " + item.c_descripciontarea + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.eliminar(item.n_idpro_tareaproyecto);
      }
    });
  }

  eliminar(n_idpro_tareaproyecto){
    let req = {
      n_idpro_tareaproyecto:n_idpro_tareaproyecto
    };
    this._proyecto_services.delete_tarea_proyecto_individual(req).subscribe(
      result => {
        try {
          if (result.estado) {
            this.get_tabla();
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
}

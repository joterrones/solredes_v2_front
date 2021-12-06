import { Component, Inject, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import {  MAT_DIALOG_DATA } from '@angular/material';

import { BaseComponent } from '../../base/base.component';
import { MatDialog } from '@angular/material';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings';
import { ProyectoService } from '../../../service/proyecto.service';
import { MapaService } from '../../../service/mapa.services';
import {TarearegistroguardarComponent} from '../tarearegistroguardar/tarearegistroguardar.component';
@Component({
  selector: 'app-tarearegistro',
  templateUrl: './tarearegistro.component.html',
  styleUrls: ['./tarearegistro.component.css'],
  providers: [ProyectoService, MapaService]
})
export class TarearegistroComponent extends BaseComponent implements OnInit {
  @ViewChild(TarearegistroguardarComponent, { static: false }) hijo: TarearegistroguardarComponent;
  tarea:any;
  tareaproyectos=[];
  proyecto: any;
  tareaproyecto: any;
  n_idpro_tareaproyecto=1;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _proyecto_service: ProyectoService,
    public _router: Router, public dialog: MatDialog,
    public snackBar: MatSnackBar, private changeDetectorRef: ChangeDetectorRef) {
    super(snackBar, _router);
  }

  ngOnInit() {
    this.proyecto = this.data.proyecto;
    this.tarea = this.data.tarea;
    this.get_tarea_edit_proyecto_registro();
  }

  selectTarea(data){
    console.log("datos de la tarea");
    console.log(data)
    this.hijo.setData(data, this.proyecto);
  }

  get_tarea_edit_proyecto_registro() {
    let req = { 
      n_idgen_tarea: this.tarea.n_idgen_tarea,
      n_idgen_proyecto: this.proyecto.n_idgen_proyecto
    }
    this._proyecto_service.get_tarea_edit_proyecto_registro(req).subscribe(
      result => {
        try {
          if (result.estado) {
            this.tareaproyectos = result.data;
              if (this.tareaproyectos.length > 0) {
                  this.n_idpro_tareaproyecto = this.tareaproyectos[0].n_idpro_tareaproyecto;
                  this.selectTarea(this.tareaproyectos[0]);
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
}

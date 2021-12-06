import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';
import { BolsaProyectoService } from '../../../service/bolsaproyecto.service';
import {TareaService} from '../../../service/tarea.service'
@Component({
  selector: 'app-bolsaproyectoedit',
  templateUrl: './bolsaproyectoedit.component.html',
  styleUrls: ['./bolsaproyectoedit.component.css'],
  providers:[BolsaProyectoService,TareaService]
})
export class BolsaproyectoeditComponent extends BaseComponent implements OnInit {
  item: any;
  editar: boolean;
  fases=[];


  constructor(public dialogRef: MatDialogRef<BolsaproyectoeditComponent>,
    private _bolsa_proyecto: BolsaProyectoService,
    private _tarea_service: TareaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _router: Router,
    public snackBar: MatSnackBar) {
    super(snackBar, _router);
  }

  ngOnInit() {
    this.getFase();
    if (this.data == null) {
      this.editar = false;
      this.item = {
          n_idgen_bolsaproyecto: 0,
          c_nombreproyecto: "",
          n_idgen_fase: 0,
          c_responsable: "",
          c_cui: "",
          n_numerominem: "",
          n_localidades: 0,
          n_poblacion: 0,
          n_viviendas: 0,
          n_kmred: 0,
          n_trafos: 0,
          n_lamparas: 0
      };
    } else {
      this.editar = true;
      this.item = this.data;
    }
  
    console.log('Contenido de item');
    console.log(this.item);
  }

  getFase() {

    this._tarea_service.get_fase(this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
           this.fases=result.data
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

  guardar(newForm) {

    this._bolsa_proyecto.save(this.item).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.item });
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

import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { Almacen, Guia, GuiaEditar, Periodos } from '../../../interface/almacen.interface';
import { AlmacenService } from 'src/app/service/almacen.service';

@Component({
  selector: 'app-guiaeditar',
  templateUrl: './guiaeditar.component.html',
  styleUrls: ['./guiaeditar.component.css'],
  providers: [AlmacenService]
})
export class GuiaeditarComponent extends BaseComponent implements OnInit {

  guia: Guia
  almacen: Almacen[];
  editar: boolean;
  periodos: any;
  annio: any;
  mes: any;
  constructor(
    public dialogRef: MatDialogRef<GuiaeditarComponent>,
    public _almacen_service: AlmacenService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _router: Router,
    public snackBar: MatSnackBar) {
    super(snackBar, _router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    if (this.data.guia == null) {
      this.editar = false;
      this.guia = {
        n_idalm_guia: 0,
        n_idalm_almacen: this.data.n_idalm_almacen,
        n_idgen_periodo: 0,
        c_nombre: "",
        c_direccion: "",
        c_ruc: "",
        c_nroguia: "",
        c_observacion: "",
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile,
        n_mes: 0,
        annio: 0
      };

    } else {
      this.editar = true;
      this.guia = this.data.guia;
      console.log(this.guia);
      
    }
    this.almacen = this.data.almacen;
    this.annio = this.data.periodos.annio;
    this.mes = this.data.periodos.mes;
    this.periodos = this.data.periodos.periodos;
    console.log("PERIDOS", this.annio);


    console.log('Contenido de Guia');
    console.log(this.guia);
  }
  descrip = "";
  val: boolean = false;
  guardar(newForm) {
    this.guia.n_id_usermodi = this.usuarioLog.n_idseg_userprofile;    
    switch (this.guia.n_mes) {
      case 1:
        this.descrip = "Enero " + this.guia.annio

        this.periodos.forEach(element => {
          if (this.descrip === element.c_descripcion) {
            this.guia.n_idgen_periodo = element.n_idgen_periodo;
            this.val = true;
            console.log(this.guia.n_idgen_periodo);
          }
        });
        break;
      case 2:
        this.descrip = "Febrero " + this.guia.annio

        this.periodos.forEach(element => {
          if (this.descrip === element.c_descripcion) {
            this.guia.n_idgen_periodo = element.n_idgen_periodo;
            this.val = true;
            console.log(this.guia.n_idgen_periodo);
          }
        });
        break;
      case 3:
        this.descrip = "Marzo " + this.guia.annio

        this.periodos.forEach(element => {
          if (this.descrip === element.c_descripcion) {
            this.guia.n_idgen_periodo = element.n_idgen_periodo;
            this.val = true;
            console.log(this.guia.n_idgen_periodo);
          }
        });
        break;
      case 4:
        this.descrip = "Abril " + this.guia.annio

        this.periodos.forEach(element => {
          if (this.descrip === element.c_descripcion) {
            this.guia.n_idgen_periodo = element.n_idgen_periodo;
            this.val = true;
            console.log(this.guia.n_idgen_periodo);
          }
        });
        break;
      case 5:
        this.descrip = "Mayo " + this.guia.annio

        this.periodos.forEach(element => {
          if (this.descrip === element.c_descripcion) {
            this.guia.n_idgen_periodo = element.n_idgen_periodo;
            this.val = true;
            console.log(this.guia.n_idgen_periodo);
          }
        });
        break;
      case 6:
        this.descrip = "Junio " + this.guia.annio

        this.periodos.forEach(element => {
          if (this.descrip === element.c_descripcion) {
            this.guia.n_idgen_periodo = element.n_idgen_periodo;
            this.val = true;
            console.log(this.guia.n_idgen_periodo);
          }
        });
        break;
      case 7:
        this.descrip = "Julio " + this.guia.annio

        this.periodos.forEach(element => {
          if (this.descrip === element.c_descripcion) {
            this.guia.n_idgen_periodo = element.n_idgen_periodo;
            this.val = true;
            console.log(this.guia.n_idgen_periodo);
          }
        });
        break;
      case 8:
        this.descrip = "Agosto " + this.guia.annio

        this.periodos.forEach(element => {
          if (this.descrip === element.c_descripcion) {
            this.guia.n_idgen_periodo = element.n_idgen_periodo;
            this.val = true;
            console.log(this.guia.n_idgen_periodo);
          }
        });
        break;
      case 9:
        this.descrip = "Setiembre " + this.guia.annio

        this.periodos.forEach(element => {
          if (this.descrip === element.c_descripcion) {
            this.guia.n_idgen_periodo = element.n_idgen_periodo;
            this.val = true;
            console.log(this.guia.n_idgen_periodo);
          }
        });
        break;
      case 10:
        this.descrip = "Octubre " + this.guia.annio

        this.periodos.forEach(element => {
          if (this.descrip === element.c_descripcion) {
            this.guia.n_idgen_periodo = element.n_idgen_periodo;
            this.val = true;
            console.log(this.guia.n_idgen_periodo);
          }
        });
        break;
      case 11:
        this.descrip = "Noviembre " + this.guia.annio

        this.periodos.forEach(element => {
          if (this.descrip === element.c_descripcion) {
            this.guia.n_idgen_periodo = element.n_idgen_periodo;
            this.val = true;
            console.log(this.guia.n_idgen_periodo);
          }
        });
        break;
      case 12:
        this.descrip = "Diciembre " + this.guia.annio

        this.periodos.forEach(element => {
          if (this.descrip === element.c_descripcion) {
            this.guia.n_idgen_periodo = element.n_idgen_periodo;
            this.val = true;
            console.log(this.guia.n_idgen_periodo);
          }
        });
        break;
    }

    if (!this.val) {
      this.openSnackBar("No existe el periodo " + this.descrip, 99);
    }else{
      console.log(this.guia);
      this._almacen_service.saveGuia(this.guia, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.almacen });
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
}

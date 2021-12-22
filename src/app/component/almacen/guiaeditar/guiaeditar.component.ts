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
  periodos: Periodos[];  
  constructor(
    public dialogRef: MatDialogRef<GuiaeditarComponent>,    
    public _almacen_service: AlmacenService,
    @Inject(MAT_DIALOG_DATA) public data: GuiaEditar,
    public _router: Router,
    public snackBar: MatSnackBar) {
      super(snackBar, _router);
  }

  ngOnInit() {

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
        c_observacion:"" 
      };
      
    } else {
      this.editar = true;
      this.guia = this.data.guia; 
      
    }
    this.almacen = this.data.almacen;  
    this.periodos = this.data.periodos;  
    console.log('Contenido de Guia');
    console.log(this.guia);
  }

  guardar(newForm) {
    this.guia;
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

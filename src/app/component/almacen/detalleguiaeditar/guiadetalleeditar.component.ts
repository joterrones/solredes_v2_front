import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { DetalleGuia, DetalleGuiaEditar, Elementos, Guias } from '../../../interface/almacen.interface';
import { AlmacenService } from 'src/app/service/almacen.service';


@Component({
  selector: 'app-guiadetalleeditar',
  templateUrl: './guiadetalleeditar.component.html',
  styleUrls: ['./guiadetalleeditar.component.css'],
  providers: [AlmacenService]
})
export class GuiadetalleeditarComponent extends BaseComponent implements OnInit {

  detalleguia: DetalleGuia;
  editar: boolean;
  guias: Guias[]; 
  elemento: Elementos[]; 


  constructor(
    public dialogRef: MatDialogRef<GuiadetalleeditarComponent>,    
    public _almacen_service: AlmacenService,
    @Inject(MAT_DIALOG_DATA) public data: DetalleGuiaEditar,
    public _router: Router,
    public snackBar: MatSnackBar) {
      super(snackBar, _router);
  }

  ngOnInit() {

    if (this.data.detalleguia == null) {
      this.editar = false;
      this.detalleguia = {
        n_idalm_detalleguia: 0,
        n_idalm_guia: 0, 
        n_idpl_elemento: 0, 
        c_nombreguia: "",
        c_nombreel: "",
        n_cantidad: 0        
      };
      
    } else {
      this.editar = true;
      this.detalleguia = this.data.detalleguia; 
      
    }
    this.guias = this.data.guias;  
    this.elemento = this.data.elemento;  
    console.log('Contenido de Detalle Guia');
    console.log(this.guias);
  }

  guardar(newForm) {
    this.detalleguia;
    this._almacen_service.saveDetalleGuia(this.detalleguia, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.guias });
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

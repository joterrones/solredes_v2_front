import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { Linea, LineaEditar, Tipolinea } from '../../../interface/configGeneral.interface';
//import { ResultadoApi} from '../../../interface/common.interface';

import { confGeneralService } from '../../../service/confGeneral.service';
//import { GeneralService } from '../../../service/general.service';

@Component({
  selector: 'app-lineaeditar',
  templateUrl: './lineaeditar.component.html',
  styleUrls: ['./lineaeditar.component.css'],
  providers: [confGeneralService]
})
export class LineaeditarComponent extends BaseComponent implements OnInit {

  linea: Linea;
  editar: boolean;
  tipolinea: Tipolinea[];

  constructor(
    public dialogRef: MatDialogRef<LineaeditarComponent>,    
    public _confiGeneral_service: confGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: LineaEditar,
    public _router: Router,
    public snackBar: MatSnackBar) {
      super(snackBar, _router);
  }

  ngOnInit() {

    if (this.data.linea == null) {
      this.editar = false;
      this.linea = {
        n_idpl_linea: 0,
        c_nombre: "",
        c_codigo: "",
        n_idpl_tipolinea: 0    
      };
      
    } else {
      this.editar = true;
      this.linea = this.data.linea; 
    }
    this.tipolinea = this.data.tipolinea;    
    console.log('Contenido de Linea');
    console.log(this.linea);
  }

  guardar(newForm) {
    this.linea;
    this._confiGeneral_service.saveLinea(this.linea, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.linea });
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



import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { Linea, LineaEditar, Tipolinea, Zona } from '../../../interface/configGeneral.interface';
import { confGeneralService } from '../../../service/confGeneral.service';


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
  zona: Zona[];

  constructor(
    public dialogRef: MatDialogRef<LineaeditarComponent>,    
    public _confiGeneral_service: confGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: LineaEditar,
    public _router: Router,
    public snackBar: MatSnackBar) {
      super(snackBar, _router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    if (this.data.linea == null) {
      this.editar = false;
      this.linea = {
        n_idpl_linea: 0,
        c_nombre: "",
        c_codigo: "",
        n_idpl_tipolinea: 0,
        n_idpl_zona: 0,
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile
      };
      
    } else {
      this.editar = true;
      this.linea = this.data.linea; 
    }
    this.tipolinea = this.data.tipolinea;  
    this.zona = this.data.zona;  
    console.log('Contenido de Linea');
    console.log(this.linea);
  }

  guardar(newForm) {
    console.log(this.usuarioLog.n_idseg_userprofile);
    
    this.linea.n_id_usermodi = this.usuarioLog.n_idseg_userprofile;
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



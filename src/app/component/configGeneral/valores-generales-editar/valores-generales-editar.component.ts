import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { Tipolinea, EditarTipoLinea, ValoresGenerales, EditarValoresGenerales } from '../../../interface/configGeneral.interface';

import { confGeneralService } from '../../../service/confGeneral.service';

@Component({
  selector: 'app-valores-generales-editar',
  templateUrl: './valores-generales-editar.component.html',
  styleUrls: ['./valores-generales-editar.component.css'],
  providers: [confGeneralService]
})
export class ValoresGeneralesEditarComponent extends BaseComponent implements OnInit {

  valoresGnr: ValoresGenerales;  
  editar: boolean;
  
  constructor(
    
    public dialogRef: MatDialogRef<ValoresGeneralesEditarComponent>,
    private _configGeneralservice: confGeneralService,    
    @Inject(MAT_DIALOG_DATA) public data: EditarValoresGenerales,
    public _router: Router,
    public snackBar: MatSnackBar

  ) { 
    super(snackBar, _router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    if (this.data.valoresGnr == null) {
      this.editar = false;
      this.valoresGnr = {
        n_idgen_valoresgenerales: 0,
        c_codigo: '', 
        c_nombre: '', 
        n_valorunico: 0,
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile              
      };      
    } else {
      this.editar = true;
      this.valoresGnr = this.data.valoresGnr;      
    }    
    console.log('Contenido de valores Generales');
    console.log(this.data.valoresGnr);
  }

  guardar(newForm) {
    this.valoresGnr.n_id_usermodi= this.usuarioLog.n_idseg_userprofile;
    this._configGeneralservice.saveValoresGnr(this.valoresGnr, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.valoresGnr });
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

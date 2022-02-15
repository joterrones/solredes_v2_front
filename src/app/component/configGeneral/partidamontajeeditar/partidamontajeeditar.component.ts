import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { Tipolinea } from '../../../interface/configGeneral.interface';
import { confGeneralService } from '../../../service/confGeneral.service';

@Component({
  selector: 'app-partidamontajeeditar',
  templateUrl: './partidamontajeeditar.component.html',
  styleUrls: ['./partidamontajeeditar.component.css'],
  providers: [confGeneralService]
})
export class PartidamontajeeditarComponent extends BaseComponent implements OnInit {

  editar: boolean;
  tipoMontaje: any; 
  tipolinea: Tipolinea; 
  categoriaMon: any;

  constructor(
    public dialogRef: MatDialogRef<PartidamontajeeditarComponent>,    
    public _confiGeneral_service: confGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _router: Router,
    public snackBar: MatSnackBar) {
      super(snackBar, _router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    console.log("DATA", this.data);
    
    if (this.data.tipoMontaje == null) {
      this.editar = false;
      this.tipoMontaje = {
        n_idmon_tipomontaje: 0,
        c_codigo: "",
        c_nombre: "",
        n_idmon_categoriatipomontaje: 0,
        n_idpl_tipolinea: 0,
        c_unidadmedida: "",
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile
      };
      
    } else {
      this.editar = true;
      this.tipoMontaje = this.data.tipoMontaje; 
    }
    this.tipolinea = this.data.tipolinea;
    this.categoriaMon = this.data.categoriaMon;
    console.log('Contenido de tipoMontaje');
    console.log(this.tipoMontaje);
  }

  guardar(newForm) {    
    
    this.tipoMontaje.n_id_usermodi = this.usuarioLog.n_idseg_userprofile;
    console.log(this.tipoMontaje);
    
    this._confiGeneral_service.saveTipoMontaje(this.tipoMontaje, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.tipoMontaje });
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

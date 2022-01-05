import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { Proyecto, Zona, ZonaEditar } from '../../../interface/configGeneral.interface';

import { confGeneralService } from '../../../service/confGeneral.service';


@Component({
  selector: 'app-zonaedit',
  templateUrl: './zonaedit.component.html',
  styleUrls: ['./zonaedit.component.css'],
  providers: [confGeneralService]
})
export class ZonaeditComponent extends BaseComponent implements OnInit {

  zona: Zona;  
  editar: boolean;
  
  constructor(
    
    public dialogRef: MatDialogRef<ZonaeditComponent>,
    private _configGeneralservice: confGeneralService,    
    @Inject(MAT_DIALOG_DATA) public data: ZonaEditar,
    public _router: Router,
    public snackBar: MatSnackBar

  ) { 
    super(snackBar, _router);
  }

  ngOnInit() {
    if (this.data.zona == null) {
      this.editar = false;      
      this.zona = {
        n_idpl_zona:0,
        n_idpro_proyecto: this.proyecto.n_idpro_proyecto,
        c_codigo:'',
        c_nombre:''                      
      };      
    } else {
      this.editar = true;
      this.zona = this.data.zona;      
    }
    this.proyecto = this.data.proyecto;       
    console.log('Contenido de zona');
    console.log(this.data.zona);
  }

  guardar(newForm) {
    this.zona;
    this._configGeneralservice.saveZona(this.zona, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.zona });
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

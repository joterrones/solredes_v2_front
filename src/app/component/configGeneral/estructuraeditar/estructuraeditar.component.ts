import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { EditarEstructura, Estructura, Zona } from '../../../interface/configGeneral.interface';

import { confGeneralService } from '../../../service/confGeneral.service';

@Component({
  selector: 'app-estructuraeditar',
  templateUrl: './estructuraeditar.component.html',
  styleUrls: ['./estructuraeditar.component.css'],
  providers: [confGeneralService]
})
export class EstructuraeditarComponent extends BaseComponent implements OnInit {

  estructura: Estructura;  
  editar: boolean;
  zona: Zona[];
  constructor(
    
    public dialogRef: MatDialogRef<EstructuraeditarComponent>,
    private _configGeneralservice: confGeneralService,    
    @Inject(MAT_DIALOG_DATA) public data: EditarEstructura,
    public _router: Router,
    public snackBar: MatSnackBar   

  ) { 
    super(snackBar, _router);
  }

  ngOnInit() {
    if (this.data.estructura == null) {
      this.editar = false;
      this.estructura = {
        n_idpl_estructura:0,
        n_idpl_zona: 0,
        c_nombre:'',
        c_latitud: '',
        n_altitud: 0,
        c_longitud: '',              
      };      
    } else {
      this.editar = true;
      this.estructura = this.data.estructura;      
    }  
    this.zona = this.data.zona;  
    console.log('Contenido de Estructura');
    console.log(this.data.zona);
  }
  
  guardar(newForm) {
    this.estructura;
    this._configGeneralservice.saveEstructura(this.estructura, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.estructura });
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

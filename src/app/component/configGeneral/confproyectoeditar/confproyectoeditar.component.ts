import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { EditarProyecto, Proyecto } from '../../../interface/configGeneral.interface';

import { confGeneralService } from '../../../service/confGeneral.service';

@Component({
  selector: 'app-confproyectoeditar',
  templateUrl: './confproyectoeditar.component.html',
  styleUrls: ['./confproyectoeditar.component.css'],
  providers: [confGeneralService]
})
export class ConfproyectoeditarComponent extends BaseComponent implements OnInit {

  proyecto: Proyecto;  
  editar: boolean;
  
  constructor(
    
    public dialogRef: MatDialogRef<ConfproyectoeditarComponent>,
    private _configGeneralservice: confGeneralService,    
    @Inject(MAT_DIALOG_DATA) public data: EditarProyecto,
    public _router: Router,
    public snackBar: MatSnackBar
    
  ) { 
    super(snackBar, _router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    if (this.data.proyecto == null) {
      this.editar = false;
      this.proyecto = {
        n_idpro_proyecto:0,
        c_nombre:'',
        c_detalle:'',
        c_color:'',
        c_rutalogo: '',
        c_rutaimg:'',
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile
      };      
    } else {
      this.editar = true;
      this.proyecto = this.data.proyecto;      
    }    
    console.log('Contenido de proyecto');
    console.log(this.data.proyecto);
  }
  
  guardar(newForm) {
    this.proyecto.n_id_usermodi= this.usuarioLog.n_idseg_userprofile;
    this._configGeneralservice.saveProyecto(this.proyecto, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.proyecto });
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

import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { EditarTraGrupos, Proyectos,TraGrupos} from '../../../interface/configGeneral.interface';
import { confGeneralService } from '../../../service/confGeneral.service';

@Component({
  selector: 'app-tragrupo-editar',
  templateUrl: './tragrupo-editar.component.html',
  styleUrls: ['./tragrupo-editar.component.css'],
  providers: [confGeneralService]
})
export class TragrupoEditarComponent extends BaseComponent implements OnInit {

  traGrupos: TraGrupos;
  editar: boolean;
  proyectos: Proyectos[];

  constructor(
    public dialogRef: MatDialogRef<TragrupoEditarComponent>,    
    public _confiGeneral_service: confGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: EditarTraGrupos,
    public _router: Router,
    public snackBar: MatSnackBar) {
      super(snackBar, _router);
  }

  ngOnInit() {

    if (this.data.traGrupos == null) {
      this.editar = false;
      this.traGrupos = {
        n_idtra_grupo: 0,
        n_idpro_proyecto: 0,
        c_nombre: ""
      };
      
    } else {
      this.editar = true;
      this.traGrupos = this.data.traGrupos; 
    }
    console.log(this.traGrupos);
    
  }

  guardar(newForm) {
    console.log(this.traGrupos);
    
    this.traGrupos;
    this._confiGeneral_service.savetraGrupos(this.traGrupos, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.traGrupos });
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

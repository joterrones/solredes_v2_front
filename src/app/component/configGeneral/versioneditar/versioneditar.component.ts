import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { EditarVersion, Version } from 'src/app/interface/configGeneral.interface';
import { confGeneralService } from 'src/app/service/confGeneral.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-versioneditar',
  templateUrl: './versioneditar.component.html',
  styleUrls: ['./versioneditar.component.css'],
  providers: [confGeneralService]
})
export class VersioneditarComponent extends BaseComponent implements OnInit {

  version: Version
  editar: boolean;

  constructor(
    
    public dialogRef: MatDialogRef<VersioneditarComponent>,
    private _configGeneralservice: confGeneralService,    
    @Inject(MAT_DIALOG_DATA) public data: EditarVersion,
    public _router: Router,
    public snackBar: MatSnackBar

  ) { 
    super(snackBar, _router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    if (this.data.version == null) {
      this.editar = false;
      this.version = {
        n_idv_cabecera: 0,
        c_cabecera:'',         
        c_fecha: '',
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile
      };      
    } else {
      this.editar = true;
      this.version = this.data.version;      
    }    
    console.log(this.data.version);
  }

  guardar(newForm) {
    this.version.n_id_usermodi = this.usuarioLog.n_idseg_userprofile;
    this._configGeneralservice.saveVersion(this.version, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.version });
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

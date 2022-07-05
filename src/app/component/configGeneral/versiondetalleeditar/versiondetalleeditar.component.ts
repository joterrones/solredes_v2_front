import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { DetalleVersion, EditarDetalleVersion } from 'src/app/interface/configGeneral.interface';
import { confGeneralService } from 'src/app/service/confGeneral.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-versiondetalleeditar',
  templateUrl: './versiondetalleeditar.component.html',
  styleUrls: ['./versiondetalleeditar.component.css'],
  providers: [confGeneralService]
})
export class VersiondetalleeditarComponent extends BaseComponent implements OnInit {

  editar: boolean;
  detalle_version: DetalleVersion
  cabecera = '';
  constructor(
    
    public dialogRef: MatDialogRef<VersiondetalleeditarComponent>,
    private _configGeneralservice: confGeneralService,    
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _router: Router,
    public snackBar: MatSnackBar

  ) { 
    super(snackBar, _router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    this.cabecera = this.data.c_cabecera
    if (this.data.detalle_version == null) {
      this.editar = false;
      this.detalle_version = {
        n_idv_detalle: 0,
        n_idv_cabecera: this.data.n_idv_cabecera,
        c_detalle:'',         
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile
      };      
    } else {
      this.editar = true;
      this.detalle_version = this.data.detalle_version;      
    }    
    console.log(this.data.detalle_version);
  }

  guardar(newForm) {
    this.detalle_version.n_id_usermodi = this.usuarioLog.n_idseg_userprofile;
    console.log(this.detalle_version);

    this._configGeneralservice.saveDetalleVersion(this.detalle_version, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.detalle_version });
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

import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { confGeneralService } from '../../../service/confGeneral.service';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { TraGrupos } from 'src/app/interface/configGeneral.interface';
import { ConfirmComponent } from '../../general/confirm/confirm.component';

@Component({
  selector: 'app-proyectousuaio',
  templateUrl: './proyectousuaio.component.html',
  styleUrls: ['./proyectousuaio.component.css'],
  providers: [confGeneralService]
})
export class ProyectousuaioComponent extends BaseComponent implements OnInit {
  
  ProUser = [];
  txtGrupo = '';
  constructor(
    public dialog: MatDialog,
    public dialogAsigPro: MatDialogRef<ProyectousuaioComponent>,
    private _confiGeneral_service: confGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: TraGrupos,
    public _router: Router,
    public snackBar: MatSnackBar
    ){
    super(snackBar, _router);
    }

  ngOnInit() {   
    this.txtGrupo = this.data.c_nombre.toString()
    this.usuarioLog = this.getUser().data;
    this.getProUser();
  }


  getProUser(){
    console.log(this.data.n_idtra_grupo);
    let request = {
      n_idtra_grupo: this.data.n_idtra_grupo,
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto
    }
    this._confiGeneral_service.getProUser(request,this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          console.log("ProUser",resultado.data);
          this.ProUser = resultado.data;
        } else {
          this.openSnackBar(resultado.mensaje, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  resetProUser(){
    let request = {
      n_idtra_grupo: this.data.n_idtra_grupo
    }
    console.log(this.data.n_idtra_grupo);
    
    this._confiGeneral_service.resetProUser(request,this.getToken().token).subscribe(
      result => {
        if (result.estado) {
          this.dialogAsigPro.close({ flag: true });
        } else {
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  
  guardar(element) {    
    let request  ={ 
      n_idtra_grupo: this.data.n_idtra_grupo,
      n_idseg_userprofileArray: [element.n_idseg_userprofileusu],
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    if (element.b_activo) {
      this._confiGeneral_service.denegarAllProuser(request, this.getToken().token).subscribe(
        result => {
          try {
            if (result.estado) {
              this.openSnackBar("Acción completada", 99);
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
    } else {      
      this._confiGeneral_service.saveProUser(request, this.getToken().token).subscribe(
        result => {
          try {
            if (result.estado) {
              this.openSnackBar("Acción completada", 99);
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

  asignarAll(): void {
    let array = this.ProUser;
    console.log(array);
    let elementArray = [];
    
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Seguro que desea asignar todos los usuarios? \n\r"+ 
                      "Se asignará "+array.length+ " usuarios"
            }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        array.forEach(e => {
          elementArray.push(e.n_idseg_userprofileusu);
        });
        let request  ={ 
          n_idtra_grupo: this.data.n_idtra_grupo,
          n_idseg_userprofileArray: elementArray,
          n_id_usermodi: this.usuarioLog.n_idseg_userprofile
        }
        console.log("Envio datos ProUser",request);
        
        this._confiGeneral_service.saveProUser(request, this.getToken().token).subscribe(
          result => {
            try {
              if (result.estado) {
                this.openSnackBar("Acción completada", 99);
                this.dialogAsigPro.close({ flag: true });
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
    });
    
    
  }

  denegarrAll(): void {
    let array = this.ProUser;   
    
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Seguro que desea denegar todos los usuarios? \n\r"+ 
                      "Se denegará "+array.length+ " usuarios"
            }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resetProUser();
        this.openSnackBar("Acción completada", 99);
      }
    });
    
    
  }
}

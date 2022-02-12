import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';
import {MatListModule} from '@angular/material/list';
import { confGeneralService } from '../../../service/confGeneral.service';
import { EditarProyecto, Proyecto } from 'src/app/interface/configGeneral.interface';

@Component({
  selector: 'app-confproyectocolor',
  templateUrl: './confproyectocolor.component.html',
  styleUrls: ['./confproyectocolor.component.css'],
  providers: [confGeneralService]
  
})
export class ConfproyectocolorComponent extends BaseComponent implements OnInit {

  proyecto: Proyecto;

  typesOfShoes= [{color:'Rojo', hex:'#c62828'}, 
                {color:'Verde', hex:'#388e3c'}, 
                {color:'Azul', hex:'#0d47a1'}, 
                {color:'Anaranjado', hex:'#e65100'}, 
                {color:'Celeste', hex:'#0288d1'},
                {color:'Negro', hex:'#212121'},
                {color:'Gris', hex:'#455a64'}, 
                {color:'Morado', hex:'#6a1b9a'}
  ];
  constructor(
    public dialogAsigPro: MatDialogRef<ConfproyectocolorComponent>,
    private _confiGeneral_service: confGeneralService,  
    @Inject(MAT_DIALOG_DATA) public data: EditarProyecto,
    public _router: Router,    
    public snackBar: MatSnackBar
    ){
    super(snackBar, _router);
    }

  ngOnInit() {
    console.log(this.data);
    
    this.usuarioLog = this.getUser().data;
    this.proyecto.n_idpro_proyecto = this.data.proyecto.n_idpro_proyecto;    
  }

  guardar(newForm) {
    console.log(newForm._value);
      let request  ={ 
        c_color: newForm._value,
        n_idpro_proyecto: this.proyecto.n_idpro_proyecto,        
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile
      }      
      this._confiGeneral_service.saveColorPro(request, this.getToken().token).subscribe(
        result => {
          try {
            if (result.estado) {
              this.dialogAsigPro.close({ flag: true });
              this.openSnackBar("GUARDADO! Vuelva a ingresar al Proyecto", 99);
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

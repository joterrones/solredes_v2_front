import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { confGeneralService } from 'src/app/service/confGeneral.service';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-versiones',
  templateUrl: './versiones.component.html',
  styleUrls: ['./versiones.component.css'],
  providers: [confGeneralService, SeguridadService]
})
export class VersionesComponent  implements OnInit {
  leermas = false;
  arrCabecera = [];
  arrDetalle = [];
  arrCabecera2 = [];
  arrDetalle2 = [];
  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _confiGeneral_service: confGeneralService, 
    public _seguridad_service: SeguridadService,
  ) { 

  }

  ngOnInit() {
    this.getVersiones()

  }

  leer(){   
    this.leermas = !this.leermas
  }

  getVersiones(){
    let request = {
      n_idpro_proyecto: 5     
    }
    this._confiGeneral_service.getVersiones(request).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        let aux = 0;
        let cont = 0;
        if (resultado.estado) {  
          resultado.data.forEach(element => {
            if (cont < 3) {
              this.arrDetalle.push({
                n_idv_cabeceradt: element.n_idv_cabeceradt,
                c_detalle: element.c_detalle
              })          
              if (element.n_idv_cabecera != aux) {
                cont++;
                aux = element.n_idv_cabecera
                this.arrCabecera.push({
                  n_idv_cabecera: element.n_idv_cabecera,
                  c_cabecera: element.c_cabecera,
                  c_fecha: element.c_fecha,
                })
              }
            }else{
              this.arrDetalle2.push({
                n_idv_cabeceradt: element.n_idv_cabeceradt,
                c_detalle: element.c_detalle
              })          
              if (element.n_idv_cabecera != aux) {
                aux = element.n_idv_cabecera
                this.arrCabecera2.push({
                  n_idv_cabecera: element.n_idv_cabecera,
                  c_cabecera: element.c_cabecera,
                  c_fecha: element.c_fecha,
                })
              }
            }
          });
          console.log(this.arrCabecera);
          
        } else {
          //this.openSnackBar(resultado.mensaje, 99);
        }
      }, error => {
        /*try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }*/
      });
  }
}

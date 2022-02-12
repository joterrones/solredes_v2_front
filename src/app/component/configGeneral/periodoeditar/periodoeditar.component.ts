import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { Periodos } from 'src/app/interface/almacen.interface';
import { AlmacenService } from 'src/app/service/almacen.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-periodoeditar',
  templateUrl: './periodoeditar.component.html',
  styleUrls: ['./periodoeditar.component.css'],
  providers: [AlmacenService]
})
export class PeriodoeditarComponent extends BaseComponent implements OnInit {

  periodo: Periodos;
  editar: boolean;
  annio: any;
  mes = [
    { n_mes: 1, mes:'Enero' },
    { n_mes: 2, mes:'Febrero' },
    { n_mes: 3, mes:'Marzo' },
    { n_mes: 4, mes:'Abril' },
    { n_mes: 5, mes:'Mayo' },
    { n_mes: 6, mes:'Junio' },
    { n_mes: 7, mes:'Julio' },
    { n_mes: 8, mes:'Agosto' },
    { n_mes: 9, mes:'Setiembre' },
    { n_mes: 10, mes:'Octubre' },
    { n_mes: 11, mes:'Noviembre' },
    { n_mes: 12, mes:'Diciembre' },
  ];

  constructor(
    public dialogRef: MatDialogRef<PeriodoeditarComponent>,
    public _almacen_service: AlmacenService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _router: Router,
    public snackBar: MatSnackBar) {
    super(snackBar, _router);
  }
  
  

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    if (this.data.periodo == null) {
      this.editar = false;
      this.periodo = {
        n_idgen_periodo: 0,
        c_descripcion: "",
        annio: 0,
        mes: "",
        n_mes: 0,
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile
      };
      console.log(this.periodo);
    }else{
      this.periodo = this.data.periodo
      this.annio = this.data.periodoAll.annio;      
      console.log(this.periodo);
      
    }
  }

  guardar(newForm) {
    this.periodo.n_id_usermodi= this.usuarioLog.n_idseg_userprofile;
    
    this.mes.forEach(element => {
      if(this.periodo.n_mes == element.n_mes){
        this.periodo.mes = element.mes;
        this.periodo.c_descripcion = this.periodo.mes +" "+ this.periodo.annio;
      }
    });
    console.log(this.periodo);
    this._almacen_service.savePeriodo(this.periodo, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.periodo });
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

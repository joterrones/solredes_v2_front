import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { ArmadoService } from 'src/app/service/armado.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-detallearmado',
  templateUrl: './detallearmado.component.html',
  styleUrls: ['./detallearmado.component.css'],
  providers: [ArmadoService]
})
export class DetallearmadoComponent extends BaseComponent implements OnInit {

  tipoarmado: Array<any>;
  idtipoarmado:number;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any ,
    public _armado_service:ArmadoService,
    public snackBar: MatSnackBar,
    public _router :Router
    ) {
      super(snackBar,_router);
    }

  ngOnInit() {
    
    this.tipoarmado = this.data.combo;
    if(this.data.item==null){
      this.data.item={
        n_idpl_armado:0,
        c_codigo:""
      }
    }
    
  }

  guardar(newForm){
    try {      
        this._armado_service.insert(this.data.item,this.getProyect()).subscribe(
          result => {
            if(result.estado){
              this.dialogRef.close({flag:this.data.estado,data:this.data.data});
            }else{
              this.openSnackBar(result.mensaje, 99);
            }
          }, error => {
              this.openSnackBar(<any>error, 99);
          
          });
    } catch (error) {
      this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
    }
  }

}

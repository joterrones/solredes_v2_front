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
  file: File;
  procesando: boolean = false;
  tipoarmado: Array<any>;
  iconoMapa: Array<any>;
  srcimg: string = "assets/mapa/";
  idtipoarmado:number;
  editLamina: boolean = true;

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
    console.log(this.data.item);
    
    this.tipoarmado = this.data.combo; 
    
    this.iconoMapa = [
      {c_iconomapa:'CAC'},{c_iconomapa:'MD'},{c_iconomapa:'PEX'},{c_iconomapa:'PAT'},
      {c_iconomapa:'RI'},{c_iconomapa:'RV'},{c_iconomapa:'vivienda'},{c_iconomapa:'AP'}
    ]

    if(this.data.item==null){
      this.data.item={
        n_idpl_armado:0,
        c_codigo:"",
        c_nombre:"",
        c_codigo_corto:"",
        n_idpro_proyecto: this.proyecto.n_idpro_proyecto
      }
    }
    if(this.data.item.c_nombrelamina == null){
      this.editLamina = false;
    }
    this.data.item.n_idpro_proyecto = this.proyecto.n_idpro_proyecto;
    
  }

  guardar(newForm){
    console.log(this.data.item);
    
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

  uploadfile= async (files: FileList) =>{    
    this.file = files.item(0);  
    console.log("CARGA ARC",this.file)      
    this.uploadFileToActivity();
    this.procesando = false;    
  }
  uploadFileToActivity() {
    let extension = this.file.name;
    //console.log(this.file.type);
    this._armado_service.uploadfile(extension, this.proyecto.n_idpro_proyecto+"_Proyecto", this.file, this.getToken().token).subscribe(
      result => {
        if (result.estado) {
          this.editLamina = true;
          this.data.item.c_nombrelamina = result.c_nombre;
          this.data.item.c_rutaimg = result.c_ruta;
          //this.rutas.push(result.c_ruta);
          this.openSnackBar(result.mensaje, 99);
        } else {
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        this.procesando = false;
        this.openSnackBar(<any>error, 99);
        alert(error.error);
      });
  }

}

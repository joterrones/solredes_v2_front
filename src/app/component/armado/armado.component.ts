import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { ArmadoService } from 'src/app/service/armado.service';
import { GeneralService } from 'src/app/service/general.service';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { ArmadoconfigmontajeComponent } from '../armadoconfigmontaje/armadoconfigmontaje.component';
import { BaseComponent } from '../base/base.component';
import { DetallearmadoComponent } from '../detallearmado/detallearmado.component';
import { ConfirmComponent } from '../general/confirm/confirm.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-armado',
  templateUrl: './armado.component.html',
  styleUrls: ['./armado.component.css'],
  providers: [ArmadoService,GeneralService,SeguridadService]
})
export class ArmadoComponent extends BaseComponent implements OnInit {

  tit = 'ADMINISTRACIÓN DE ARMADOS';

  pantallaRol= [];
  permisoEdit: boolean = false;

  tabla: MatTableDataSource<any>;
  tablaconfig: MatTableDataSource<any>;
  displayedColumns: string[] = ['ver', 'c_codigo','c_nombre','c_codigo_corto','c_iconomapa','c_nombrelamina','n_version','tipo_armado','config','configmont','eliminar'];
  displayedColumnsConfig: string[] = [ 'c_codigo','c_nombre','c_unidad','n_cantidad'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  config:boolean=false;

  tipoarmado: Array<any>;
  idtipoarmado: number;

  version: Array<any>;
  idversion: number;

  armado:any;

  general: Array<any>;
  url_lamina:String;
  url_iconomapa:String;
  urlPdf: string =""
  srcimg: string = "assets/mapa/";

  constructor(
    public _armado_service: ArmadoService,
    public _general_service: GeneralService,
    public _seguridad_service: SeguridadService,
    public dialog: MatDialog,
    public snack_1: MatSnackBar,
    public router: Router
    ) {
      super(snack_1,router)
    }
  
  ngOnInit() {
    this.usuarioLog = this.getUser().data;    
    this.getPantallaRol();
    //this.getGeneral();
    this.getTipoArmado();
    this.getversion();
    this.urlPdf = environment.urlArchivo;
    this.getTabla();
  }

  onSelectTipoArmado(id) {
    this.idtipoarmado = id;
    this.getTabla();
  }

  onSelectVersion(id) {
    this.idversion = id;
    this.getTabla();
  }
  
  getTipoArmado() {
    this._armado_service.gettipoarmado(this.getProyect()).subscribe(
      result => {
        if (result.estado) {
          this.tipoarmado= new Array<any>();
          this.tipoarmado=result.data;
        } else {
          this.openSnackBar(result.data.mensaje, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error, 99);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  getversion() {
    this._armado_service.getversion(this.getProyect()).subscribe(
      result => {
        if (result.estado) {
          this.version= new Array<any>();
          this.version=result.data;
        } else {
          this.openSnackBar(result.data.mensaje, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error, 99);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  /*getGeneral(){

    this._general_service.get(this.getProyect()).subscribe(
      result => {
   
        this.general = new Array<any>();
        this.general = result.data;

        let lamina =this.general.filter(function(item){
          return item.c_codigo =="URL_LAMINA";
        })
        
        if(lamina.length>0){
          this.url_lamina =  lamina[0].c_nombre;
        }

        let iconomapa = this.general.filter(function(item){
          return item.c_codigo =="URL_ICONOMAPA";
        })

        if(iconomapa.length>0){
          this.url_iconomapa =  lamina[0].c_nombre;
        }
    
      }, error => {
      });
  }*/
  
  applyFilter(filterValue: string) {
    
    this.tabla.filter = filterValue.trim().toLowerCase();
  }
  applyFilterConfig(filterValue: string) {
    
    this.tablaconfig.filter = filterValue.trim().toLowerCase();
  }
  getTabla() {
    var request = {
      n_idpl_tipoarmado:this.idtipoarmado,
      n_version:this.idversion,
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto
    }
    console.log(request);
    
    this._armado_service.get(request,this.getProyect()).subscribe(
      result => {
        if(result.estado){
          console.log(result.data);
          
          this.tabla = new MatTableDataSource<any>(result.data);
          this.tabla.sort = this.sort;
          this.tabla.paginator = this.paginator;
        }else{
 
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        this.openSnackBar(<any>error, 99);        
      });
  }

  getTablaConfig(id) {
    
    let request = {n_idpl_armado:id}
    this._armado_service.getconfigarmado(request,this.getProyect()).subscribe(
      result => {
        if(result.estado){
          this.tablaconfig = new MatTableDataSource<any>(result.data);
          this.tablaconfig.sort = this.sort;
          this.tablaconfig.paginator = this.paginator;
          console.log(result.data);
          
        }else{
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        this.openSnackBar(<any>error, 99);
      });
  }

  openDialog(item,tipoarmado): void {
    const dialogRef = this.dialog.open(DetallearmadoComponent, {
      width: '750px',
      data: {item:item,combo:tipoarmado}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getTabla();
    });
  }

  configurar(item){
    this.config=true;
    this.armado=item;
    this.getTablaConfig(item.n_idpl_armado);
  }
  back(){
    this.config=false;
    this.armado=null;
  }

  keyPress(event: any,item) {
    if(event.key==="Enter"){
        if(item.n_cantidad!=""){
          let request ={
            n_idpl_armado:this.armado.n_idpl_armado,
            n_idpl_elemento:item.n_idpl_elemento,
            n_cantidad:parseFloat(item.n_cantidad)
          }
          try {
            this._armado_service.insertconfigarmado(request,this.getProyect()).subscribe(
              result => {
                if(result.estado){
                  this.openSnackBar("Dato Guardado",200);
                }else{
                  this.openSnackBar(result.mensaje, 99);
                }
              }, error => {
                console.log(<any>error);
            
                  this.openSnackBar(<any>error, 99);
              
              });
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      } else{
        this.openSnackBar("Solo números", 99);
        item.n_cantidad = 0;
      }
    }
  }
  public setparametros(n_version){
    this.idversion=n_version;
    this.getTabla();
  }
  onFocus(item){

  }
  
  openDialogConfigMontaje(item): void {
    const dialogRef = this.dialog.open(ArmadoconfigmontajeComponent, {
      width: '1250px',
      data: {item:item}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getTabla();
    });
  }

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el Armado " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteArmado(item);
      }
    });
  }

  deleteArmado(item) {
    this._armado_service.deleteArmado(item).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTabla();
            this.openSnackBar("Armado eliminado", 200);
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  getPantallaRol() {
    let request = {
      n_idseg_userprofile: this.usuarioLog.n_idseg_userprofile
    }
    this._seguridad_service.getPantallaRol(request, this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          this.pantallaRol = resultado.data;
          this.pantallaRol.forEach(element => {            
            if(element.c_codigo === 'ma-adarm'){
              console.log(element);
              console.log(element.c_codigo);
              if(element.c_permiso === 'MO'){
                this.permisoEdit = true;
              }
            }
          });
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



}

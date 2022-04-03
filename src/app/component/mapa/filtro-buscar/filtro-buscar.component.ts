import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { transformWithProjections } from 'ol/proj';
import { textHeights } from 'ol/render/canvas';
import { AppSettings } from 'src/app/common/appsettings';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { confGeneralService } from 'src/app/service/confGeneral.service';
import { GeneralService } from 'src/app/service/general.service';
import { MapaService } from 'src/app/service/mapa.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-filtro-buscar',
  templateUrl: './filtro-buscar.component.html',
  styleUrls: ['./filtro-buscar.component.css'],
  providers: [confGeneralService, MapaService,GeneralService]
})
export class FiltroBuscarComponent extends BaseComponent implements OnInit {

  zona = [];
  tipolinea = [];
  linea = [];
  estructura = [];

  n_idpl_tipolinea = 0;
  idversion = 0;      
  n_idpl_zona = 0;
  n_idpl_linea = 0;
  c_estructura = '';
  buscar = '';

  lat: number;
  lng: number;
  data: any;
  viewLinea = false;
  viewBar = false;

  constructor(
    public dialogRef: MatDialogRef<FiltroBuscarComponent>,
    public _router: Router,
    public snackBar: MatSnackBar,    
    public _mapa_service: MapaService,
    public _general_service:GeneralService,
    public _confiGeneral_service: confGeneralService,    
  ) { super(snackBar, _router); }

  ngOnInit() {
    this.getzona();
    this.gettipolinea();
   // this.getLinea();
  }

  
  seleccionarTipoLinea(id){
    this.n_idpl_tipolinea = id;
    this.getLinea();
  }

  seleccionarZona(id){
    this.n_idpl_zona = id;
    this.getLinea();
  }

  seleccionarLinea(id){
    this.n_idpl_linea = id;
  }


  buscarEstruct(dato){
    this.viewBar = true;
    let request = {
      n_version: this.idversion,
      n_idpl_tipolinea: this.n_idpl_tipolinea,
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto,
      n_idpl_zona: this.n_idpl_zona,
      n_idpl_linea: this.n_idpl_linea,
      c_nombre: this.buscar
    }    
    console.log(request);
    ///Cambiar
    this._mapa_service.buscarEstruct(request,this.getToken().token).subscribe(
      result =>{
        console.log(result.data.length);
        if(result.data.length > 0 && result.estado){
          console.log(result.data);
          this.lat = parseFloat(result.data[0].c_latitud);
          this.lng = parseFloat(result.data[0].c_longitud);    
          this.data = {
            lat: this.lat,
            lng: this.lng
          }
          console.log(this.data); 
          this.viewBar = false;             
          this.dialogRef.close(this.data);
        }else if(result.data.length == 0){          
          this.dialogRef.close();
          this.openSnackBar("No se encontro resultados", 99);
        }
        
    }, error =>{
      try {
        this.openSnackBar(error.error.Detail, error.error.StatusCode);
      } catch (error) {
        this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
      }
    });
  }

  getzona(){
    let request = {
      n_idpl_zona: 0,
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto      
    }
    this._confiGeneral_service.getZona(request,this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          //console.log(resultado.data);          
          this.zona = resultado.data;
          //console.log(this.zona);
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

  gettipolinea() {
    
    this._general_service.gettipolinea(this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          this.tipolinea = resultado.data;
          //console.log(this.tipolinea);
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

  getLinea() {        
    var request = {      
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto,
      n_idpl_zona: this.n_idpl_zona,
      n_idpl_tipolinea: this.n_idpl_tipolinea
    }
    console.log(request);
    
    this._mapa_service.getLineaFiltro(request, this.getToken().token).subscribe(
      result => {        
          if (result.estado) {
            console.log(result.data);   
            this.linea = result.data;                    
          } else {
            this.openSnackBar(result.mensaje, 99);
          }        
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }

}

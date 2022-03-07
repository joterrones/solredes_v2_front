import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { confGeneralService } from 'src/app/service/confGeneral.service';
import { MapaService } from 'src/app/service/mapa.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-filtro-buscar',
  templateUrl: './filtro-buscar.component.html',
  styleUrls: ['./filtro-buscar.component.css'],
  providers: [confGeneralService, MapaService]
})
export class FiltroBuscarComponent extends BaseComponent implements OnInit {

  zona = [];
  tipolinea = [];
  linea = [];
  estructura = [];

  c_tipolinea = '';
  idversion = 0;      
  c_zona = '';
  c_linea = '';
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
  ) { super(snackBar, _router); }

  ngOnInit() {
    this.getzona();
    this.gettipolinea();
    this.getLinea();
  }


  buscarEstruct(dato){
    this.viewBar = true;
    let request = {
      n_version: this.idversion,
      c_tipolinea: this.c_tipolinea,
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto,
      c_zona: this.c_zona,
      c_linea: this.c_linea,
      c_nombre: this.buscar
    }    
    console.log(request);
    
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
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto      
    }
    this._mapa_service.getZona(request,this.getToken().token).subscribe(
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
    
    this._mapa_service.gettipolinea(this.getToken().token).subscribe(
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
    }
    console.log(request);
    
    this._mapa_service.getLinea(request, this.getToken().token).subscribe(
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

  getestructura() {    
    this.viewBar = true;
    var request = {      
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto,
      c_nombreLinea: this.c_linea
    }
    console.log(request);
    
    this._mapa_service.getestructura2(request, this.getToken().token).subscribe(
      result => {        
          if (result.estado) {
            console.log(result.data);   
            this.estructura = result.data;
            this.viewBar = false;
            this.viewLinea = true;         
          } else {
            this.openSnackBar(result.mensaje, 99);
          }        
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }
}

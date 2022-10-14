import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../common/appsettings'
import { MatDialog, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../base/base.component';

//import { OrientacionComponent } from '../orientacion/orientacion.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MapaService } from 'src/app/service/mapa.service';
import { VersionService } from 'src/app/service/version.service';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { MapaDetalleComponent } from '../mapa/mapa-detalle/mapa-detalle.component';


@Component({
  selector: 'app-mapa-linea',
  templateUrl: './mapa-linea.component.html',
  styleUrls: ['./mapa-linea.component.css'],
  providers: [MapaService, VersionService,SeguridadService]
})
export class MapaLineaComponent extends BaseComponent implements OnInit {
  tit: String = "MAPA";

  pantallaRol= [];
  permisoEdit: boolean = false;

  buscar: string = '';

  lat: number = -12.088898333333335;
  lng: number = -77.00707333333334;
  zoom: number = 6;
  data: any;
  polilineas: [];

  idlinea: string="";
  nombreLinea: string="";
  nombreZona: string="";
  nombreTipoLinea: string="";
  idversion: number = 0;

  versiones = [
  ];

  geoJsonObject: Object;
  markers = [];
  markersCir = [];
  markersB = [];

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public _router: Router,
    public _mapa_service: MapaService,
    public _version_service:VersionService,
    public _seguridad_service: SeguridadService,
    private _Activatedroute: ActivatedRoute, 
  ) {
    super(snackBar, _router)
  }

  ngOnInit() {
    this.idlinea = this._Activatedroute.snapshot.paramMap.get("n_idpl_linea");
    this.nombreLinea = this._Activatedroute.snapshot.paramMap.get("c_nombre");
    this.nombreZona = this._Activatedroute.snapshot.paramMap.get("c_nombrez");
    this.nombreTipoLinea = this._Activatedroute.snapshot.paramMap.get("c_nombret");
    this.usuarioLog = this.getUser().data;  
    this.getPantallaRol();
    this.versiones = this._version_service.get();
    this.actualizar();
  }

  actualizar(){
    this.buscar = "";
    this.markersCir = [];
    this.getPuntos();
    this.getLineas();
  }

  selecVersion(id){
    this.idversion = id;
    this.actualizar();
  }

  getPuntos() {
    let request = {
      n_idpl_linea: this.idlinea,
      n_version: this.idversion
    }
    this._mapa_service.get(request).subscribe(
      result => {
        console.log(result);
        try {
          if (result.estado) {            
            
            this.markers = [];
            result.data.forEach(element => {
              let marker = {};
              if(element.c_iconomapa ){
                marker = {
                  c_codigoestructura: element.c_codigoestructura,
                  lat : parseFloat(element.c_latitud),
                  lng: parseFloat(element.c_longitud),
                  label: "A",
                  alpha: 1,
                  data: element,
                  url: "./assets/mapa/"+element.c_iconomapa+".png"
                };
              }else{
                marker = {
                  c_codigoestructura: element.c_codigoestructura,
                  lat : parseFloat(element.c_latitud),
                  lng: parseFloat(element.c_longitud),
                  label: "A",
                  alpha: 1,
                  data: element,
                  url: "./assets/mapa/default.png"
                };
              }
              
              this.markers.push(marker);
            });
            console.log(this.markers);

          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 999);
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }

  getLineas() {
    let request = {
      n_idpl_linea: this.idlinea,
      n_version: this.idversion
    }
    this._mapa_service.getlineas(request).subscribe(
      result => {
        console.log("Lineas");
        console.log(result);
        try {
          if (result.estado) {
            this.polilineas = result.data;

          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 999);
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }

  public setparamentros(n_idpl_linea, n_version) {
    this.idlinea = n_idpl_linea;
    this.idversion = n_version;
    this.getPuntos();
    this.getLineas();
  }

  buscarLinea(dato){
    if(this.idversion > 0){
      if(dato == ''){
        this.markers.forEach(element => {
          element.alpha = 1;
        });
        this.markersCir = [];
      }else{
        let request = {
          n_idpl_linea: this.idlinea,
          n_version: this.idversion,
          nomBuscar: dato
        }
        console.log(request);
        
        this._mapa_service.buscarLinea(request).subscribe(
          result => {
            console.log(result);
            try {
              if (result.estado) {
                this.markersB = result.data;

                this.markers.forEach(element => {
                  element.alpha = 0.3;
                });

                this.markers.forEach(element => {
                  this.markersB.forEach(e =>{
                    if(element.c_codigoestructura == e.c_codigoestructura){
                      element.alpha = 1;
                      let marker = {                        
                        lat : parseFloat(e.c_latitud),
                        lng: parseFloat(e.c_longitud),                  
                        alpha: 1                        
                      };
                      this.markersCir.push(marker);
                    }
                  });
                });
                
    
              } else {
                this.openSnackBar(result.mensaje, 99);
              }
            } catch (error) {
              this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 999);
            }
          }, error => {
            this.openSnackBar(error.error, 99);
          });
      }
    }else{
      this.openSnackBar("Seleccione una versión", 200);
    }
    
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
            if(element.c_codigo === 'ma-mapli'){
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


  openDialog(item): void {
    console.log(item);
    
    const dialogRef = this.dialog.open(MapaDetalleComponent, {
      width: '30%',
      height: 'auto',
      data: item
    });
  }



}

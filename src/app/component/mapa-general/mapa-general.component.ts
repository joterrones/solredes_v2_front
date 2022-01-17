import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';
import * as OlProj from 'ol/proj';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { BaseComponent } from '../base/base.component';
import XYZ from 'ol/source/XYZ';
import {
  defaults as defaultControls,
  Control
} from 'ol/control';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { AppSettings } from 'src/app/common/appsettings';

@Component({
  selector: 'app-mapa-general',
  templateUrl: './mapa-general.component.html',
  styleUrls: ['./mapa-general.component.css'],
  providers: [SeguridadService]
})
export class MapaGeneralComponent extends BaseComponent implements OnInit {
  pantallaRol= [];
  permisoEdit: boolean = false;

  map: Map;
  mapexample: Map
  lat: number = -12.088898333333335;
  lng: number = -77.00707333333334;
  zoom: number = 6;
  url="http://35.184.146.235:8080/geoserver/sol_redes_2mayo/wms";
  urlUbideo="http://35.184.146.235:8080/geoserver/Candwi/wms";
  geoserv="Candwi";
  constructor(
    public _router:Router,
    public snackBar: MatSnackBar,
    public _seguridad_service: SeguridadService
  ) { 

    super(snackBar, _router)

  }
  

  ngOnInit(): void {
    this.usuarioLog = this.getUser().data;    
    this.getPantallaRol();
    this.map = new Map({
      target: 'ol-map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        }),
        new TileLayer({
          //extent: [-74.1367583,-2.8333027,-64.035846,-13.551104],
          source: new TileWMS({
            url: this.urlUbideo,
            params : {
              LAYERS : {'LAYERS' : 'Candwi:Departamento','TILED' : true}
            },    
            projection: 'EPSG:4326',
            serverType: 'geoserver',
            transition: 0,
          })
        }),
        /*new TileLayer({
          extent: [-13884991, 2870341, -7455066, 6338219],
          source: new TileWMS({
            url: this.url,
            params : {
              LAYERS : this.geoserv +':lineas_estructuras_lp','CQL_FILTER': "n_version =1",'TILED' : true
            },
            serverType: 'geoserver',
            // Countries have transparency, so do not fade tiles:
            transition: 0,
          })
        })*/

      ],
      view: new View({
       /// center:  OlProj.fromLonLat([this.lng,this.lat ]),
       center:[this.lng,this.lat ],
        zoom: 6,
        projection: 'EPSG:4326'
      }),
      controls: defaultControls({attribution: true, zoom: true}).extend([])
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
            if(element.c_codigo === 'ma-mapge'){
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

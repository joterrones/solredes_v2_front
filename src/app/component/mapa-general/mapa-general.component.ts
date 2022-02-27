import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';
import * as OlProj from 'ol/proj';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../base/base.component';
import XYZ from 'ol/source/XYZ';
import {
  defaults as defaultControls,
  Control
} from 'ol/control';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { AppSettings } from 'src/app/common/appsettings';
import { FiltroCapaComponent } from '../mapa/filtro-capa/filtro-capa.component';

@Component({
  selector: 'app-mapa-general',
  templateUrl: './mapa-general.component.html',
  styleUrls: ['./mapa-general.component.css'],
  providers: [SeguridadService]
})
export class MapaGeneralComponent extends BaseComponent implements OnInit {
  pantallaRol = [];
  permisoEdit: boolean = false;

  map: Map;
  mapexample: Map
  lat: number = -12.088898333333335;
  lng: number = -77.00707333333334;
  zoom: number = 6;
  url = "http://35.184.146.235:8080/geoserver/solredes/wms";
  urlUbideo = "http://35.184.146.235:8080/geoserver/Candwi/wms";

  data = [];

  tileBase;

  tileLineasExp;
  tileAtributosExp;

  tileLineasRep;
  tileAtributosRep;

  tileLineasMon;
  tileAtributosMon;

  tileLineasCon;
  tileAtributosCon;

  tileDepartamento;


  constructor(
    public _router: Router,
    public snackBar: MatSnackBar,
    public _seguridad_service: SeguridadService,
    public dialog: MatDialog
  ) {

    super(snackBar, _router)

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FiltroCapaComponent, {
      width: 'auto',
      data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("afterClosed result", result)
      this.mostarCapas(result);
    });
  }

  mostarCapas(data) {
    data.forEach(element => {
      switch (element.id) {
        case 1:
          this.tileLineasExp.setVisible(element.checked);
          this.tileAtributosExp.setVisible(element.checked);
          break;
        case 2:
          this.tileLineasRep.setVisible(element.checked);
          this.tileAtributosRep.setVisible(element.checked);
          break;
        case 3:
          this.tileLineasMon.setVisible(element.checked);
          this.tileAtributosMon.setVisible(element.checked);
          break;
        case 4:
          this.tileLineasCon.setVisible(element.checked);
          this.tileAtributosCon.setVisible(element.checked);
          break;
      }
    });
  }


  ngOnInit(): void {
    this.data = [
      { id: 1, nombre: "Expediente", checked: false },
      { id: 2, nombre: "Replanteo", checked: false },
      { id: 3, nombre: "Montaje", checked: false },
      { id: 4, nombre: "Conforme a obra", checked: false }
    ]
    this.cargarCapas();
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
            if (element.c_codigo === 'ma-mapge') {
              console.log(element);
              console.log(element.c_codigo);
              if (element.c_permiso === 'MO') {
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

  cargarCapas() {
    this.tileBase = new TileLayer({
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      })
    })

    this.tileLineasExp = new TileLayer({
      source: new TileWMS({
        url: this.url,
        params: {
          'LAYERS': 'solredes:linea',
          'CQL_FILTER': "n_version =1",
          'TILED': true
        },
        projection: 'EPSG:4326',
        serverType: 'geoserver',
        transition: 0,
      })
    });

    this.tileAtributosExp = new TileLayer({
      source: new TileWMS({
        url: this.url,
        params: {
          'LAYERS': 'solredes:punto',
          'CQL_FILTER': "n_version =1",
          'TILED': true
        },
        projection: 'EPSG:4326',
        serverType: 'geoserver',
        transition: 0,
      })
    });

    this.tileLineasRep = new TileLayer({
      source: new TileWMS({
        url: this.url,
        params: {
          'LAYERS': 'solredes:linea',
          'CQL_FILTER': "n_version =2",
          'TILED': true
        },
        projection: 'EPSG:4326',
        serverType: 'geoserver',
        transition: 0,
      })
    });

    this.tileAtributosRep = new TileLayer({
      source: new TileWMS({
        url: this.url,
        params: {
          'LAYERS': 'solredes:punto',
          'CQL_FILTER': "n_version =2",
          'TILED': true
        },
        projection: 'EPSG:4326',
        serverType: 'geoserver',
        transition: 0,
      })
    });

    this.tileLineasMon = new TileLayer({
      source: new TileWMS({
        url: this.url,
        params: {
          'LAYERS': 'solredes:linea',
          'CQL_FILTER': "n_version =3",
          'TILED': true
        },
        projection: 'EPSG:4326',
        serverType: 'geoserver',
        transition: 0,
      })
    });

    this.tileAtributosMon = new TileLayer({
      source: new TileWMS({
        url: this.url,
        params: {
          'LAYERS': 'solredes:punto',
          'CQL_FILTER': "n_version =3",
          'TILED': true
        },
        projection: 'EPSG:4326',
        serverType: 'geoserver',
        transition: 0,
      })
    });

    this.tileLineasCon = new TileLayer({
      source: new TileWMS({
        url: this.url,
        params: {
          'LAYERS': 'solredes:linea',
          'CQL_FILTER': "n_version =4",
          'TILED': true
        },
        projection: 'EPSG:4326',
        serverType: 'geoserver',
        transition: 0,
      })
    });

    this.tileAtributosCon = new TileLayer({
      source: new TileWMS({
        url: this.url,
        params: {
          'LAYERS': 'solredes:punto',
          'CQL_FILTER': "n_version =4",
          'TILED': true
        },
        projection: 'EPSG:4326',
        serverType: 'geoserver',
        transition: 0,
      })
    });

   /* this.tileDepartamento = new TileLayer({
      source: new TileWMS({
        url: this.urlUbideo,
        params: {
          'LAYERS': 'Candwi:Departamento',
          'TILED': true
        },
        projection: 'EPSG:4326',
        serverType: 'geoserver',
        transition: 0,
      })
    });*/

    this.mostarCapas(this.data);

    this.usuarioLog = this.getUser().data;

    this.getPantallaRol();

    this.map = new Map({
      target: 'ol-map',
      layers: [
        this.tileBase,
        this.tileLineasExp,
        this.tileAtributosExp,
        this.tileLineasRep,
        this.tileAtributosRep,
        this.tileLineasMon,
        this.tileAtributosMon,
        this.tileLineasCon,
        this.tileAtributosCon,
        this.tileDepartamento,
      ],
      view: new View({
        center: [this.lng, this.lat],
        zoom: 6,
        projection: 'EPSG:4326'
      }),
      controls: defaultControls({ attribution: true, zoom: true }).extend([])
    });
  }

}

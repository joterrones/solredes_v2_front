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
import { confGeneralService } from 'src/app/service/confGeneral.service';
import { MapaService } from 'src/app/service/mapa.service';
import Select from 'ol/interaction/Select';
import { FiltroBuscarComponent } from '../mapa/filtro-buscar/filtro-buscar.component';

import VectorSource from 'ol/source/vector';
import Vector from 'ol/layer/vector';
import GeoJSON from 'ol/format/geojson';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import Geometry from 'ol/geom/Geometry';
import { bbox } from 'ol/loadingstrategy';
import { HttpClient } from '@angular/common/http';
import { MapaDetalleComponent } from '../mapa/mapa-detalle/mapa-detalle.component';



@Component({
  selector: 'app-mapa-general',
  templateUrl: './mapa-general.component.html',
  styleUrls: ['./mapa-general.component.css'],
  providers: [SeguridadService, confGeneralService, MapaService]
})
export class MapaGeneralComponent extends BaseComponent implements OnInit {
  pantallaRol = [];
  permisoEdit: boolean = false;
  spinner: boolean = false;

  tipolinea = []
  zona = [];
  idtipolinea = 0;
  idzona = 0;
  buscar = '';

  map: Map;
  mapexample: Map
  lat: number = -12.088898333333335;
  lng: number = -77.00707333333334;
  zoom: number = 6;
  /*lat: number = -12.2230529;
  lng: number = -76.9290804;
  zoom: number = 18;*/
  url = "http://35.184.146.235:8080/geoserver/solredes/wms";
  //urlUbideo = "http://35.184.146.235:8080/geoserver/Candwi/wms";

  data = [
    {
      name: 'Expediente',
      version: 1,
      completed: true,
      color: 'primary',
      subtasks: [
        { id: 1, name: 'Linea primaria', completed: true, color: 'primary' },
        { id: 2, name: 'Red primaria', completed: true, color: 'accent' },
        { id: 3, name: 'Red secudaria', completed: true, color: 'warn' },
      ],
    }, {
      name: 'Replanteo',
      version: 2,
      completed: false,
      color: 'primary',
      subtasks: [
        { id: 1, name: 'Linea primaria', completed: false, color: 'primary' },
        { id: 2, name: 'Red primaria', completed: false, color: 'accent' },
        { id: 3, name: 'Red secudaria', completed: false, color: 'warn' },
      ],
    },
    {
      name: 'Montaje',
      version: 3,
      completed: false,
      color: 'primary',
      subtasks: [
        { id: 1, name: 'Linea primaria', completed: false, color: 'primary' },
        { id: 2, name: 'Red primaria', completed: false, color: 'accent' },
        { id: 3, name: 'Red secudaria', completed: false, color: 'warn' },
      ],
    }, {
      name: 'Conforme a obra',
      version: 4,
      completed: false,
      color: 'primary',
      subtasks: [
        { id: 1, name: 'Linea primaria', completed: false, color: 'primary' },
        { id: 2, name: 'Red primaria', completed: false, color: 'accent' },
        { id: 3, name: 'Red secudaria', completed: false, color: 'warn' },
      ],
    }, {
      name: 'Inspeccion Replanteo',
      version: 5,
      completed: false,
      color: 'primary',
      subtasks: [
        { id: 1, name: 'Linea primaria', completed: false, color: 'primary' },
        { id: 2, name: 'Red primaria', completed: false, color: 'accent' },
        { id: 3, name: 'Red secudaria', completed: false, color: 'warn' },
      ],
    }, {
      name: 'Inspeccion Montaje',
      version: 6,
      completed: false,
      color: 'primary',
      subtasks: [
        { id: 1, name: 'Linea primaria', completed: false, color: 'primary' },
        { id: 2, name: 'Red primaria', completed: false, color: 'accent' },
        { id: 3, name: 'Red secudaria', completed: false, color: 'warn' },
      ],
    }, {
      name: 'Inspeccion Conforme a obra',
      version: 7,
      completed: false,
      color: 'primary',
      subtasks: [
        { id: 1, name: 'Linea primaria', completed: false, color: 'primary' },
        { id: 2, name: 'Red primaria', completed: false, color: 'accent' },
        { id: 3, name: 'Red secudaria', completed: false, color: 'warn' },
      ],
    }
  ];

  arrayTile = [];
  tileBase;

  myVectorLayer;

  tileLineasExpLP;
  tileLineasExpRP;
  tileLineasExpRS;
  tileAtributosExpLP;
  tileAtributosExpRP;
  tileAtributosExpRS;

  tileLineasRepLP;
  tileLineasRepRP;
  tileLineasRepRS;
  tileAtributosRepLP;
  tileAtributosRepRP;
  tileAtributosRepRS;


  tileLineasMonLP;
  tileLineasMonRP;
  tileLineasMonRS;
  tileAtributosMonLP;
  tileAtributosMonRP;
  tileAtributosMonRS;


  tileLineasConLP;
  tileLineasConRP;
  tileLineasConRS;
  tileAtributosConLP;
  tileAtributosConRP;
  tileAtributosConRS;

  tileLineasMonInspReplantLP;
  tileLineasMonInspReplantRP;
  tileLineasMonInspReplantRS;
  tileAtributosMonInspReplantLP;
  tileAtributosMonInspReplantRP;
  tileAtributosMonInspReplantRS;

  tileLineasMonInspMontLP;
  tileLineasMonInspMontRP;
  tileLineasMonInspMontRS;
  tileAtributosMonInspMontLP;
  tileAtributosMonInspMontRP;
  tileAtributosMonInspMontRS;

  tileLineasMonInspConfObraLP;
  tileLineasMonInspConfObraRP;
  tileLineasMonInspConfObraRS;
  tileAtributosMonInspConfObraLP;
  tileAtributosMonInspConfObraRP;
  tileAtributosMonInspConfObraRS;

  tileDepartamento;
  textoVersiones = "0";

  constructor(
    public _router: Router,
    public snackBar: MatSnackBar,
    public _seguridad_service: SeguridadService,
    public _confiGeneral_service: confGeneralService,
    public _mapa_service: MapaService,
    public dialog: MatDialog
  ) {

    super(snackBar, _router)

  }

  cargarFiltros = () => {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FiltroCapaComponent, {
      width: 'auto', height: '600px',
      data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        console.log("afterClosed result", result)
        this.data = result;
        if (result.flag) {
          this.mostarCapas(result);
        }
      }
    });
  }

  ngOnInit(): void {
    this.usuarioLog = this.getUser().data;
    this.getPantallaRol();

    switch (this.proyecto.n_idpro_proyecto) {
      case 5:
        this.data[0].completed = false
        this.data[0].subtasks[0].completed = false
        this.data[0].subtasks[1].completed = false
        this.data[0].subtasks[2].completed = false

        this.data[1].completed = true
        this.data[1].subtasks[0].completed = true
        this.data[1].subtasks[1].completed = true
        this.data[1].subtasks[2].completed = true
        break;
      case 6:
        this.data[0].completed = false
        this.data[0].subtasks[0].completed = false
        this.data[0].subtasks[1].completed = false
        this.data[0].subtasks[2].completed = false

        this.data[1].completed = true
        this.data[1].subtasks[0].completed = true
        this.data[1].subtasks[1].completed = true
        this.data[1].subtasks[2].completed = true
        break;
    }

    this.tileBase = new TileLayer({
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      })
    })
    this.cargarCapas();
    this.mostarCapas(this.data);
  }
  mostarCapas(data) {

    this.arrayTile = [];
    /*this.tileBase = new TileLayer({
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      })
    })
    this.arrayTile.push(this.tileBase)*/
    data.forEach(element => {
      let checkOk = element.subtasks.filter(o => o.completed == true);
      console.log(checkOk);
      if (checkOk.length > 0) {
        switch (element.version) {
          case 1:
            if (checkOk.filter(o => o.completed && o.id == 1).length > 0) {
              this.tileLineasExpLP = this.customTileLayer('solredes:linea', "n_version =1 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.tileAtributosExpLP = this.customTileLayer('solredes:punto', "n_version =1 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.arrayTile.push(this.tileLineasExpLP, this.tileAtributosExpLP)
            };
            if (checkOk.filter(o => o.completed && o.id == 2).length > 0) {
              this.tileLineasExpRP = this.customTileLayer('solredes:linea', "n_version =1 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.tileAtributosExpRP = this.customTileLayer('solredes:punto', "n_version =1 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.arrayTile.push(this.tileLineasExpRP, this.tileAtributosExpRP)
            };
            if (checkOk.filter(o => o.completed && o.id == 3).length > 0) {
              this.tileLineasExpRS = this.customTileLayer('solredes:linea', "n_version =1 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.tileAtributosExpRS = this.customTileLayer('solredes:punto', "n_version =1 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.arrayTile.push(this.tileLineasExpRS, this.tileAtributosExpRS)
            };
            break;
          case 2:
            if (checkOk.filter(o => o.completed && o.id == 1).length > 0) {
              this.tileLineasRepLP = this.customTileLayer('solredes:linea', "n_version =2 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.tileAtributosRepLP = this.customTileLayer('solredes:punto', "n_version =2 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.arrayTile.push(this.tileLineasRepLP, this.tileAtributosRepLP)
            };
            if (checkOk.filter(o => o.completed && o.id == 2).length > 0) {
              this.tileLineasRepRP = this.customTileLayer('solredes:linea', "n_version =2 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.tileAtributosRepRP = this.customTileLayer('solredes:punto', "n_version =2 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.arrayTile.push(this.tileLineasRepRP, this.tileAtributosRepRP)
            };
            if (checkOk.filter(o => o.completed && o.id == 3).length > 0) {
              this.tileLineasRepRS = this.customTileLayer('solredes:linea', "n_version =2 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.tileAtributosRepRS = this.customTileLayer('solredes:punto', "n_version =2 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.arrayTile.push(this.tileLineasRepRS, this.tileAtributosRepRS)
            }
            break;
          case 3:
            if (checkOk.filter(o => o.completed && o.id == 1).length > 0) {
              this.tileLineasMonLP = this.customTileLayer('solredes:linea', "n_version =3 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.tileAtributosMonLP = this.customTileLayer('solredes:punto', "n_version =3 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.arrayTile.push(this.tileLineasMonLP, this.tileAtributosMonLP)
            };
            if (checkOk.filter(o => o.completed && o.id == 2).length > 0) {
              this.tileLineasMonRP = this.customTileLayer('solredes:linea', "n_version =3 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.tileAtributosMonRP = this.customTileLayer('solredes:punto', "n_version =3 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.arrayTile.push(this.tileLineasMonRP, this.tileAtributosMonRP)
            };
            if (checkOk.filter(o => o.completed && o.id == 3).length > 0) {
              this.tileLineasMonRS = this.customTileLayer('solredes:linea', "n_version =3 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.tileAtributosMonRS = this.customTileLayer('solredes:punto', "n_version =3 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.arrayTile.push(this.tileLineasMonRS, this.tileAtributosMonRS)
            }
            break;
          case 4:
            if (checkOk.filter(o => o.completed && o.id == 1).length > 0) {
              this.tileLineasConLP = this.customTileLayer('solredes:linea', "n_version =4 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.tileAtributosConLP = this.customTileLayer('solredes:punto', "n_version =4 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.arrayTile.push(this.tileLineasConLP, this.tileAtributosConLP)
            };
            if (checkOk.filter(o => o.completed && o.id == 2).length > 0) {
              this.tileLineasConRP = this.customTileLayer('solredes:linea', "n_version =4 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.tileAtributosConRP = this.customTileLayer('solredes:punto', "n_version =4 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.arrayTile.push(this.tileLineasConRP, this.tileAtributosConRP)
            };
            if (checkOk.filter(o => o.completed && o.id == 3).length > 0) {
              this.tileLineasConRS = this.customTileLayer('solredes:linea', "n_version =4 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.tileAtributosConRS = this.customTileLayer('solredes:punto', "n_version =4 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.arrayTile.push(this.tileLineasConRS, this.tileAtributosConRS)
            }
            break;
          case 5:
            if (checkOk.filter(o => o.completed && o.id == 1).length > 0) {
              this.tileLineasMonInspReplantLP = this.customTileLayer('solredes:lineaMonInsp', "n_tipoapp = 2 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.tileAtributosMonInspReplantLP = this.customTileLayer('solredes:puntoMonInsp', "n_tipoapp = 2 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.arrayTile.push(this.tileLineasMonInspReplantLP, this.tileAtributosMonInspReplantLP)
            };
            if (checkOk.filter(o => o.completed && o.id == 2).length > 0) {
              this.tileLineasMonInspReplantRP = this.customTileLayer('solredes:lineaMonInsp', "n_tipoapp = 2 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.tileAtributosMonInspReplantRP = this.customTileLayer('solredes:puntoMonInsp', "n_tipoapp = 2 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.arrayTile.push(this.tileLineasMonInspReplantRP, this.tileAtributosMonInspReplantRP)
            };
            if (checkOk.filter(o => o.completed && o.id == 3).length > 0) {
              this.tileLineasMonInspReplantRS = this.customTileLayer('solredes:lineaMonInsp', "n_tipoapp = 2 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.tileAtributosMonInspReplantRS = this.customTileLayer('solredes:puntoMonInsp', "n_tipoapp = 2 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.arrayTile.push(this.tileLineasMonInspReplantRS, this.tileAtributosMonInspReplantRS)
            };

            break;
          case 6:
            if (checkOk.filter(o => o.completed && o.id == 1).length > 0) {
              this.tileLineasMonInspMontLP = this.customTileLayer('solredes:lineaMonInsp', "n_tipoapp = 3 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.tileAtributosMonInspMontLP = this.customTileLayer('solredes:puntoMonInsp', "n_tipoapp = 3 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.arrayTile.push(this.tileLineasMonInspMontLP, this.tileAtributosMonInspMontLP)
            };
            if (checkOk.filter(o => o.completed && o.id == 2).length > 0) {
              this.tileLineasMonInspMontRP = this.customTileLayer('solredes:lineaMonInsp', "n_tipoapp = 3 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.tileAtributosMonInspMontRP = this.customTileLayer('solredes:puntoMonInsp', "n_tipoapp = 3 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.arrayTile.push(this.tileLineasMonInspMontRP, this.tileAtributosMonInspMontRP)
            };
            if (checkOk.filter(o => o.completed && o.id == 3).length > 0) {
              this.tileLineasMonInspMontRS = this.customTileLayer('solredes:lineaMonInsp', "n_tipoapp = 3 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.tileAtributosMonInspMontRS = this.customTileLayer('solredes:puntoMonInsp', "n_tipoapp = 3 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.arrayTile.push(this.tileLineasMonInspMontRS, this.tileAtributosMonInspMontRS)
            };
            break;
          case 7:
            if (checkOk.filter(o => o.completed && o.id == 1).length > 0) {
              this.tileLineasMonInspConfObraLP = this.customTileLayer('solredes:lineaMonInsp', "n_tipoapp = 4 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.tileAtributosMonInspConfObraLP = this.customTileLayer('solredes:puntoMonInsp', "n_tipoapp = 4 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.arrayTile.push(this.tileLineasMonInspConfObraLP, this.tileAtributosMonInspConfObraLP)
            };
            if (checkOk.filter(o => o.completed && o.id == 2).length > 0) {
              this.tileLineasMonInspConfObraRP = this.customTileLayer('solredes:lineaMonInsp', "n_tipoapp = 4 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.tileAtributosMonInspConfObraRP = this.customTileLayer('solredes:puntoMonInsp', "n_tipoapp = 4 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.arrayTile.push(this.tileLineasMonInspConfObraRP, this.tileAtributosMonInspConfObraRP)
            };
            if (checkOk.filter(o => o.completed && o.id == 3).length > 0) {
              this.tileLineasMonInspConfObraRS = this.customTileLayer('solredes:lineaMonInsp', "n_tipoapp = 4 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.tileAtributosMonInspConfObraRS = this.customTileLayer('solredes:puntoMonInsp', "n_tipoapp = 4 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
              this.arrayTile.push(this.tileLineasMonInspConfObraRS, this.tileAtributosMonInspConfObraRS)
            };
            break;
        }
      }

    });
    console.log("textoVersiones", this.textoVersiones)
    //console.log(this.map.getLayers().getArray());

    this.map.getLayers().getArray().slice(1).forEach(layer => this.map.removeLayer(layer))
    this.arrayTile.forEach(layer => this.map.addLayer(layer));
    // this.cargarCapas();
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

  customTileLayer(capa, filtro) {

    return new TileLayer({
      source: new TileWMS({
        url: this.url,
        params: {
          'LAYERS': capa,
          'CQL_FILTER': filtro,
          'TILED': true
        },
        projection: 'EPSG:4326',
        serverType: 'geoserver',
        transition: 0,
      })

    });
  }



  cargarCapas() {

    const view = new View({
      center: [this.lng, this.lat],
      zoom: this.zoom,
      projection: 'EPSG:4326'
    });

    this.map = new Map({
      target: 'ol-map',
      layers: [this.tileBase],
      view: view,
      controls: defaultControls({ attribution: true, zoom: true }).extend([])
    });


    this.map.on('singleclick', (evt) => {
      this.spinner = true;
      console.log("CLICK-------------");
      //console.log(evt);
      //console.log(evt.coordinate);  
      const viewResolution = /** @type {number} */ (view.getResolution());
      //console.log("viewResolution: "+viewResolution);

      //const dataAux = this.data

      this.data.forEach(element => {
        let checkOk = element.subtasks.filter(o => o.completed == true);
        console.log(checkOk);
        if (checkOk.length > 0) {
          switch (element.version) {
            case 1:
              if (checkOk.filter(o => o.completed && o.id == 1).length > 0) {
                const aux2 = this.tileAtributosExpLP.sourceChangeKey_.target;
                let url2 = aux2.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'application/json' });
                //console.log("url2---------------- "+url2);
                this.geData(url2);
              };
              if (checkOk.filter(o => o.completed && o.id == 2).length > 0) {
                const aux4 = this.tileAtributosExpRP.sourceChangeKey_.target;
                let url4 = aux4.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'application/json' });
                //console.log("url4---------------- "+url4);
                this.geData(url4);
              };
              if (checkOk.filter(o => o.completed && o.id == 3).length > 0) {
                const aux6 = this.tileAtributosExpRS.sourceChangeKey_.target;
                let url6 = aux6.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'application/json' });
                //console.log("url6---------------- "+url6);
                this.geData(url6);
              };
              break;
            case 2:
              if (checkOk.filter(o => o.completed && o.id == 1).length > 0) {
                const aux10 = this.tileAtributosRepLP.sourceChangeKey_.target;
                let url10 = aux10.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'application/json' });
                //console.log("url10---------------- "+url10);
                this.geData(url10);
              };
              if (checkOk.filter(o => o.completed && o.id == 2).length > 0) {
                const aux11 = this.tileAtributosRepRP.sourceChangeKey_.target;
                let url11 = aux11.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'application/json' });
                //console.log("url11---------------- "+url11);
                this.geData(url11);
              };
              if (checkOk.filter(o => o.completed && o.id == 3).length > 0) {
                const aux12 = this.tileAtributosRepRS.sourceChangeKey_.target;
                let url12 = aux12.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'application/json' });
                //console.log("url12---------------- "+url12);
                this.geData(url12);
              }
              break;
            case 3:
              if (checkOk.filter(o => o.completed && o.id == 1).length > 0) {
                const aux16 = this.tileAtributosMonLP.sourceChangeKey_.target;
                let url16 = aux16.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'application/json' });
                //console.log("url16---------------- "+url16);
                this.geData(url16);
              };
              if (checkOk.filter(o => o.completed && o.id == 2).length > 0) {
                const aux17 = this.tileAtributosMonRP.sourceChangeKey_.target;
                let url17 = aux17.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'application/json' });
                //console.log("url17---------------- "+url17);
                this.geData(url17);
              };
              if (checkOk.filter(o => o.completed && o.id == 3).length > 0) {
                const aux18 = this.tileAtributosMonRS.sourceChangeKey_.target;
                let url18 = aux18.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'application/json' });
                //console.log("url18---------------- "+url18);
                this.geData(url18);
              }
              break;
            case 4:
              if (checkOk.filter(o => o.completed && o.id == 1).length > 0) {
                const aux22 = this.tileAtributosConLP.sourceChangeKey_.target;
                let url22 = aux22.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'application/json' });
                //console.log("url22---------------- "+url22);
                this.geData(url22);
              };
              if (checkOk.filter(o => o.completed && o.id == 2).length > 0) {
                const aux23 = this.tileAtributosConRP.sourceChangeKey_.target;
                let url23 = aux23.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'application/json' });
                //console.log("url23---------------- "+url23);
                this.geData(url23);
              };
              if (checkOk.filter(o => o.completed && o.id == 3).length > 0) {
                const aux24 = this.tileAtributosConRS.sourceChangeKey_.target;
                let url24 = aux24.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'application/json' });
                //console.log("url24---------------- "+url24);
                this.geData(url24);
              }
              break;
            case 5:
              if (checkOk.filter(o => o.completed && o.id == 1).length > 0) {
                const aux28 = this.tileAtributosMonInspReplantLP.sourceChangeKey_.target;
                let url28 = aux28.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'application/json' });
                //console.log("url28----------------"+url28);
                this.geData(url28);
              };
              if (checkOk.filter(o => o.completed && o.id == 2).length > 0) {
                const aux29 = this.tileAtributosMonInspReplantRP.sourceChangeKey_.target;
                let url29 = aux29.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'application/json' });
                //console.log("url29----------------"+url29);
                this.geData(url29);
              };
              if (checkOk.filter(o => o.completed && o.id == 3).length > 0) {
                const aux30 = this.tileAtributosMonInspReplantRS.sourceChangeKey_.target;
                let url30 = aux30.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'application/json' });
                //console.log("url30----------------"+url30);
                this.geData(url30);
              };
              break;
            case 6:
              if (checkOk.filter(o => o.completed && o.id == 1).length > 0) {
                const aux34 = this.tileAtributosMonInspMontLP.sourceChangeKey_.target;
                let url34 = aux34.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'application/json' });
                //console.log("url34----------------"+url34);
                this.geData(url34);
              };
              if (checkOk.filter(o => o.completed && o.id == 2).length > 0) {
                const aux35 = this.tileAtributosMonInspMontRP.sourceChangeKey_.target;
                let url35 = aux35.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'application/json' });
                //console.log("url35----------------"+url35);
                this.geData(url35);
              };
              if (checkOk.filter(o => o.completed && o.id == 3).length > 0) {
                const aux36 = this.tileAtributosMonInspMontRS.sourceChangeKey_.target;
                let url36 = aux36.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'application/json' });
                //console.log("url36----------------"+url36);
                this.geData(url36);
              };
              break;
            case 7:
              if (checkOk.filter(o => o.completed && o.id == 1).length > 0) {
                const aux40 = this.tileAtributosMonInspConfObraLP.sourceChangeKey_.target;
                let url40 = aux40.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'application/json' });
                //console.log("url40----------------"+url40);
                this.geData(url40);
              };
              if (checkOk.filter(o => o.completed && o.id == 2).length > 0) {
                const aux41 = this.tileAtributosMonInspConfObraRP.sourceChangeKey_.target;
                let url41 = aux41.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'application/json' });
                //console.log("url41----------------"+url41);
                this.geData(url41);
              };
              if (checkOk.filter(o => o.completed && o.id == 3).length > 0) {
                const aux42 = this.tileAtributosMonInspConfObraRS.sourceChangeKey_.target;
                let url42 = aux42.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', { 'INFO_FORMAT': 'application/json' });
                //console.log("url42----------------"+url42);
                this.geData(url42);
              };
              break;
          }
        }
      });

    })

    /*this.map.on('pointermove', function (evt) {
      if (evt.dragging) {
        return;
      }
      const data = aux.getData(evt.pixel);
      const hit = data && data[3] > 0; // transparent pixels have zero for data[3]
      this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });*/


  }

  geData(url) {
    let estruct;
    this._mapa_service.getDataClick(url).subscribe(
      result => {
        try {
          console.log(result.features[0].properties);
          estruct = result.features[0].properties;
          this.spinner = false;
          this.dialog.open(MapaDetalleComponent, {
            width: '30%',
            height: 'auto',
            data: estruct
          });
        } catch (error) {
        }
        this.spinner = false;
      }, error => {
        this.openSnackBar(<any>error, 99);
      }
    );
  }
  selectTipolinea(n_idpl_tipolinea) {
    this.idtipolinea = n_idpl_tipolinea;
  }

  selectZona(n_idpl_zona) {
    this.idzona = n_idpl_zona;
  }

  buscarEstruct(dato) {
    const dialogRef = this.dialog.open(FiltroBuscarComponent, {
      width: '600px',
      data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.lng = result.lng;
        this.lat = result.lat;
        const view = this.map.getView();
        view.setZoom(18);
        view.setCenter([this.lng, this.lat]);
        //this.mostarCapas(result);
      }
    });

  }




}

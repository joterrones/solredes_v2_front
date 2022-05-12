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
import {bbox} from 'ol/loadingstrategy';
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
  url = "http://35.184.146.235:8080/geoserver/solredes/wms";
  //urlUbideo = "http://35.184.146.235:8080/geoserver/Candwi/wms";
  
  data = [];
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

  openDialog(): void {
    const dialogRef = this.dialog.open(FiltroCapaComponent, {
      width: 'auto', height: '600px',
      data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("afterClosed result", result)
      this.data = result;
      this.mostarCapas(result);
    });
  }

  mostarCapas(data) {
    this.tileAtributosExpLP.setVisible(false);
    this.tileLineasExpLP.setVisible(false);
    this.tileAtributosExpRP.setVisible(false);
    this.tileLineasExpRP.setVisible(false);
    this.tileAtributosExpRS.setVisible(false);
    this.tileLineasExpRS.setVisible(false);

    this.tileAtributosRepLP.setVisible(false);
    this.tileLineasRepLP.setVisible(false);
    this.tileAtributosRepRP.setVisible(false);
    this.tileLineasRepRP.setVisible(false);
    this.tileAtributosRepRS.setVisible(false);
    this.tileLineasRepRS.setVisible(false);

    this.tileAtributosMonLP.setVisible(false);
    this.tileLineasMonLP.setVisible(false);
    this.tileAtributosMonRP.setVisible(false);
    this.tileLineasMonRP.setVisible(false);
    this.tileAtributosMonRS.setVisible(false);
    this.tileLineasMonRS.setVisible(false);

    this.tileAtributosConLP.setVisible(false);
    this.tileLineasConLP.setVisible(false);
    this.tileAtributosConRP.setVisible(false);
    this.tileLineasConRP.setVisible(false);
    this.tileAtributosConRS.setVisible(false);
    this.tileLineasConRS.setVisible(false);

    this.tileLineasMonInspReplantLP.setVisible(false);
    this.tileLineasMonInspReplantRP.setVisible(false);
    this.tileLineasMonInspReplantRS.setVisible(false);
    this.tileAtributosMonInspReplantLP.setVisible(false);
    this.tileAtributosMonInspReplantRP.setVisible(false);
    this.tileAtributosMonInspReplantRS.setVisible(false);

    this.tileLineasMonInspMontLP.setVisible(false);
    this.tileLineasMonInspMontRP.setVisible(false);
    this.tileLineasMonInspMontRS.setVisible(false);
    this.tileAtributosMonInspMontLP.setVisible(false);
    this.tileAtributosMonInspMontRP.setVisible(false);
    this.tileAtributosMonInspMontRS.setVisible(false);

    this.tileLineasMonInspConfObraLP.setVisible(false);
    this.tileLineasMonInspConfObraRP.setVisible(false);
    this.tileLineasMonInspConfObraRS.setVisible(false);
    this.tileAtributosMonInspConfObraLP.setVisible(false);
    this.tileAtributosMonInspConfObraRP.setVisible(false);
    this.tileAtributosMonInspConfObraRS.setVisible(false);
    
    this.textoVersiones = "0";
    console.log("data", data)
    data.forEach(element => {
      let checkOk = element.subtasks.filter(o => o.completed == true);
      if (checkOk.length > 0) {
        switch (element.version) {
          case 1:
            this.tileAtributosExpLP.setVisible(checkOk.filter(o => o.completed && o.id == 1).length > 0);
            this.tileLineasExpLP.setVisible(checkOk.filter(o => o.completed && o.id == 1).length > 0);
            this.tileAtributosExpRP.setVisible(checkOk.filter(o => o.completed && o.id == 2).length > 0);
            this.tileLineasExpRP.setVisible(checkOk.filter(o => o.completed && o.id == 2).length > 0);
            this.tileAtributosExpRS.setVisible(checkOk.filter(o => o.completed && o.id == 3).length > 0);
            this.tileLineasExpRS.setVisible(checkOk.filter(o => o.completed && o.id == 3).length > 0);            
            break;
          case 2:
            this.tileAtributosRepLP.setVisible(checkOk.filter(o => o.completed && o.id == 1).length > 0);
            this.tileLineasRepLP.setVisible(checkOk.filter(o => o.completed && o.id == 1).length > 0);
            this.tileAtributosRepRP.setVisible(checkOk.filter(o => o.completed && o.id == 2).length > 0);
            this.tileLineasRepRP.setVisible(checkOk.filter(o => o.completed && o.id == 2).length > 0);
            this.tileAtributosRepRS.setVisible(checkOk.filter(o => o.completed && o.id == 3).length > 0);
            this.tileLineasRepRS.setVisible(checkOk.filter(o => o.completed && o.id == 3).length > 0);            
            break;
          case 3:
            this.tileAtributosMonLP.setVisible(checkOk.filter(o => o.completed && o.id == 1).length > 0);
            this.tileLineasMonLP.setVisible(checkOk.filter(o => o.completed && o.id == 1).length > 0);
            this.tileAtributosMonRP.setVisible(checkOk.filter(o => o.completed && o.id == 2).length > 0);
            this.tileLineasMonRP.setVisible(checkOk.filter(o => o.completed && o.id == 2).length > 0);
            this.tileAtributosMonRS.setVisible(checkOk.filter(o => o.completed && o.id == 3).length > 0);
            this.tileLineasMonRS.setVisible(checkOk.filter(o => o.completed && o.id == 3).length > 0);            
            break;
          case 4:
            this.tileAtributosConLP.setVisible(checkOk.filter(o => o.completed && o.id == 1).length > 0);
            this.tileLineasConLP.setVisible(checkOk.filter(o => o.completed && o.id == 1).length > 0);
            this.tileAtributosConRP.setVisible(checkOk.filter(o => o.completed && o.id == 2).length > 0);
            this.tileLineasConRP.setVisible(checkOk.filter(o => o.completed && o.id == 2).length > 0);
            this.tileAtributosConRS.setVisible(checkOk.filter(o => o.completed && o.id == 3).length > 0);
            this.tileLineasConRS.setVisible(checkOk.filter(o => o.completed && o.id == 3).length > 0);            
            break; 
        }
        this.tileLineasMonInspReplantLP.setVisible(checkOk.filter(o => o.completed && o.id == 1).length > 0);
        this.tileLineasMonInspReplantRP.setVisible(checkOk.filter(o => o.completed && o.id == 2).length > 0);
        this.tileLineasMonInspReplantRS.setVisible(checkOk.filter(o => o.completed && o.id == 3).length > 0);
        this.tileAtributosMonInspReplantLP.setVisible(checkOk.filter(o => o.completed && o.id == 1).length > 0);
        this.tileAtributosMonInspReplantRP.setVisible(checkOk.filter(o => o.completed && o.id == 2).length > 0);
        this.tileAtributosMonInspReplantRS.setVisible(checkOk.filter(o => o.completed && o.id == 3).length > 0);

        this.tileLineasMonInspMontLP.setVisible(checkOk.filter(o => o.completed && o.id == 1).length > 0);
        this.tileLineasMonInspMontRP.setVisible(checkOk.filter(o => o.completed && o.id == 2).length > 0);
        this.tileLineasMonInspMontRS.setVisible(checkOk.filter(o => o.completed && o.id == 3).length > 0);
        this.tileAtributosMonInspMontLP.setVisible(checkOk.filter(o => o.completed && o.id == 1).length > 0);
        this.tileAtributosMonInspMontRP.setVisible(checkOk.filter(o => o.completed && o.id == 2).length > 0);
        this.tileAtributosMonInspMontRS.setVisible(checkOk.filter(o => o.completed && o.id == 3).length > 0);

        this.tileLineasMonInspConfObraLP.setVisible(checkOk.filter(o => o.completed && o.id == 1).length > 0);
        this.tileLineasMonInspConfObraRP.setVisible(checkOk.filter(o => o.completed && o.id == 2).length > 0);
        this.tileLineasMonInspConfObraRS.setVisible(checkOk.filter(o => o.completed && o.id == 3).length > 0);
        this.tileAtributosMonInspConfObraLP.setVisible(checkOk.filter(o => o.completed && o.id == 1).length > 0);
        this.tileAtributosMonInspConfObraRP.setVisible(checkOk.filter(o => o.completed && o.id == 2).length > 0);
        this.tileAtributosMonInspConfObraRS.setVisible(checkOk.filter(o => o.completed && o.id == 3).length > 0);
      }
      
    });

    console.log("textoVersiones", this.textoVersiones)


    // this.cargarCapas();
  }


  ngOnInit(): void {
    this.data = [
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
      },{
        name: 'Inspeccion Replanteo',
        version: 0,
        completed: false,
        color: 'primary',
        subtasks: [
          { id: 1, name: 'Linea primaria', completed: false, color: 'primary' },
          { id: 2, name: 'Red primaria', completed: false, color: 'accent' },
          { id: 3, name: 'Red secudaria', completed: false, color: 'warn' },
        ],
      },{
        name: 'Inspeccion Montaje',
        version: 0,
        completed: false,
        color: 'primary',
        subtasks: [
          { id: 1, name: 'Linea primaria', completed: false, color: 'primary' },
          { id: 2, name: 'Red primaria', completed: false, color: 'accent' },
          { id: 3, name: 'Red secudaria', completed: false, color: 'warn' },
        ],
      },{
        name: 'Inspeccion Conforme a obra',
        version: 0,
        completed: false,
        color: 'primary',
        subtasks: [
          { id: 1, name: 'Linea primaria', completed: false, color: 'primary' },
          { id: 2, name: 'Red primaria', completed: false, color: 'accent' },
          { id: 3, name: 'Red secudaria', completed: false, color: 'warn' },
        ],
      }
      

    ];

//    this.data[0].subtasks[0].completed == true
    
    this.cargarCapas();
    this.mostarCapas(this.data);
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

    this.tileBase = new TileLayer({
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      })
    })

    this.tileLineasExpLP = this.customTileLayer('solredes:linea', "n_version =1 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileAtributosExpLP = this.customTileLayer('solredes:punto', "n_version =1 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileLineasExpRP = this.customTileLayer('solredes:linea', "n_version =1 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileAtributosExpRP = this.customTileLayer('solredes:punto', "n_version =1 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileLineasExpRS = this.customTileLayer('solredes:linea', "n_version =1 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileAtributosExpRS = this.customTileLayer('solredes:punto', "n_version =1 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);

    this.tileLineasRepLP = this.customTileLayer('solredes:linea', "n_version =2 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileAtributosRepLP = this.customTileLayer('solredes:punto', "n_version =2 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileLineasRepRP = this.customTileLayer('solredes:linea', "n_version =2 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileAtributosRepRP = this.customTileLayer('solredes:punto', "n_version =2 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileLineasRepRS = this.customTileLayer('solredes:linea', "n_version =2 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileAtributosRepRS = this.customTileLayer('solredes:punto', "n_version =2 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);

    this.tileLineasMonLP = this.customTileLayer('solredes:linea', "n_version =3 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileAtributosMonLP = this.customTileLayer('solredes:punto', "n_version =3 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileLineasMonRP = this.customTileLayer('solredes:linea', "n_version =3 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileAtributosMonRP = this.customTileLayer('solredes:punto', "n_version =3 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileLineasMonRS = this.customTileLayer('solredes:linea', "n_version =3 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileAtributosMonRS = this.customTileLayer('solredes:punto', "n_version =3 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);

    this.tileLineasConLP = this.customTileLayer('solredes:linea', "n_version =4 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileAtributosConLP = this.customTileLayer('solredes:punto', "n_version =4 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileLineasConRP = this.customTileLayer('solredes:linea', "n_version =4 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileAtributosConRP = this.customTileLayer('solredes:punto', "n_version =4 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileLineasConRS = this.customTileLayer('solredes:linea', "n_version =4 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileAtributosConRS = this.customTileLayer('solredes:punto', "n_version =4 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);

    this.tileLineasMonInspReplantLP = this.customTileLayer('solredes:lineaMonInsp', "n_tipoapp = 2 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileAtributosMonInspReplantLP = this.customTileLayer('solredes:puntoMonInsp', "n_tipoapp = 2 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileLineasMonInspReplantRP = this.customTileLayer('solredes:lineaMonInsp', "n_tipoapp = 2 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileAtributosMonInspReplantRP = this.customTileLayer('solredes:puntoMonInsp', "n_tipoapp = 2 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileLineasMonInspReplantRS = this.customTileLayer('solredes:lineaMonInsp', "n_tipoapp = 2 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileAtributosMonInspReplantRS = this.customTileLayer('solredes:puntoMonInsp', "n_tipoapp = 2 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);

    this.tileLineasMonInspMontLP = this.customTileLayer('solredes:lineaMonInsp', "n_tipoapp = 3 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileLineasMonInspMontRP = this.customTileLayer('solredes:lineaMonInsp', "n_tipoapp = 3 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileLineasMonInspMontRS = this.customTileLayer('solredes:lineaMonInsp', "n_tipoapp = 3 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileAtributosMonInspMontLP = this.customTileLayer('solredes:puntoMonInsp', "n_tipoapp = 3 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileAtributosMonInspMontRP = this.customTileLayer('solredes:puntoMonInsp', "n_tipoapp = 3 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileAtributosMonInspMontRS = this.customTileLayer('solredes:puntoMonInsp', "n_tipoapp = 3 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);

    this.tileLineasMonInspConfObraLP = this.customTileLayer('solredes:lineaMonInsp', "n_tipoapp = 4 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileLineasMonInspConfObraRP = this.customTileLayer('solredes:lineaMonInsp', "n_tipoapp = 4 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileLineasMonInspConfObraRS = this.customTileLayer('solredes:lineaMonInsp', "n_tipoapp = 4 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileAtributosMonInspConfObraLP = this.customTileLayer('solredes:puntoMonInsp', "n_tipoapp = 4 and n_idpl_tipolinea = 1 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileAtributosMonInspConfObraRP = this.customTileLayer('solredes:puntoMonInsp', "n_tipoapp = 4 and n_idpl_tipolinea = 2 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);
    this.tileAtributosMonInspConfObraRS = this.customTileLayer('solredes:puntoMonInsp', "n_tipoapp = 4 and n_idpl_tipolinea = 3 and n_idpro_proyecto = " + this.proyecto.n_idpro_proyecto);

    
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

    
    const akfd = new TileLayer;
    akfd.setVisible(true)
    this.usuarioLog = this.getUser().data;

    this.getPantallaRol();    

    const view = new View({
      center: [this.lng, this.lat],
      zoom: this.zoom,
      projection: 'EPSG:4326'
    });

    this.map = new Map({
      target: 'ol-map',
      layers: [
        this.tileBase,
        this.tileLineasExpLP,
        this.tileAtributosExpLP,
        this.tileLineasExpRP,
        this.tileAtributosExpRP,
        this.tileLineasExpRS,
        this.tileAtributosExpRS,

        this.tileLineasRepLP,
        this.tileAtributosRepLP,
        this.tileLineasRepRP,
        this.tileAtributosRepRP,
        this.tileLineasRepRS,
        this.tileAtributosRepRS,

        this.tileLineasMonLP,
        this.tileAtributosMonLP,
        this.tileLineasMonRP,
        this.tileAtributosMonRP,
        this.tileLineasMonRS,
        this.tileAtributosMonRS,

        this.tileLineasConLP,
        this.tileAtributosConLP,
        this.tileLineasConRP,
        this.tileAtributosConRP,
        this.tileLineasConRS,
        this.tileAtributosConRS,

        this.tileLineasMonInspReplantLP,
        this.tileLineasMonInspReplantRP,
        this.tileLineasMonInspReplantRS,
        this.tileAtributosMonInspReplantLP,
        this.tileAtributosMonInspReplantRP,
        this.tileAtributosMonInspReplantRS,
      ],
      view: view,/*new View({
        center: [this.lng, this.lat],
        zoom: this.zoom,
        projection: 'EPSG:4326'
      }),*/
      controls: defaultControls({ attribution: true, zoom: true }).extend([])
    });

    

    const aux2 = this.tileAtributosExpLP.sourceChangeKey_.target;
    const aux4 = this.tileAtributosExpRP.sourceChangeKey_.target;
    
    const aux6 = this.tileAtributosExpRS.sourceChangeKey_.target;

    const aux10 = this.tileAtributosRepLP.sourceChangeKey_.target;
    const aux11 = this.tileAtributosRepRP.sourceChangeKey_.target;
    const aux12 = this.tileAtributosRepRS.sourceChangeKey_.target;

    const aux16 = this.tileAtributosMonLP.sourceChangeKey_.target;
    const aux17 = this.tileAtributosMonRP.sourceChangeKey_.target;
    const aux18 = this.tileAtributosMonRS.sourceChangeKey_.target;

    const aux22 = this.tileAtributosConLP.sourceChangeKey_.target;
    const aux23 = this.tileAtributosConRP.sourceChangeKey_.target;
    const aux24 = this.tileAtributosConRS.sourceChangeKey_.target;

    const aux28 = this.tileAtributosMonInspReplantLP.sourceChangeKey_.target;
    const aux29 = this.tileAtributosMonInspReplantRP.sourceChangeKey_.target;
    const aux30 = this.tileAtributosMonInspReplantRS.sourceChangeKey_.target;

    const aux34 = this.tileAtributosMonInspMontLP.sourceChangeKey_.target;
    const aux35 = this.tileAtributosMonInspMontRP.sourceChangeKey_.target;
    const aux36 = this.tileAtributosMonInspMontRS.sourceChangeKey_.target;

    const aux40 = this.tileAtributosMonInspConfObraLP.sourceChangeKey_.target;
    const aux41 = this.tileAtributosMonInspConfObraRP.sourceChangeKey_.target;
    const aux42 = this.tileAtributosMonInspConfObraRS.sourceChangeKey_.target;

    this.map.on('singleclick', (evt) => {
      this.spinner = true;
      console.log("CLICK-------------");
      //console.log(evt);
      //console.log(evt.coordinate);  
      const viewResolution = /** @type {number} */ (view.getResolution());
      //console.log("viewResolution: "+viewResolution);
      
      let url2 = aux2.getFeatureInfoUrl(evt.coordinate,viewResolution, 'EPSG:4326',{'INFO_FORMAT': 'application/json'});
      let url4 = aux4.getFeatureInfoUrl(evt.coordinate,viewResolution, 'EPSG:4326',{'INFO_FORMAT': 'application/json'});
      let url6 = aux6.getFeatureInfoUrl(evt.coordinate,viewResolution, 'EPSG:4326',{'INFO_FORMAT': 'application/json'});  
      
      let url10 = aux10.getFeatureInfoUrl(evt.coordinate,viewResolution, 'EPSG:4326',{'INFO_FORMAT': 'application/json'});
      let url11 = aux11.getFeatureInfoUrl(evt.coordinate,viewResolution, 'EPSG:4326',{'INFO_FORMAT': 'application/json'});
      let url12 = aux12.getFeatureInfoUrl(evt.coordinate,viewResolution, 'EPSG:4326',{'INFO_FORMAT': 'application/json'});

      let url16 = aux16.getFeatureInfoUrl(evt.coordinate,viewResolution, 'EPSG:4326',{'INFO_FORMAT': 'application/json'});
      let url17 = aux17.getFeatureInfoUrl(evt.coordinate,viewResolution, 'EPSG:4326',{'INFO_FORMAT': 'application/json'});
      let url18 = aux18.getFeatureInfoUrl(evt.coordinate,viewResolution, 'EPSG:4326',{'INFO_FORMAT': 'application/json'});
      
      let url22 = aux22.getFeatureInfoUrl(evt.coordinate,viewResolution, 'EPSG:4326',{'INFO_FORMAT': 'application/json'});
      let url23 = aux23.getFeatureInfoUrl(evt.coordinate,viewResolution, 'EPSG:4326',{'INFO_FORMAT': 'application/json'});
      let url24 = aux24.getFeatureInfoUrl(evt.coordinate,viewResolution, 'EPSG:4326',{'INFO_FORMAT': 'application/json'});

      let url28 = aux28.getFeatureInfoUrl(evt.coordinate,viewResolution, 'EPSG:4326',{'INFO_FORMAT': 'application/json'});
      let url29 = aux29.getFeatureInfoUrl(evt.coordinate,viewResolution, 'EPSG:4326',{'INFO_FORMAT': 'application/json'});
      let url30 = aux30.getFeatureInfoUrl(evt.coordinate,viewResolution, 'EPSG:4326',{'INFO_FORMAT': 'application/json'});

      let url34 = aux34.getFeatureInfoUrl(evt.coordinate,viewResolution, 'EPSG:4326',{'INFO_FORMAT': 'application/json'});
      let url35 = aux35.getFeatureInfoUrl(evt.coordinate,viewResolution, 'EPSG:4326',{'INFO_FORMAT': 'application/json'});
      let url36 = aux36.getFeatureInfoUrl(evt.coordinate,viewResolution, 'EPSG:4326',{'INFO_FORMAT': 'application/json'});

      let url40 = aux40.getFeatureInfoUrl(evt.coordinate,viewResolution, 'EPSG:4326',{'INFO_FORMAT': 'application/json'});
      let url41 = aux41.getFeatureInfoUrl(evt.coordinate,viewResolution, 'EPSG:4326',{'INFO_FORMAT': 'application/json'});
      let url42 = aux42.getFeatureInfoUrl(evt.coordinate,viewResolution, 'EPSG:4326',{'INFO_FORMAT': 'application/json'});

      //const dataAux = this.data
      
      this.data.forEach(element => {
        let checkOk = element.subtasks.filter(o => o.completed == true);
        console.log(checkOk);
        if (checkOk.length > 0) {
          switch (element.version) {
            case 1:
              if(checkOk.filter(o => o.completed && o.id == 1).length > 0){
                console.log("url2---------------- "+url2);
                this.geData(url2);
              };
              if(checkOk.filter(o => o.completed && o.id == 2).length > 0){
                console.log("url4---------------- "+url4);
                this.geData(url4);
              };
              if(checkOk.filter(o => o.completed && o.id == 3).length > 0){
                console.log("url6---------------- "+url6);
                this.geData(url6);
              };
              break;
            case 2:
              if(checkOk.filter(o => o.completed && o.id == 1).length > 0){
                console.log("url10---------------- "+url10);
                this.geData(url10);
              };
              if(checkOk.filter(o => o.completed && o.id == 2).length > 0){
                console.log("url11---------------- "+url11);
                this.geData(url11);
              };
              if(checkOk.filter(o => o.completed && o.id == 3).length > 0){
                console.log("url12---------------- "+url12);
                this.geData(url12);
              } 
              break;
            case 3:
              if(checkOk.filter(o => o.completed && o.id == 1).length > 0){
                console.log("url16---------------- "+url16);
                this.geData(url16);
              };  
              if(checkOk.filter(o => o.completed && o.id == 2).length > 0){
                console.log("url17---------------- "+url17);
                this.geData(url6);
              };
              if(checkOk.filter(o => o.completed && o.id == 3).length > 0){
                console.log("url18---------------- "+url18);
                this.geData(url18);
              } 
              break;
            case 4:
              if(checkOk.filter(o => o.completed && o.id == 1).length > 0){
                console.log("url22---------------- "+url22);
                this.geData(url22);
              };
              if(checkOk.filter(o => o.completed && o.id == 2).length > 0){
                console.log("url23---------------- "+url23);
                this.geData(url23);
              };
              if(checkOk.filter(o => o.completed && o.id == 3).length > 0){
                console.log("url24---------------- "+url24);
                this.geData(url24);
              }   
              break;
          }
          if(checkOk.filter(o => o.completed && o.id == 1).length > 0){
            console.log("url28----------------"+url28);
            this.geData(url28);
          };
          if(checkOk.filter(o => o.completed && o.id == 2).length > 0){
            console.log("url29----------------"+url29);
            this.geData(url29);
          };
          if(checkOk.filter(o => o.completed && o.id == 3).length > 0){
            console.log("url30----------------"+url30);
            this.geData(url30);
          };
  
          if(checkOk.filter(o => o.completed && o.id == 1).length > 0){
            console.log("url34----------------"+url34);
            this.geData(url34);
          };
          if(checkOk.filter(o => o.completed && o.id == 2).length > 0){
            console.log("url35----------------"+url35);
            this.geData(url35);
          };
          if(checkOk.filter(o => o.completed && o.id == 3).length > 0){
            console.log("url36----------------"+url36);
            this.geData(url36);
          };
  
          if(checkOk.filter(o => o.completed && o.id == 1).length > 0){
            console.log("url40----------------"+url40);
            this.geData(url40);
          };
          if(checkOk.filter(o => o.completed && o.id == 2).length > 0){
            console.log("url41----------------"+url41);
            this.geData(url41);
          };
          if(checkOk.filter(o => o.completed && o.id == 3).length > 0){
            console.log("url42----------------"+url42);
            this.geData(url42);
          };
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
  
  geData(url){
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

  buscarEstruct(dato){
    const dialogRef = this.dialog.open(FiltroBuscarComponent, {
      width: '600px',
      data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {      
      if(result){
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

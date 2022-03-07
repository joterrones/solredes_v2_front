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



@Component({
  selector: 'app-mapa-general',
  templateUrl: './mapa-general.component.html',
  styleUrls: ['./mapa-general.component.css'],
  providers: [SeguridadService, confGeneralService, MapaService]
})
export class MapaGeneralComponent extends BaseComponent implements OnInit {
  pantallaRol = [];
  permisoEdit: boolean = false;

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

    
    //console.log("tileLineasExpLP---------------------------"+this.tileLineasExpLP.getSource());

    this.usuarioLog = this.getUser().data;

    this.getPantallaRol();    

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
      view: new View({
        center: [this.lng, this.lat],
        zoom: this.zoom,
        projection: 'EPSG:4326'
      }),
      controls: defaultControls({ attribution: true, zoom: true }).extend([])
    });

    /*this.map.on('singleclick', function(event){
      console.log(this.tileLineasExpLP.getData(event.pixel));
    });*/
    
    /*this.myVectorLayer = new Vector({
      source : new VectorSource({      
        url: this.url,          
        //overlaps: true,
        format : new GeoJSON(),               
      }),
      visible: true,
      
    });*/
    //console.log("-------------------------------------"+this.myVectorLayer.on());
    //this.map.addLayer(this.myVectorLayer);

    this.map.on('singleclick', function(evt) {
      console.log("CLICK-------------");
      console.log(evt);  
      //const selectSingleClick = new Select({style: selectStyle});
      /*var feature = this.map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
          // Aquí se puede filtrar la feature
          return feature;
      });
      if (feature) {
          console.log("Click en: ", feature);
      }*/
    });
  }
  /*click(event: any){
    this.map.forEachLayerAtPixel(this.map.getEventPixel(event))
  }*/
  

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

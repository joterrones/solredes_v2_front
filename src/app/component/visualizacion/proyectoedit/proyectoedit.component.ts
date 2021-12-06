import { Component, Inject, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';
import { ProyectoService } from '../../../service/proyecto.service';
import { TipoProyectoService } from '../../../service/tipoproyecto.service';
import { ProyectoInterface } from '../../../interface/proyecto.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MapaService } from '../../../service/mapa.services';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-proyectoedit',
  templateUrl: './proyectoedit.component.html',
  styleUrls: ['./proyectoedit.component.css'],
  providers: [ProyectoService, TipoProyectoService, MapaService]
})
export class ProyectoeditComponent extends BaseComponent implements OnInit {
  
  proyecto: any;
  atributos= [];
  tipoproyectos: [];
  unidadejecutoras: [];
  unidadformuladoras: [];
  tipoejecuciones: [];
  fuentefinanciamientos: [];
  //archivos: [any];
  fases = [];
  changing = false;

  firstFormGroup: FormGroup;
  file: any;

  public tablaatributo: MatTableDataSource<any>;
  displayedColumnsAtributo: string[] = ['nombreatributo', 'valoratributo'];
  @ViewChild(MatPaginator, { static: false }) paginatoratributo: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortatributo: MatSort;

  public tablafile: MatTableDataSource<any>;
  displayedColumnsFile: string[] = ['nombreatributo', 'valoratributo', 'subir'];
  @ViewChild(MatPaginator, { static: false }) paginatorfile: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortfile: MatSort;

  constructor(public dialogRef: MatDialogRef<ProyectoeditComponent>,
    private _proyecto_service: ProyectoService,
    private _tipoproyecto_service: TipoProyectoService,
    @Inject(MAT_DIALOG_DATA) public data: ProyectoInterface,
    public _router: Router,
    private _formBuilder: FormBuilder,
    public snackBar: MatSnackBar, private changeDetectorRef: ChangeDetectorRef,
    private _mapa_service: MapaService,) {
    super(snackBar, _router);
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      //  firstCtrl: ['', Validators.required]
    });
    this.proyecto = this.data;
    if (this.proyecto == null) {
      this.proyecto = {
        n_idgen_proyecto: 0,
        n_idgen_tipoproyecto: 0,
        c_nombreproyecto: '',
        n_id_unidadformuladora: 0,
        n_id_unidadejecutora: 0,
        n_id_tipoejecucion: 0,
        n_id_fuentefinanciamiento: 0,
        c_codigomem: '',
        c_codigocui: '',
        c_codigosnip: '',
        c_objetivoproyecto: '',
        n_plazoejecucion: 0,
        n_nrousuarios: 0,
        n_nroviviendas: 0
      }
    }
    this.get_proyecto_atributo();
    this.getunidadejecutora();
    this.getriporpoyecto();


  }

  get_proyecto_atributo() {
    let req = { n_idgen_proyecto: this.proyecto.n_idgen_proyecto }
    this._proyecto_service.get_proyecto_atributo(req, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.fases = result.data;
            if (this.fases.length > 0) {
              this.tabselected(0);
            }
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
        }
      }, error => {
        this.openSnackBar(error.stack, 99);
      });
  }

  getunidadejecutora() {
    let req = {}
    this._proyecto_service.get_lista(req, this.getToken().token).subscribe(
      result => {

        try {
          if (result.estado) {

            let items = result.data;
            this.unidadejecutoras = items.filter(o => o.n_idgen_grupolista == 3);
            this.unidadformuladoras = items.filter(o => o.n_idgen_grupolista == 2);
            this.tipoejecuciones = items.filter(o => o.n_idgen_grupolista == 4);
            this.fuentefinanciamientos = items.filter(o => o.n_idgen_grupolista == 5);
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }

  getriporpoyecto() {
    this._tipoproyecto_service.get(this.getToken().token).subscribe(
      result => {

        try {
          if (result.estado) {
            this.tipoproyectos = result.data;
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }


  guardar() {
    let atributosrq=[];
    this.fases.forEach(element => {
      element.atributos.forEach(item => {
        atributosrq.push(item);
      });
    });
    var atributofinal = atributosrq;
    this.proyecto.atributos = atributofinal;
    this._proyecto_service.save(this.proyecto, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
  
            this.proyecto.n_idgen_proyecto = result.data[0].n_idgen_proyecto;
       
            this.dialogRef.close({ flag: true, data: this.proyecto });
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      }, error => {
        console.error(error);
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  uploadfile(files: FileList, item) {
    this.file = files.item(0);
    this.uploadFileToActivity(item)
  }
  uploadFileToActivity(item) {
    let extension = this.file.name;
    this._proyecto_service.uploadfile(extension, "PROY_" + this.proyecto.n_idgen_proyecto, this.file, this.getToken().token).subscribe(
      result => {
        if (result.estado) {
          item.c_valoratributo = result.c_ruta;
        } else {
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        this.openSnackBar(<any>error, 99);
        alert(error.error);
      });
  }


  download(nombre) {
    this._mapa_service.download("PROY_" + this.proyecto.n_idgen_proyecto + "/" + nombre).subscribe(
      result => {
        saveAs(result, nombre);
      }, error => {
        this.openSnackBar(<any>error, 99);
      });

  }

  decimalValid(value: string, item) {
    console.log(value)
    if (value != "") {
      let splt = value.split(",");
      if (splt.length > 1) {
        item.c_valoratributo = "";
        this.openSnackBar("No se puede ingresar caracteres no númericos ni comas!", 99);
      } else {
        let valor = parseFloat(value);
        if (isNaN(valor)) {
          item.c_valoratributo = "";
          this.openSnackBar("No se puede ingresar caracteres no númericos ni comas!", 99);
        }
      }
    }
  }

  tabselected(event) {
    this.changing = true;
    let fase = this.fases[event];
    this.atributos = fase.atributos;

    this.tablaatributo = new MatTableDataSource<any>(this.atributos);
    this.tablaatributo.sort = this.sortatributo;
    this.tablaatributo.paginator = this.paginatoratributo;


    this.changing = false;

  }
}

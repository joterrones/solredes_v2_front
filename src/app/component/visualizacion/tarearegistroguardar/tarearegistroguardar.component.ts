import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { MatDialog } from '@angular/material';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';
import { ProyectoService } from '../../../service/proyecto.service';
import { MapaService } from '../../../service/mapa.services';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { saveAs } from 'file-saver';
import { AppSettings } from '../../../common/appsettings';

import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/helper/format-datepicker';
@Component({
  selector: 'app-tarearegistroguardar',
  templateUrl: './tarearegistroguardar.component.html',
  styleUrls: ['./tarearegistroguardar.component.css'],
  providers: [ProyectoService, MapaService, { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }],

})
export class TarearegistroguardarComponent extends BaseComponent implements OnInit {
  LineatiempototalComponent
  tarea: any;
  proyecto: any;
  dateprogramada = new FormControl(new Date());
  datefin = new FormControl(new Date());
  datosadicionales = [];

  public tablaatributo: MatTableDataSource<any>;
  displayedColumnsAtributo: string[] = ['nombreatributo', 'valoratributo', 'subir'];
  @ViewChild(MatPaginator, { static: false }) paginatoratributo: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortatributo: MatSort;

  file: any;

  constructor(
    private _proyecto_service: ProyectoService,
    private _mapa_service: MapaService,
    public _router: Router, public dialog: MatDialog,
    public snackBar: MatSnackBar, private changeDetectorRef: ChangeDetectorRef) {
    super(snackBar, _router);
  }

  ngOnInit() {

  }

  setData(data, proyecto) {
    this.proyecto = proyecto;
    this.tarea = data;

    this.dateprogramada = new FormControl(this.tarea.d_fechaprogramada);
    this.datefin = new FormControl(this.tarea.d_fechafin);
    this.get_datoadicional_registro();
  }

  setfechafin(event: MatDatepickerInputEvent<Date>) {
    this.tarea.d_fechafin = event.value;
  }

  setfechainicio(event: MatDatepickerInputEvent<Date>) {
    this.tarea.d_fechaprogramada = event.value;
  }

  get_datoadicional_registro() {
    let req = { n_idpro_tareaproyecto: this.tarea.n_idpro_tareaproyecto }
    this._proyecto_service.get_datoadicional_registro(req).subscribe(
      result => {
        try {
          if (result.estado) {
            this.datosadicionales = result.data;
            this.tablaatributo = new MatTableDataSource<any>(this.datosadicionales);
            this.tablaatributo.sort = this.sortatributo;
            this.tablaatributo.paginator = this.paginatoratributo;
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

  save(flag) {
    this.tarea.b_aplica = flag;
    this.tarea.valoresadicionales = this.datosadicionales;
    if (!flag) {
      if (this.tarea.d_fechafin != null) {
        const dialogRef = this.dialog.open(ConfirmComponent, {
          width: '500px',
          data: { titulo: "guardar sin completar los datos?" }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.guardar();
          }
        });
      } else {
        this.openSnackBar("Ingrese la fecha de finalización de la tarea", 99);
      }
    } else {
      this.guardar();
    }
  }

  guardar() {
    this._proyecto_service.save_valor_datoadicional(this.tarea).subscribe(
      result => {
        try {
          if (result.estado) {
            this.openSnackBar("Dato Guardado!", 200);
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

  uploadfile(files: FileList, item) {
    this.file = files.item(0);
    this.uploadFileToActivity(item)
  }

  uploadFileToActivity(item) {
    let extension = this.file.name;
    this._proyecto_service.uploadfile(extension, "PROY_" + this.proyecto.n_idgen_proyecto, this.file, this.getToken().token).subscribe(
      result => {
        if (result.estado) {
          item.c_valor = result.c_ruta;
          this.changeDesc(item.n_idgen_datoadicional, item.c_valor);
        } else {
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        this.openSnackBar(<any>error, 99);
        alert(error.error);
      });
  }

  changeDesc(n_idpro_atributo, c_valor) {
    for (var i in this.datosadicionales) {
      if (this.datosadicionales[i].n_idpro_atributo == n_idpro_atributo) {
        this.datosadicionales[i].c_valor = c_valor;
        break;
      }
    }
  }

  download(nombre) {
    this._mapa_service.download("PROY_" + this.proyecto.n_idgen_proyecto + "/" + nombre).subscribe(
      result => {
        saveAs(result, nombre);
      }, error => {
        this.openSnackBar(<any>error, 99);
      });
  }

  selectTarea(tarea) {
    tarea.b_flag = true;
  }

  decimalValid = (value: string, item) => {
    const pattern = /[0-9\.\ ]/;
    var arrayvalues = value.split("");
    arrayvalues.forEach(inputChar => {
      if (!pattern.test(inputChar)) {
        item.c_valor = "";
        this.openSnackBar("No se puede ingresar caracteres no númericos ni comas!", 99);
      }
    });
  }

  decimalValid2 = (value: string, item) => {
    const pattern = /^-?[0-9\.\ ]/;
    var arrayvalues = value.split("");
    arrayvalues.forEach(inputChar => {
      if (!pattern.test(inputChar)) {
        if (inputChar != '-') {
          item.c_valor = "";
          this.openSnackBar("No se puede ingresar caracteres no númericos ni comas!", 99);
        }
      }
    });
  }

}

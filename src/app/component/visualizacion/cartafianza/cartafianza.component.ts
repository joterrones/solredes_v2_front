import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings'
import { Router } from "@angular/router";
import { BaseComponent } from '../../base/base.component';
import { Confirmar } from '../../../interface/confirmar.interface';
import { ProyectoService } from '../../../service/proyecto.service';
import { TareaService } from '../../../service/tarea.service';
import {MapaService} from '../../../service/mapa.services';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { FormControl } from '@angular/forms';
import { saveAs } from 'file-saver';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/helper/format-datepicker';

@Component({
  selector: 'app-cartafianza',
  templateUrl: './cartafianza.component.html',
  styleUrls: ['./cartafianza.component.css'],
  providers: [ProyectoService, TareaService, MapaService,{ provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }],
})
export class CartafianzaComponent extends BaseComponent implements OnInit {
  n_idgen_proyecto: number = 0;
  cartas = [];
  estados = ['VIGENTE', 'VENCIDA'];
  tipocartas = [];
  textfilter = '';
  displayedColumns: string[] = ['editar', 'nroducumento', 'entidad', 'monto', 'fechaemision', 'fechavencimiento', 'estado', 'eliminar'];
  f_edit: boolean = false;
  fases = [];
  carta: any;
  file: any;

  public tabla: MatTableDataSource<any>;
  public confirmar: Confirmar;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  dateemision = new FormControl(new Date());
  datevencimiento = new FormControl(new Date());
  n_idgen_fase = 0;
  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _proyecto_service: ProyectoService,
    public _tarea_service: TareaService,
    public _mapa_service: MapaService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CartafianzaComponent>
  ) {
    super(snackBar, router);
  }

  ngOnInit() {
    this.n_idgen_proyecto = this.data.n_idgen_proyecto;
    this.getFase();
    this.get();
  }

  selectFase(){
    this.get();
  }

  setfechaemision(event: MatDatepickerInputEvent<Date>) {
    this.carta.d_fechaemision = event.value;
  }

  setfechaavance(event: MatDatepickerInputEvent<Date>) {
    this.carta.d_fechavence = event.value;
  }

  get() {
    let rq = {
      n_idgen_proyecto: this.n_idgen_proyecto,
      n_idgen_fase: this.n_idgen_fase
    };
  
    this._proyecto_service.get_cartafianza(rq).subscribe(
      result => {
        try {
          if (result.estado) {
            this.cartas = result.data;
            this.cargarTabla();
          } else {
            this.openSnackBar(result.mensaje, 99);
            console.log(result.mensaje);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
          this.applyFilter(this.textfilter);
        }
      }, error => {
        this.openSnackBar(error.error, 99);
        console.log(error.error);
      });
  }

  applyFilter(filterValue: String) {
    this.tabla.filter = filterValue.trim().toLowerCase();
  }

  edit = (item?) => {
    this.getFase();
    this.getTipoCarta();
    this.f_edit = true;
    if (item) {
      this.carta = item;
      this.dateemision = new FormControl(this.carta.d_fechaemision);
      this.datevencimiento = new FormControl(this.carta.d_fechavence);
    } else {
      this.carta = {
        n_idpro_cartagarantia: 0,
        n_idgen_proyecto: 0,
        n_idgen_fase: 0,
        n_idgen_tipocarta: 0,
        c_nro_documento: "",
        c_entidad: "",
        d_fechaemision: new Date(),
        d_fechavence: new Date(),
        c_estado: "",
        c_observaciones: "",
        c_ruta: "",
        n_monto: 0,
      }

    }
  }

  getFase() {
    this._tarea_service.get_fase(this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {

            this.fases = result.data;
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

  getTipoCarta() {
    this._proyecto_service.get_tipocarta().subscribe(
      result => {
        try {
          if (result.estado) {
            this.tipocartas = result.data;
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

  cargarTabla() {
    this.tabla = new MatTableDataSource<any>(this.cartas);
    this.tabla.sort = this.sort;
    this.tabla.paginator = this.paginator;
  }

  uploadfile(files: FileList) {
    this.file = files.item(0);
    this.uploadFileToActivity()
  }

  uploadFileToActivity() {
    let extension = this.file.name;
    this._proyecto_service.uploadfile(extension, "PROY_" + this.n_idgen_proyecto, this.file, this.getToken().token).subscribe(
      result => {
        if (result.estado) {
          this.carta.c_ruta = result.c_ruta;
        } else {
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        this.openSnackBar(<any>error, 99);
        alert(error.error);
      });
  }

  download(nombre) {
    this._mapa_service.download("PROY_" + this.n_idgen_proyecto + "/" + nombre).subscribe(
      result => {
        saveAs(result, nombre);
      }, error => {
        this.openSnackBar(<any>error, 99);
      });
  }

  save = (form) => {
    this.carta.n_idgen_proyecto = this.n_idgen_proyecto;
    this._proyecto_service.save_cartafianza(this.carta).subscribe(
      result => {
        try {
          if (result.estado) {
            this.get();
            this.cerrar();
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
          this.applyFilter(this.textfilter);
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }

  cerrar = () => {
    this.f_edit=false;
  }

  comfirm_delete= (item): void => {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el carta " + item.c_nro_documento + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.delete(item);
      }
    });
  }

   delete= (item)=> {
     this._proyecto_service.delete_cartafianza(item).subscribe(
       result => {
         try {
           if (result.estado) {
             this.get();
           } else {
             this.openSnackBar(result.mensaje, 99);
           }
         } catch (error) {
           this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
         } finally {
           this.applyFilter(this.textfilter);
         }
       }, error => {
         this.openSnackBar(error.error, 99);
       });
   }

   decimalValid(value: string, item) {
    if (value != "") {
      let splt = value.split(",");
      if (splt.length > 1) {
        item.c_valor = "";
        this.openSnackBar("No se puede ingresar caracteres no númericos ni comas!", 99);
      } else {
        let valor = parseFloat(value);
        if (isNaN(valor)) {
          item.c_valor = "";
          this.openSnackBar("No se puede ingresar caracteres no númericos ni comas!", 99);
        }
      }
    }
  }
}

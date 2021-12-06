import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings'
import { Router } from "@angular/router";
import { BaseComponent } from '../../base/base.component';
import { Confirmar } from '../../../interface/confirmar.interface';
import { ProyectoService } from '../../../service/proyecto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectoeditComponent } from '../proyectoedit/proyectoedit.component';
import {DetalleproyectoComponent} from '../../general/detalleproyecto/detalleproyecto.component';
import { ProyectoInterface } from '../../../interface/proyecto.interface';
import { ProyectoconfigComponent } from '../proyectoconfig/proyectoconfig.component';
import { ProyectofechaComponent } from '../../visualizacion/proyectofecha/proyectofecha.component';
import { ProyectoregistroComponent } from '../proyectoregistro/proyectoregistro.component';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { ProyectousuarioComponent } from '../../seguridad/proyectousuario/proyectousuario.component';
import { CartafianzaComponent } from '../cartafianza/cartafianza.component';
import {SituacionComponent} from '../situacion/situacion.component';
import {TareaService} from '../../../service/tarea.service';
import {UbigeoService} from '../../../service/ubigeo.service';
import {BolsaProyectoService} from '../../../service/bolsaproyecto.service';
import {ExcelService} from '../../../service/excel.service';
import {ExcelFormatService} from '../../../service/excelformat.service';
@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css'],
  providers: [ProyectoService,TareaService,UbigeoService,ExcelService,ExcelFormatService,BolsaProyectoService]
})
export class ProyectoComponent extends BaseComponent implements OnInit {
  ocultargrilla:boolean = true;
  @ViewChild(ProyectoregistroComponent, { static: false }) hijo: ProyectoregistroComponent;
  tit: String = "SEGURIDAD > GESTOR DE USUARIOS";
  proyectos: [];
  roles: [];
  idroles = 0;
  entidades: [];
  identidad = 0;
  textfilter = '';
  loading= false;
  proyecto: ProyectoInterface = { n_idgen_proyecto: 0, c_nro: "", c_cui: "", c_nombre: "", c_coordinador: "", c_gestor: "" }

  tareas = [];
  fases = [];
  n_idgen_fase=0;

  departamentos = [];
  provincias = [];
  distritos = [];
  centropoblados = [];
  annios = [];

  iddepartamento: number = 0;
  idprovincia: number = 0;
  iddistrito: number = 0;
  idcentropoblado: number = 0;
  annio: number = 0;

  displayedColumns: string[] = ['editar', 'c_nombre', 'c_codigocui', 'c_codigomem', 'n_nrousuarios', 'n_nroviviendas','fase', 'orden','confi'];
  public tablaUsuarios: MatTableDataSource<any>;
  public confirmar: Confirmar;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _proyecto_service: ProyectoService,
    public _excel_service: ExcelService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _tarea_service:TareaService,
    private _ubigeo_service: UbigeoService,
    private _excelformat_service: ExcelFormatService,
    private _bolsaproyecto_service: BolsaProyectoService
  ) {
    super(snackBar, router);
  }

  ngOnInit() {
    this.getFase();
    this.getDepartamento();
    this.getAnnio();
    this.get_tabla();
  }

  selectFase(id){
    this.n_idgen_fase=id;
    this.get_tabla();
  }

  selectDepartamento(id){
    this.iddepartamento = id;
    this.getProvincia();
    this.get_tabla();
  }

  selectProvincia(id){
    this.idprovincia = id;
    this.getDistrito();
    this.get_tabla();
  }

  selectDistrito(id){
    this.iddistrito = id;
    this.getCentoPoblado();
    this.get_tabla();
  }

  selectCentroPoblado(id){
    this.idcentropoblado = id;
    this.get_tabla();
  }

  selectAnnio(id){
    this.annio = id;
    this.get_tabla();
  }

  getFase() {
    this._tarea_service.get_fase(this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.fases = result.data
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

  getDepartamento() {
    this._ubigeo_service.get_departamento({},this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.departamentos = result.data
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

  getProvincia() {
    this._ubigeo_service.get_provincia({n_idgen_departamento:this.iddepartamento},this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.provincias = result.data
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

  getDistrito() {
    this._ubigeo_service.get_distrito({n_idgen_provincia:this.idprovincia,n_idgen_departamento:this.iddepartamento},this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.distritos = result.data
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

  getCentoPoblado() {
    this._ubigeo_service.get_centropoblado({n_idgen_departamento:this.iddepartamento,n_idgen_provincia:this.idprovincia, n_idgen_distrito:this.iddistrito}).subscribe(
      result => {
        try {
          if (result.estado) {
            this.centropoblados = result.data
            console.log("Listado de centro poblado");
            console.log(result.data);
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

  getAnnio() {
    this._bolsaproyecto_service.getannio({},this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.annios = result.data
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

  
  get_tabla() {
    this.loading = true;
    let req = {
      n_idgen_fase:this.n_idgen_fase,
      n_idgen_departamento: this.iddepartamento,
      n_idgen_provincia: this.idprovincia,
      n_idgen_distrito: this.iddistrito,
      n_idgen_centropoblado: this.idcentropoblado
    }
    console.log(req);
    this._proyecto_service.get(req).subscribe(
      result => {
        try {
          if (result.estado) {
            this.proyectos = result.data;
            this.tablaUsuarios = new MatTableDataSource<any>(result.data);
            this.tablaUsuarios.sort = this.sort;
            this.tablaUsuarios.paginator = this.paginator;
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
          this.applyFilter(this.textfilter);
          this.loading = false;
        }
      }, error => {
        this.openSnackBar(error.error, 99);
        this.loading = false;
      });
  }

  applyFilter(filterValue: String) {
    this.tablaUsuarios.filter = filterValue.trim().toLowerCase();
  }

  detalle(proyecto) {
    this.proyecto = proyecto;
    let rq = { n_idgen_proyecto: proyecto.n_idgen_proyecto }
    this._proyecto_service.getid(rq, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.tareas = result.data;
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

    this._proyecto_service.getid_dos(rq, this.getToken().token).subscribe(
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
          this.applyFilter(this.textfilter);
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }

  openDialog(item): void {
    console.log(item);
    const dialogRef = this.dialog.open(ProyectoeditComponent, {
      width: '1050px',
      maxHeight: '650px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      this.get_tabla();

    });
  }

  openDialogConfig(item): void {
    const dialogRef = this.dialog.open(ProyectoconfigComponent, {
      width: '850px',
      maxHeight: '450px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  openDialogRegistro(item): void {
    this.ocultargrilla=false;
    this.hijo.cargardatos(item);
  }

  ocultar(){
    this.get_tabla();
    this.ocultargrilla=true;
  }

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Esta seguro que desea eliminar el proyecto " + item.c_nombreproyecto + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete_proyecto(item);
      }
    });
  }

  delete_proyecto(proyecto) {
    this._proyecto_service.delete_proyecto(proyecto, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.get_tabla();
            this.openSnackBar("Registro eliminado", 200);
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  fechar(item): void {

    const dialogRef = this.dialog.open(ProyectofechaComponent, {
      width: '300px',
      maxHeight: '650px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  acceso(item): void {
    const dialogRef = this.dialog.open(ProyectousuarioComponent, {
      width: '300px',
      maxHeight: '650px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  cartafianza(item): void {
    const dialogRef = this.dialog.open(CartafianzaComponent, {
      width: '1050px',
      maxHeight: '650px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  detalleproyecto(item): void {
    console.log("Detalle");
    console.log(item);
    const dialogRef = this.dialog.open(DetalleproyectoComponent, {
      width: '1050px',
      maxHeight: '650px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  

  situacion(item): void {
    const dialogRef = this.dialog.open(SituacionComponent, {
      width: '1000px',
      maxHeight: '650px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  programa(item): void {
    this.router.navigate(['/version/'+item.n_idgen_proyecto]);
  }

  lineatiempohistorico(item): void {
    this.router.navigate(['/lineatiempototal/'+item.n_idgen_proyecto+'/'+item.c_nombreproyecto]);
  }

  curvas(item): void {
    this.router.navigate(['/curvas/'+item.n_idgen_proyecto+'/'+item.c_nombreproyecto]);
  }

  guardar_orden(proyecto) {
    console.log("guardar orden")
    this._proyecto_service.save_orden(proyecto).subscribe(
      result => {
        try {
          if (result.estado) {
              this.get_tabla();
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

  descargarxls=()=>{
    this._excelformat_service.generargrilla(this.tablaUsuarios.data)
  }

  generaralldataproyecto_x_codmem(proyecto) {
    let req = {
      n_idgen_fase: this.n_idgen_fase,
      n_idgen_departamento: this.iddepartamento,
      n_idgen_provincia: this.idprovincia,
      n_idgen_distrito: this.iddistrito,
      n_idgen_centropoblado: this.idcentropoblado,
    }

    this._proyecto_service.get(req).subscribe(
      result => {
        if (result.estado) {
          const proyectos = result.data.filter(o => o.c_codigomem == proyecto.c_codigomem);
          console.log(proyectos);
          this._proyecto_service.get_exportalldata2(req).subscribe(
            result => {
              if (result.estado) {
                const datosadicionales = result.data.filter(o => o.c_codigomem == proyecto.c_codigomem);

                console.log(datosadicionales);
                this._excelformat_service.generaralldataproyecto2(proyectos, datosadicionales);
              } else {
                this.openSnackBar(result.mensaje, 99);
              }
            }, error => {
              try {
                this.openSnackBar(error.error.Detail, error.error.StatusCode);
              } catch (error) {
                this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
              }
            });
        } else {
          this.openSnackBar(result.mensaje, 99);
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

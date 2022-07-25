import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { confGeneralService } from 'src/app/service/confGeneral.service';
import { ExcelFormatService } from 'src/app/service/excelformat.service';
import { MapaService } from 'src/app/service/mapa.service';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { BaseComponent } from '../base/base.component';
import { FichaComponent } from '../ficha/ficha.component';

@Component({
  selector: 'app-datos-monitoreo',
  templateUrl: './datos-monitoreo.component.html',
  styleUrls: ['./datos-monitoreo.component.css'],
  providers: [SeguridadService, confGeneralService, MapaService]
})
export class DatosMonitoreoComponent extends BaseComponent implements OnInit {
  
  tablaconfig: MatTableDataSource<any>;
  displayedColumnsConfig: string[] = [ 'zona','linea','tipolinea','username','c_codigo','c_coordenadas','d_fechacrea', 'reporte'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  idTipoLinea: number = 0;
  idLinea: number = 0;
  idZona: number = 0;
  idUser: number = 0;
  fechaInicio = '';
  fechaFinal = '';
  tipolinea: [];
  zona: [];
  linea: [];
  users: [];
  fechaBool = true;
  constructor(
    public _seguridad_service: SeguridadService,
    public _confiGeneral_service: confGeneralService,
    public _mapa_service: MapaService,
    public _excel_service: ExcelFormatService,
    public dialog: MatDialog,
    public snack_1: MatSnackBar,
    public router: Router
  ) { 
    super(snack_1,router)
  }

  ngOnInit() {
    this.getLineas();
    this.gettipolinea();  
    this.getzona();      
    this.getTabla();
    this.getUsers();
  }

  selectLinea(n_idpl_linea){
    this.idLinea = n_idpl_linea;
    this.getUsers();
    this.getTabla();
  }
  selectTipolinea(n_idpl_tipolinea) {
    this.idTipoLinea = n_idpl_tipolinea;
    this.getzona();     
    this.getTabla();
  }

  selectZona(n_idpl_zona) {
    this.idZona = n_idpl_zona;
    this.getLineas();
    this.getTabla();
  }

  selectUser(n_idseg_userprofile){
    this.idUser = n_idseg_userprofile;
    this.getTabla();
  }

  getTabla(){
    let request = {
      n_idpl_linea: this.idLinea,
      n_idpl_tipolinea: this.idTipoLinea,
      n_idpl_zona: this.idZona,
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto,
      n_idseg_userprofile: this.idUser,
      fecha_inicio: this.fechaInicio,
      fecha_final: this.fechaFinal
      //stringBuscar: this.stringBuscar
    }
    console.log(request);
    
    this._mapa_service.getMonInspeccion(request,this.getToken().token).subscribe(
      result => {
        if(result.estado){
          console.log(result.data);
          this.tablaconfig = new MatTableDataSource<any>(result.data);
          this.tablaconfig.sort = this.sort;
          this.tablaconfig.paginator = this.paginator;
        }else{
 
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        this.openSnackBar(<any>error, 99);        
      });
  }

  gettipolinea() {
    let request = {
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto      
    }
    this._mapa_service.getTipoLineaMon(request,this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          this.tipolinea = resultado.data;
          console.log(this.tipolinea);
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

  getzona(){
    let request = {
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto,
      n_idpl_tipolinea: this.idTipoLinea,      
    }
    this._mapa_service.getZonaMon(request,this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          console.log(resultado.data);     
          this.zona = resultado.data;     
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

  getLineas(){
    let request = {
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto,
      n_idpl_tipolinea: this.idTipoLinea, 
      n_idpl_zona: this.idZona     
    }
    this._mapa_service.getLineasMon( request, this.getToken().token).subscribe(
      result => {
        if(result.estado){
          console.log(result.data);
          this.linea = result.data;
        }else{
 
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        this.openSnackBar(<any>error, 99);        
      });
  }

  getUsers(){
    let request = {
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto,
      n_idpl_tipolinea: this.idTipoLinea, 
      n_idpl_zona: this.idZona,
      n_idpl_linea: this.idLinea     
    }
    this._mapa_service.getUsers( request, this.getToken().token).subscribe(
      result => {
        if(result.estado){
          console.log(result.data);
          this.users = result.data;
        }else{
 
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        this.openSnackBar(<any>error, 99);        
      });
  
  }

  inicio(event){
    console.log(event);    
    let dia = event.value.getDate()
    let mes = (event.value.getMonth()+1)
    let anio = event.value.getFullYear()
    if (mes < 10) {
      mes = '0'+mes;
    }
    if (dia < 10) {
      dia = '0'+dia;
    }
    this.fechaInicio = anio + '-' + mes + '-' + dia + ' 00:00:00.000'
    this.fechaBool = false
    console.log(this.fechaInicio);
    
  }
  fin(event){
    console.log(event);    
    let dia = event.value.getDate().toString()
    let mes = (event.value.getMonth()+1).toString()
    let anio = event.value.getFullYear().toString()
    if (mes < 10) {
      mes = '0'+mes;
    }
    if (dia < 10) {
      dia = '0'+dia;
    }
    this.fechaFinal = anio + '-' + mes + '-' + dia + ' 23:59:59.000'
    this.getTabla();
  }

  exportar(element){
    const dialogRef = this.dialog.open(FichaComponent, {
      width: '250px',
      data: { n_idmon_inspeccion: element.n_idmon_inspeccion }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {       
      } catch (error) {
        console.log(error);
      }
    });
  }

  exportarTodo = () =>{
    let rq = {
      n_idpl_linea : this.idLinea,
      n_idpl_tipolinea: this.idTipoLinea,
      n_idpl_zona: this.idZona,
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto,
      n_idseg_userprofile: this.idUser,
    }

    console.log("Exportar Todo rq", rq)

      this._mapa_service.getinspeccionxls(this.getToken,rq ).subscribe(result => {
        console.log("Exportar Todo result", result)
        if(result.estado){
         this._excel_service.generarInspeccionXls(result.data);
        }
      })
  }

}

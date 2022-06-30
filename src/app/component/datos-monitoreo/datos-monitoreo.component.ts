import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { confGeneralService } from 'src/app/service/confGeneral.service';
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
  displayedColumnsConfig: string[] = [ 'c_codigo','c_coordenadas','zona','linea','tipolinea','username','d_fechacrea', 'reporte'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  idTipoLinea: number = 0;
  idLinea: number = 0;
  idZona: number = 0;

  tipolinea: [];
  zona: [];
  linea: [];

  constructor(
    public _seguridad_service: SeguridadService,
    public _confiGeneral_service: confGeneralService,
    public _mapa_service: MapaService,
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
  }

  selectLinea(n_idpl_linea){
    this.idLinea = n_idpl_linea;
    this.getTabla();
  }
  selectTipolinea(n_idpl_tipolinea) {
    this.idTipoLinea = n_idpl_tipolinea;
    this.getTabla();
  }

  selectZona(n_idpl_zona) {
    this.idZona = n_idpl_zona;
    this.getTabla();
  }
  getTabla(){
    let request = {
      n_idpl_linea: this.idLinea,
      n_idpl_tipolinea: this.idTipoLinea,
      n_idpl_zona: this.idZona,
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto,
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
  getLineas(){
    
    this._mapa_service.getLineasMon(this.getToken().token).subscribe(
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

  getzona(){
    let request = {
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto      
    }
    this._confiGeneral_service.getZonas(request,this.getToken().token).subscribe(
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

  gettipolinea() {
    let request = {
      n_idpl_tipolinea: 0,
    }
    this._confiGeneral_service.gettipolinea(request,this.getToken().token).subscribe(
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
}

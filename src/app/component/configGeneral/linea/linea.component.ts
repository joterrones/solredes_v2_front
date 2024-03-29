import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings'
import { Router } from "@angular/router";
import { BaseComponent } from '../../base/base.component';
import { ResultadoApi } from '../../../interface/common.interface';
import { Confirmar } from '../../../interface/confirmar.interface';
import { confGeneralService } from '../../../service/confGeneral.service';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { LineaeditarComponent } from '../lineaeditar/lineaeditar.component';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { ImportacionPlanillaDescargarComponent } from '../../importacion-planilla-descargar/importacion-planilla-descargar.component';


@Component({
  selector: 'app-linea',
  templateUrl: './linea.component.html',
  styleUrls: ['./linea.component.css'],
  providers: [confGeneralService, SeguridadService]
})
export class LineaComponent extends BaseComponent implements OnInit {
  tit: String = "SEGURIDAD > GESTOR DE LINEAS";

  pantallaRol= [];
  permisoEdit: boolean = false;

  //public usuario: any;
  tipolinea: [];
  zona: [];
  idtipolinea = 0;  
  idzona = 0;
  textfilter = '';

  estadoLinea = [
    {id: 1, nombre: 'Validado'},
    {id: 2, nombre: 'No Validado'}
  ]; 

  estadoSelectb_expediente: boolean = null; 
  estadoSelectb_replanteo: boolean = null; 
  estadoSelectb_montaje: boolean = null; 
  estadoSelectb_cierre: boolean = null; 

  displayedColumns: string[] = ['editar', 'c_nombre', 'c_codigo', 'tipolinea', 'zona','Metrado','MetradoMon','mapa','exportar','expediente','replanteo','montaje','cierre','eliminar'];
  public tablaLineas: MatTableDataSource<any>;
  public confirmar: Confirmar;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _confiGeneral_service: confGeneralService,    
    public _seguridad_service: SeguridadService,
    public dialog: MatDialog
  ) {
    super(snackBar, router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    this.getPantallaRol();
    this.getzona();
    this.gettipolinea();    
    this.getTablaLinea();
    
    /*this.usuario = this.getToken().data;
    console.log('Usuario Menu');
    console.log(this.usuario);*/
  }

  selectTipolinea(n_idpl_tipolinea) {
    this.idtipolinea = n_idpl_tipolinea;
    this.getTablaLinea();
  }

  selectZona(n_idpl_zona) {
    this.idzona = n_idpl_zona;
    this.getTablaLinea();
  }

  selectEstado(colum, id){
    if(colum == 1){      
      if(id == 1){        
        this.estadoSelectb_expediente = true;
        this.getTablaLinea();
      }else if(id == 2){
        this.estadoSelectb_expediente = false;
        this.getTablaLinea();
      }else if(id == 0){
        this.estadoSelectb_expediente = null;
        this.getTablaLinea();
      }

    }else if(colum == 2){      
      if(id == 1){        
        this.estadoSelectb_replanteo = true;
        this.getTablaLinea();
      }else if(id == 2){
        this.estadoSelectb_replanteo = false;
        this.getTablaLinea();
      }else if(id == 0){
        this.estadoSelectb_replanteo = null;
        this.getTablaLinea();
      }
    }else if(colum == 3){      
      if(id == 1){        
        this.estadoSelectb_montaje = true;
        this.getTablaLinea();
      }else if( id == 2){
        this.estadoSelectb_montaje = false;
        this.getTablaLinea();
      }else if(id == 0){
        this.estadoSelectb_montaje = null;
        this.getTablaLinea();
      }
    }else if(colum == 4){      
      if(id == 1){        
        this.estadoSelectb_cierre = true;
        this.getTablaLinea();
      }else if(id == 2){
        this.estadoSelectb_cierre = false;
        this.getTablaLinea();
      }
      else if(id == 0){
        this.estadoSelectb_cierre = null;
        this.getTablaLinea();
      }
    }
  }
  
  getTablaLinea() {    
    var request = {
      n_idpl_tipolinea: this.idtipolinea,     
      n_idpl_zona: this.idzona,
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto,
      estadoSelectb_expediente: this.estadoSelectb_expediente,
      estadoSelectb_replanteo: this.estadoSelectb_replanteo,
      estadoSelectb_montaje: this.estadoSelectb_montaje,
      estadoSelectb_cierre: this.estadoSelectb_cierre
    }
    console.log(request);
    
    this._confiGeneral_service.getLinea(request, this.getToken().token).subscribe(
      result => {

        try {
          if (result.estado) {
            console.log(result.data);
            this.tablaLineas = new MatTableDataSource<any>(result.data);
            this.tablaLineas.sort = this.sort;
            this.tablaLineas.paginator = this.paginator;
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

  gettipolinea() {
    let request = {
      n_idpl_tipolinea: this.idtipolinea,
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
          console.log(this.zona);
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
  
  applyFilter(filterValue: String) {
    this.tablaLineas.filter = filterValue.trim().toLowerCase();
  }

  openDialog(linea): void {
    const dialogRef = this.dialog.open(LineaeditarComponent, {
      width: '750px',
      data: { linea: linea, tipolinea: this.tipolinea, zona: this.zona}
    });
    dialogRef.afterClosed().subscribe(result => {
      try {        
        this.getTablaLinea();

      } catch (error) {
        console.log(error);
        this.getTablaLinea();
      }
    });
  }  

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar la Linea " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.delete_linea(item);
      }
    });
  }

  delete_linea(item) {
    let request = {
      n_idpl_linea: item.n_idpl_linea,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    console.log(request);
    
    this._confiGeneral_service.deleteLinea(request).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaLinea();
            this.openSnackBar("Linea eliminada", 200);
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

  showMetrado(element): void {      
    this.router.navigate(["/metrado/"+element.n_idpl_linea+"/"+element.n_idpl_tipolinea]);
  }  

  showMetradoMon(element): void {      
    this.router.navigate(["/metradomon/"+element.n_idpl_linea+"/"+element.n_idpl_tipolinea]);
  }  

  showMapa(element): void {      
    this.router.navigate(["/mapalinea/"+element.n_idpl_linea+"/"+element.c_nombre+"/"+element.c_nombrez+"/"+element.c_nombret]);
  }  

  estado(element,estado, id): void {
    let request = {
      n_idpl_linea: element.n_idpl_linea,
      estado : estado,
      id: id,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    console.log(request);
    
    this._confiGeneral_service.estadoLinea(request, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            
            this.openSnackBar("Estado Actualizado", 99);
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

  exportarDatos(linea): void {

    const dialogRef = this.dialog.open(ImportacionPlanillaDescargarComponent, {
      width: '750px',
      data: { linea: linea }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {       
      } catch (error) {
        console.log(error);
      }
    });

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
            if(element.c_codigo === 'ma-adlin'){
              console.log(element);
              console.log(element.c_codigo);
              if(element.c_permiso === 'MO'){
                this.permisoEdit = true;              
              }
              console.log(this.permisoEdit);
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


}

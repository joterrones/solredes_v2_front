import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSnackBar, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { confGeneralService } from 'src/app/service/confGeneral.service';
import { ExcelFormatService } from 'src/app/service/excelformat.service';
import { MapaService } from 'src/app/service/mapa.service';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { BaseComponent } from '../base/base.component';
import { DatosMonitoreoEditarComponent } from '../datos-monitoreo-editar/datos-monitoreo-editar.component';
import { FichaComponent } from '../ficha/ficha.component';
import { ConfirmComponent } from '../general/confirm/confirm.component';

@Component({
  selector: 'app-datos-monitoreo-popup',
  templateUrl: './datos-monitoreo-popup.component.html',
  styleUrls: ['./datos-monitoreo-popup.component.css'],
  providers: [SeguridadService, confGeneralService, MapaService]
})
export class DatosMonitoreoPopupComponent extends BaseComponent implements OnInit {

  tablaconfig: MatTableDataSource<any>;
  displayedColumnsConfig: string[] = [ 'zona','linea','tipolinea','username','c_codigo','c_coordenadas','d_fechacrea', 'reporte'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  
  idTipoLinea: number = 0;
  idLinea: number = 0;
  idZona: number = 0;
  idUser: number = 0;

  tipolinea: [];
  zona: [];
  linea: [];
  users: [];


  constructor(
    public _seguridad_service: SeguridadService,
    public _confiGeneral_service: confGeneralService,
    public _mapa_service: MapaService,
    public _excel_service: ExcelFormatService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public snack_1: MatSnackBar,
    public router: Router
  ) 
  {
    super(snack_1,router);
   }

  ngOnInit() {
    this.getTabla();
  }

  getTabla(){
    let request = {
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto,
      n_idg_notificacion: this.data.n_idg_notificacion
    }
    console.log(request);
    
    this._confiGeneral_service.getMonInspeccionPopup(request,this.getToken().token).subscribe(
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
      n_idg_notificacion: this.data.n_idg_notificacion
    }
    console.log("Exportar Todo rq", rq)
      this._confiGeneral_service.getinspeccionxlspopup(this.getToken,rq ).subscribe(result => {
        console.log("Exportar Todo result", result)
        if(result.estado){
         this._excel_service.generarInspeccionXls(result.data);
        }
      })
  }

}

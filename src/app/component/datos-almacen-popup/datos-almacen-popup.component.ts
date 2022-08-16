import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { AlmacenService } from 'src/app/service/almacen.service';
import { confGeneralService } from 'src/app/service/confGeneral.service';
import { MapaService } from 'src/app/service/mapa.service';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-datos-almacen-popup',
  templateUrl: './datos-almacen-popup.component.html',
  styleUrls: ['./datos-almacen-popup.component.css'],
  providers: [SeguridadService, confGeneralService, MapaService, AlmacenService]
})
export class DatosAlmacenPopupComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['c_nombre', 'c_direccion','periodo','c_ruc','c_nroguia', 'c_observacion','detalle'];
  public tablaGuia: MatTableDataSource<any>;
  
  displayedColumns2: string[] = ['c_cantidad','c_nombreel'];
  public tablaAlmacen: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  showGuia = false;

  constructor(
    public _seguridad_service: SeguridadService,
    public _confiGeneral_service: confGeneralService,
    public _mapa_service: MapaService,
    public _almacen_service: AlmacenService,   
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public snack_1: MatSnackBar,
    public router: Router
  ) 
  {
    super(snack_1,router);
  }

  ngOnInit() {
    this.getTablaGuia()
  }

  getTablaGuia() {
    let request = {
      n_idg_notificacion: this.data.n_idg_notificacion    
    }
    console.log(request);
    
    this._confiGeneral_service.getAlmacenPopup(request,this.getToken().token).subscribe(
      result => {
      try {
        if (result.estado) {    
          console.log(result.data);                  
          this.tablaGuia = new MatTableDataSource<any>(result.data);
          this.tablaGuia.sort = this.sort;
          this.tablaGuia.paginator = this.paginator;          
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

  showGuiaDetalle(element){
    console.log(element);
    
    this.showGuia = true;
    let request = {
      n_idalm_guia: element.n_idalm_guia
    }
    
    this._almacen_service.getDetalleGuia(request,this.getToken().token).subscribe(
      result => {

        try {
          if (result.estado) {
            console.log(result.data);
            this.tablaAlmacen = new MatTableDataSource<any>(result.data);
            this.tablaAlmacen.sort = this.sort;
            this.tablaAlmacen.paginator = this.paginator;
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

  back(){
    this.showGuia = false;
    this.getTablaGuia()
  }

}

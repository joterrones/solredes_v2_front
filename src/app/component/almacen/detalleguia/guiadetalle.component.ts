import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings'
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from '../../base/base.component';
import { ResultadoApi } from '../../../interface/common.interface';
import { Confirmar } from '../../../interface/confirmar.interface';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { AlmacenService } from 'src/app/service/almacen.service';
import { GuiadetalleeditarComponent } from '../detalleguiaeditar/guiadetalleeditar.component';

@Component({
  selector: 'app-guiadetalle',
  templateUrl: './guiadetalle.component.html',
  styleUrls: ['./guiadetalle.component.css'],
  providers: [AlmacenService]
})
export class GuiadetalleComponent extends BaseComponent implements OnInit {

  tit: String = "SEGURIDAD > GESTOR DE DETALLE GUIA";
  file: File;
  n_idalm_guia = "";
  c_nombreguia = "";
  c_nombreAlmacen="";
  n_idalm_almacen="";

  iddetalleguia=0;

  idguias = 0;  
  elemento:[];
  idelementos = 0;
  
  textfilter = '';

  displayedColumns: string[] = ['editar', 'c_nombreel','c_cantidad','eliminar'];
  public tablaAlmacen: MatTableDataSource<any>;
  public confirmar: Confirmar;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _almacen_service: AlmacenService, 
    private _Activatedroute: ActivatedRoute,    
    public dialog: MatDialog
  ) {
    super(snackBar, router);
  }

  ngOnInit() {   
    this.n_idalm_guia = this._Activatedroute.snapshot.paramMap.get("n_idalm_guia");
    this.c_nombreguia = this._Activatedroute.snapshot.paramMap.get("c_nombre");
    this.c_nombreAlmacen = this._Activatedroute.snapshot.paramMap.get("c_nombreAlmacen");
    this.n_idalm_almacen = this._Activatedroute.snapshot.paramMap.get("n_idalm_almacen");   
    this.getElementos();  
    this.getTablaDetalleGuia();
  }  

  getTablaDetalleGuia() {
    let request = {
      n_idalm_guia: this.n_idalm_guia
    }
    
    this._almacen_service.getDetalleGuia(request,this.getToken().token).subscribe(
      result => {

        try {
          if (result.estado) {
            console.log(result);
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
          this.applyFilter(this.textfilter);
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }


  getElementos() {
    let request = {
      n_idpl_elemento: this.elemento      
    }
    this._almacen_service.getElementos(request,this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          this.elemento = resultado.data; 
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
    this.tablaAlmacen.filter = filterValue.trim().toLowerCase();
  }

  openDialog(detalleguia): void {    
    const dialogRef = this.dialog.open(GuiadetalleeditarComponent, {
      width: '750px',
      data: { detalleguia: detalleguia, elemento: this.elemento, n_idalm_guia: this.n_idalm_guia }    
      
    });
    dialogRef.afterClosed().subscribe(result => {
      try {        
        this.getTablaDetalleGuia();

      } catch (error) {
        console.log(error);
        this.getTablaDetalleGuia();
      }
    });
  }  

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el Detalle Guia " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteDetalleGuia(item);
      }
    });
  }

  deleteDetalleGuia(item) {
    this._almacen_service.deleteDetalleGuia(item).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaDetalleGuia();
            this.openSnackBar("Detalle Guia eliminada", 200);
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


}

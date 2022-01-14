import { Component, OnInit,ViewChild } from '@angular/core';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings'
import { Router } from "@angular/router";
import { BaseComponent } from '../../base/base.component';
import { Confirmar } from '../../../interface/confirmar.interface';
import { confGeneralService } from '../../../service/confGeneral.service';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { TipoelementoeditarComponent } from '../tipoelementoeditar/tipoelementoeditar.component';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { ResultadoApi } from 'src/app/interface/common.interface';

@Component({
  selector: 'app-tipoelemento',
  templateUrl: './tipoelemento.component.html',
  styleUrls: ['./tipoelemento.component.css'],
  providers: [confGeneralService, SeguridadService]
})
export class TipoelementoComponent extends BaseComponent implements OnInit {

  tit: String = "ADMINISTRACIÓN DE TIPO ELEMENTO";

  pantallaRol= [];
  permisoEdit: boolean = false;

  textfilter = '';

  displayedColumns: string[] = ['editar','c_nombre', 'c_codigo', 'eliminar'];
  public tabla: MatTableDataSource<any>;
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
    this.getTablaTipoElemento();
  }  
  
  getTablaTipoElemento() {  
    this._confiGeneral_service.getTipoElemento(this.getToken().token).subscribe(
      result => {      
        console.log('retorna del node a tablatipoElemento')  
        console.log(result);
        this.tabla = new MatTableDataSource<any>(result.data);
        this.tabla.sort = this.sort;
        this.tabla.paginator = this.paginator;

      }, error => {
        this.openSnackBar(error.error, 99);
      });
  } 

  applyFilter(filterValue: String) {
    this.tabla.filter = filterValue.trim().toLowerCase();
  }

  openDialog(tipoelemento): void {
    console.log(tipoelemento)
    const dialogRef = this.dialog.open(TipoelementoeditarComponent, {
      width: '750px',
      data: {tipoelemento }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {
        this.getTablaTipoElemento();

      } catch (error) {
        console.log(error);
        this.getTablaTipoElemento();
      }
    });
  }

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el Tipo Elemento " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteTipoElemento(item);
      }
    });
  }

  deleteTipoElemento(elemento) {
    let request = {
      n_idpl_tipoelemento: elemento.n_idpl_tipoelemento,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    this._confiGeneral_service.deleteTipoElemento(request).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaTipoElemento();
            this.openSnackBar("Tipo Elemento Eliminado", 200);
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
            if(element.c_codigo === 'ma-adtel'){
              console.log(element);
              console.log(element.c_codigo);
              if(element.c_permiso === 'MO'){
                this.permisoEdit = true;
              }
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

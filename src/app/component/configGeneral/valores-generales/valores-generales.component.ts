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
import { ValoresGeneralesEditarComponent } from '../valores-generales-editar/valores-generales-editar.component';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { ResultadoApi } from 'src/app/interface/common.interface';

@Component({
  selector: 'app-valores-generales',
  templateUrl: './valores-generales.component.html',
  styleUrls: ['./valores-generales.component.css'],
  providers: [confGeneralService,SeguridadService]
})
export class ValoresGeneralesComponent extends BaseComponent implements OnInit {
  pantallaRol= [];
  permisoEdit: boolean = false;

  idtipolinea = 0;
  textfilter = '';  

  displayedColumns: string[] = ['editar', 'c_codigo','c_nombre', 'eliminar'];
  public tablaValoresGnr: MatTableDataSource<any>;
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
    this.getTablaValoresGenerales();
  }  
  
  getTablaValoresGenerales() {  
  
    this._confiGeneral_service.getValoresGnr(this.getToken().token).subscribe(
      result => {                
        console.log(result);
        this.tablaValoresGnr = new MatTableDataSource<any>(result.data);
        this.tablaValoresGnr.sort = this.sort;
        this.tablaValoresGnr.paginator = this.paginator;

      }, error => {
        this.openSnackBar(error.error, 99);
      });
  } 

  applyFilter(filterValue: String) {
    this.tablaValoresGnr.filter = filterValue.trim().toLowerCase();
  }

  openDialog(valoresGnr): void {
    const dialogRef = this.dialog.open(ValoresGeneralesEditarComponent, {
      width: '750px',
      data: { valoresGnr }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {
        this.getTablaValoresGenerales();

      } catch (error) {
        console.log(error);
        this.getTablaValoresGenerales();
      }
    });
  }

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el Valor General " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteValorGnr(item);
      }
    });
  }

  deleteValorGnr(item) {
    let request = {
      n_idgen_valoresgenerales: item.n_idgen_valoresgenerales,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    this._confiGeneral_service.deleteValorGnr(request).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaValoresGenerales();
            this.openSnackBar("Valor General Eliminado", 200);
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
            if(element.c_codigo === 'ma-advag'){
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

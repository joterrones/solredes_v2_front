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
import { TipoempresaeditarComponent } from '../tipoempresaeditar/tipoempresaeditar.component';

@Component({
  selector: 'app-tipoempresa',
  templateUrl: './tipoempresa.component.html',
  styleUrls: ['./tipoempresa.component.css'],
  providers: [confGeneralService]
})
export class TipoempresaComponent extends BaseComponent implements OnInit {

  tit: String = "SEGURIDAD > GESTOR DE TIPOS DE EMPRESA";
  
  idtipoempresa = 0;
  textfilter = '';  

  displayedColumns: string[] = ['editar','c_nombre', 'eliminar'];
  public tablaTipoEmpresa: MatTableDataSource<any>;
  public confirmar: Confirmar;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _confiGeneral_service: confGeneralService,
    public dialog: MatDialog
  ) { 
    super(snackBar, router);
  }

  ngOnInit() {       
    this.getTablaTipoEmpresa();
  }  
  
  getTablaTipoEmpresa() {      
    this._confiGeneral_service.getTipoEmpresa(this.getToken().token).subscribe(
      result => {                
        console.log(result);
        this.tablaTipoEmpresa = new MatTableDataSource<any>(result.data);
        console.log(result.data);        
        this.tablaTipoEmpresa.sort = this.sort;
        this.tablaTipoEmpresa.paginator = this.paginator;

      }, error => {
        this.openSnackBar(error.error, 99);
      });
  } 

  applyFilter(filterValue: String) {
    this.tablaTipoEmpresa.filter = filterValue.trim().toLowerCase();
  }

  openDialog(tipoempresa): void {
    
    const dialogRef = this.dialog.open(TipoempresaeditarComponent, {
      width: '750px',
      data: { tipoempresa }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {
        this.getTablaTipoEmpresa();

      } catch (error) {
        console.log(error);
        this.getTablaTipoEmpresa();
      }
    });
  }
  
  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el Tipo Empresa" + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteTipoEmpresa(item);
      }
    });
  }

  deleteTipoEmpresa(item) {
    this._confiGeneral_service.deleteTipoEmpresa(item).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaTipoEmpresa();
            this.openSnackBar("Tipo Empresa Eliminado", 200);
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

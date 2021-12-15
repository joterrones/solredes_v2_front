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
import { TipolineaeditarComponent } from '../tipolineaeditar/tipolineaeditar.component';


@Component({
  selector: 'app-tipolinea',
  templateUrl: './tipolinea.component.html',
  styleUrls: ['./tipolinea.component.css'],
  providers: [confGeneralService]
})
export class TipolineaComponent extends BaseComponent implements OnInit {
  tit: String = "SEGURIDAD > GESTOR DE TIPOS DE LINEA";
  
  idtipolinea = 0;
  textfilter = '';  

  displayedColumns: string[] = ['editar','c_nombret', 'eliminar'];
  public tablaTipoLinea: MatTableDataSource<any>;
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
    this.getTablaTipolinea();
  }  
  
  getTablaTipolinea() {  
    let request = {
      n_idpl_tipolinea: this.idtipolinea      
    }
    this._confiGeneral_service.gettipolinea(request,this.getToken().token).subscribe(
      result => {                
        console.log(result);
        this.tablaTipoLinea = new MatTableDataSource<any>(result.data);
        this.tablaTipoLinea.sort = this.sort;
        this.tablaTipoLinea.paginator = this.paginator;

      }, error => {
        this.openSnackBar(error.error, 99);
      });
  } 

  applyFilter(filterValue: String) {
    this.tablaTipoLinea.filter = filterValue.trim().toLowerCase();
  }

  openDialog(tipolinea): void {
    const dialogRef = this.dialog.open(TipolineaeditarComponent, {
      width: '750px',
      data: { tipolinea }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {
        this.getTablaTipolinea();

      } catch (error) {
        console.log(error);
        this.getTablaTipolinea();
      }
    });
  }

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el Tipo de Linea " + item.c_nombret + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.delete_proyecto(item);
      }
    });
  }

  delete_proyecto(item) {
    this._confiGeneral_service.deleteTipoLinea(item).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaTipolinea();
            this.openSnackBar("Tipo Linea Eliminado", 200);
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

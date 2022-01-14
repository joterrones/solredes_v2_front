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
import { TipofotoeditarComponent } from '../tipofotoeditar/tipofotoeditar.component';

@Component({
  selector: 'app-tipofoto',
  templateUrl: './tipofoto.component.html',
  styleUrls: ['./tipofoto.component.css'],
  providers: [confGeneralService]
})
export class TipofotoComponent extends BaseComponent implements OnInit {

  tit: String = "SEGURIDAD > GESTOR DE EMPRESAS";

  textfilter = '';

  displayedColumns: string[] = ['editar','c_nombre', 'c_codigo', 'n_tipo', 'eliminar'];
  public tablaTipoFoto: MatTableDataSource<any>;
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
    this.usuarioLog = this.getUser().data;
    this.getTablaTipoFoto();
  }  
  
  getTablaTipoFoto() {  
    this._confiGeneral_service.getTipoFoto(this.getToken().token).subscribe(
      result => {      
        console.log('retorna del node a tablatipoFoto')  
        console.log(result);
        this.tablaTipoFoto = new MatTableDataSource<any>(result.data);
        this.tablaTipoFoto.sort = this.sort;
        this.tablaTipoFoto.paginator = this.paginator;

      }, error => {
        this.openSnackBar(error.error, 99);
      });
  } 

  applyFilter(filterValue: String) {
    this.tablaTipoFoto.filter = filterValue.trim().toLowerCase();
  }

  openDialog(tipofoto): void {
    console.log(tipofoto)
    const dialogRef = this.dialog.open(TipofotoeditarComponent, {
      width: '750px',
      data: { tipofoto }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {
        this.getTablaTipoFoto();

      } catch (error) {
        console.log(error);
        this.getTablaTipoFoto();
      }
    });
  }

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el Tipo Foto " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteTipoFoto(item);
      }
    });
  }

  deleteTipoFoto(proyecto) {
    let request = {
      n_idgen_tipofoto: proyecto.n_idgen_tipofoto,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    this._confiGeneral_service.deleteTipoFoto(request).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaTipoFoto();
            this.openSnackBar("Tipo Foto Eliminado", 200);
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

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSnackBar, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { Confirmar } from 'src/app/interface/confirmar.interface';
import { confGeneralService } from 'src/app/service/confGeneral.service';
import { ImportacionService } from 'src/app/service/importacion.service';
import { BaseComponent } from '../base/base.component';
import { ConfirmComponent } from '../general/confirm/confirm.component';

@Component({
  selector: 'app-importacion-planilla-eliminar',
  templateUrl: './importacion-planilla-eliminar.component.html',
  styleUrls: ['./importacion-planilla-eliminar.component.css'],
  providers: [confGeneralService,ImportacionService]
})
export class ImportacionPlanillaEliminarComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['c_nombre', 'c_codigo', 'tipolinea', 'zona','eliminar'];
  public tablaLineas: MatTableDataSource<any>;
  public confirmar: Confirmar;
  textfilter = '';

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ImportacionPlanillaEliminarComponent>,    
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _importacion_service: ImportacionService,
    public _confiGeneral_service: confGeneralService,    
    public _router: Router,
    public snackBar: MatSnackBar) {
      super(snackBar, _router);
  }

  ngOnInit() {  
    this.usuarioLog = this.getUser().data;
    this.getTablaLinea();
  }

  getTablaLinea() {
    let request = {
      n_idpl_tipolinea: 0,     
      n_idpl_zona: 0
    }
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

  applyFilter(filterValue: String) {
    this.tablaLineas.filter = filterValue.trim().toLowerCase();
  }

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿ Seguro que desea eliminar las estructuras de la linea: " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.delete_linea(item);
      }
    });
  }

  delete_linea(item) {
    let request = { 
      idversion: this.data.idversion,
      n_idpl_linea: item.n_idpl_linea,      
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    console.log(request);
    
    this._importacion_service.deleteEstructLinea(request).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaLinea();
            this.openSnackBar("Se elimino correctamente", 200);
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

  eliminarAll(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿ Seguro que desea eliminar todas las estructuras ?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteEstructuras(item);
      }
    });
  }  

  deleteEstructuras(item){
    let request = {
      idversion: this.data.idversion,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    this._importacion_service.deleteAllEstructLinea(request).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaLinea();
            this.openSnackBar("Se elimino correctamente", 200);
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

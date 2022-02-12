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
import { GuiaeditarComponent } from '../guiaeditar/guiaeditar.component';

@Component({
  selector: 'app-guia',
  templateUrl: './guia.component.html',
  styleUrls: ['./guia.component.css'],
  providers: [AlmacenService]
})
export class GuiaComponent extends BaseComponent implements OnInit {

  tit: String = "SEGURIDAD > GESTOR DE GUIA";

  n_idalm_almacen="";
  c_nombreAlmacen="";

  
  idalmacen = 0;  
  periodos: any;
  _selectPeriodos: any;
  idperiodo = 0;
  
  textfilter = '';

  displayedColumns: string[] = ['editar', 'c_nombre', 'c_direccion','periodo','c_ruc','c_nroguia', 'c_observacion','detalle','eliminar'];
  public tablaGuia: MatTableDataSource<any>;
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
    this.usuarioLog = this.getUser().data;
    this.n_idalm_almacen = this._Activatedroute.snapshot.paramMap.get("n_idalm_almacen");
    this.c_nombreAlmacen = this._Activatedroute.snapshot.paramMap.get("c_nombre");
    console.log("idalmacen"+this.n_idalm_almacen)
        
    this.getPeriodos();  
    this.getTablaGuia();
  }  

    
  selectPeriodos(n_idgen_periodo) {
    this.idperiodo = n_idgen_periodo;
    this.getTablaGuia();
  }

  getTablaGuia() {
    let request = {
      n_idalm_almacen: this.n_idalm_almacen,    
      n_idgen_periodo: this.idperiodo  
    }
    console.log(request);
    
    this._almacen_service.getGuia(request,this.getToken().token).subscribe(
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
          this.applyFilter(this.textfilter);
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }

  

  getPeriodos() {
    let request = {
      n_idgen_periodo: 0
    }
    this._almacen_service.getPeriodos(request,this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          console.log(resultado.data);
          this._selectPeriodos = resultado.data.periodos;
          this.periodos = resultado.data;
                
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
    this.tablaGuia.filter = filterValue.trim().toLowerCase();
  }

  openDialog(guia): void {    
    
    const dialogRef = this.dialog.open(GuiaeditarComponent, {
      width: '750px',
      data: { guia: guia,  periodos: this.periodos, n_idalm_almacen: this.n_idalm_almacen}    
      
    });
    dialogRef.afterClosed().subscribe(result => {
      try {        
        this.getTablaGuia();

      } catch (error) {
        console.log(error);
        this.getTablaGuia();
      }
    });
  }  

  showGuiaDetalle(element): void {
    this.router.navigate(["/guiadetalle/"+element.n_idalm_guia+"/"+element.c_nombre+"/"+this.c_nombreAlmacen+"/"+this.n_idalm_almacen]);
  }  

  eliminar(item): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar la Guia " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteGuia(item);
      }
    });
  }

  deleteGuia(item) {
    let request = {
      n_idalm_guia: item.n_idalm_guia,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    this._almacen_service.deleteGuia(request).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaGuia();
            this.openSnackBar("Guia eliminada", 200);
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

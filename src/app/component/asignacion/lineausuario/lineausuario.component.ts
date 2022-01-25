import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { confGeneralService } from '../../../service/confGeneral.service';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { TraGrupos } from 'src/app/interface/configGeneral.interface';

@Component({
  selector: 'app-lineausuario',
  templateUrl: './lineausuario.component.html',
  styleUrls: ['./lineausuario.component.css'],
  providers: [confGeneralService]
})
export class LineausuarioComponent extends BaseComponent implements OnInit {
  textfilter = '';
  zonas = [];
  tipolinea = [];
  idtipolinea = 0;
  idzona= 0;
  lineaUser: [];

  displayedColumns: string[] = ['c_nombre','select'];
  public tablalineaUser: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  
  constructor(
    public dialogAsigPro: MatDialogRef<LineausuarioComponent>,
    private _confiGeneral_service: confGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: TraGrupos,
    public _router: Router,
    public snackBar: MatSnackBar
    ){
    super(snackBar, _router);
    }

  ngOnInit() {
    this.getLineaUser();
    this.getTablaTipolinea();
    this.getTablaZona();
  }

  selectTipoLinea(element) {
    this.idtipolinea = element;
    this.getLineaUser();
  }

  selectZona(element) {
    this.idzona = element;
    this.getLineaUser();
  }

  getLineaUser(){    
    let request = {
      n_idtra_grupo: this.data.n_idtra_grupo,
      n_idpl_zona: this.idzona,
      n_idpl_tipolinea: this.idtipolinea
    }
    console.log(request);
    this._confiGeneral_service.getLineaUser(request,this.getToken().token).subscribe(
      result => { 
        try {
          if (result.estado) {
            console.log("ProUser",result.data);
            this.lineaUser = result.data;
            this.tablalineaUser = new MatTableDataSource<any>(result.data);
            this.tablalineaUser.sort = this.sort;
            this.tablalineaUser.paginator = this.paginator;
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

  getTablaTipolinea() {  
    let request = {
      n_idpl_tipolinea: this.idtipolinea      
    }
    this._confiGeneral_service.gettipolinea(request,this.getToken().token).subscribe(
      result => {                
        console.log(result.data);
        this.tipolinea = result.data;
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  } 

  getTablaZona() {
    let request = {
      n_idpl_zona: this.idzona,      
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto,     
    }    
    this._confiGeneral_service.getZona(request, this.getToken().token).subscribe(
      result => {        
        if (result.estado) {
          console.log(result.data);
          this.zonas = result.data;
        } else {
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }

  resetLineaUser(){
    let request = {
      n_idtra_grupo: this.data.n_idtra_grupo
    }
    console.log(this.data.n_idtra_grupo);
    
    this._confiGeneral_service.resetLineaUser(request,this.getToken().token).subscribe(
      result => {
        if (result.estado) {
          this.dialogAsigPro.close({ flag: true });
        } else {
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  
  guardar(newForm) {
    if(this.lineaUser.length){
      this.resetLineaUser();
    }
    console.log(newForm);
    console.log(this.data.n_idtra_grupo);
    console.log(this.lineaUser.length);
    
    for(let i = 0; i < newForm.length; i++ ){
      let request  ={ 
        n_idtra_grupo: this.data.n_idtra_grupo,
        n_idpl_linea: newForm[i]
      }
      console.log("Envio datos lineaUser",request);
      
      this._confiGeneral_service.saveLineaUser(request, this.getToken().token).subscribe(
        result => {
          try {
            if (result.estado) {
              this.dialogAsigPro.close({ flag: true });
            } else {
              this.openSnackBar(result.mensaje, 99);
            }
          } catch (error) {
            this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
          }
        }, error => {
          console.error(error);
          try {
            this.openSnackBar(error.error.Detail, error.error.StatusCode);
          } catch (error) {
            this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
          }
        });

    }
    
  }
  applyFilter(filterValue: String) {
    this.tablalineaUser.filter = filterValue.trim().toLowerCase();
  }

}

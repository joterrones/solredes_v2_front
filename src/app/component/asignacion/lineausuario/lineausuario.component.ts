import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';

import { confGeneralService } from '../../../service/confGeneral.service';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { TraGrupos } from 'src/app/interface/configGeneral.interface';
import { ConfirmComponent } from '../../general/confirm/confirm.component';

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
  lineaGrupo = [];
  selectAll = true;
  displayedColumns: string[] = ['c_nombre','select'];
  public tablalineaGrupo: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  
  constructor(
    public dialog: MatDialog,
    public dialogAsigLinea: MatDialogRef<LineausuarioComponent>,
    private _confiGeneral_service: confGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: TraGrupos,
    public _router: Router,
    public snackBar: MatSnackBar
    ){
    super(snackBar, _router);
    }

  ngOnInit() {
    this.selectAll = true;
    this.usuarioLog = this.getUser().data;
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
      n_idpl_tipolinea: this.idtipolinea,
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto
    }
    console.log(request);
    this._confiGeneral_service.getLineaUser(request,this.getToken().token).subscribe(
      result => { 
        try {
          if (result.estado) {
            console.log("ProUser",result.data);
            this.lineaGrupo = result.data;
            this.tablalineaGrupo = new MatTableDataSource<any>(result.data);
            this.tablalineaGrupo.sort = this.sort;
            this.tablalineaGrupo.paginator = this.paginator;
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

  noAsignarLineaUser(newForm){
    let request = {
      n_idtra_grupo: this.data.n_idtra_grupo,
      n_idpl_linea: [newForm.n_idpl_linealn],
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    console.log(this.data.n_idtra_grupo);
    
    this._confiGeneral_service.noAsignarLineaUser(request,this.getToken().token).subscribe(
      result => {
        if (result.estado) {
          //this.dialogAsigPro.close({ flag: true });
          //this.getLineaUser();
          this.openSnackBar("Acción completada", 99);
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
    console.log(newForm);
    console.log(newForm.n_borrado);
    console.log(this.data.n_idtra_grupo);

    if( newForm.n_borrado == 0 ){
      //QUITAR ASIGANCIÓN
      this.noAsignarLineaUser(newForm);
    }else{
      let request  ={ 
        n_idtra_grupo: this.data.n_idtra_grupo,
        n_idpl_linea: [newForm.n_idpl_linealn],
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile
      }
      console.log("Envio datos lineaUser",request);
      
      this._confiGeneral_service.asignarLineaUser(request, this.getToken().token).subscribe(
        result => {
          try {
            if (result.estado) {
              //this.dialogAsigPro.close({ flag: true });
              //this.getLineaUser();
              this.openSnackBar("Acción completada", 99);
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
    this.tablalineaGrupo.filter = filterValue.trim().toLowerCase();
  }

  asignarAll(tablalineaGrupo): void {
    
    let array = tablalineaGrupo.filteredData;
    console.log(array);
    let elementArray = [];
    
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Seguro que desea asignar todas las redes? \n\r"+ 
                      "Se asignará "+array.length+ " redes"
            }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.selectAll = true;
        array.forEach(e => {
          elementArray.push(e.n_idpl_linealn);
        });
        let request  = { 
          n_idtra_grupo: this.data.n_idtra_grupo,
          n_idpl_linea: elementArray,
          n_id_usermodi: this.usuarioLog.n_idseg_userprofile
        }
        this._confiGeneral_service.asignarLineaUser(request, this.getToken().token).subscribe(
          result => {
            try {
              if (result.estado) {
                console.log(result.estado);
                
                this.dialogAsigLinea.close();
                this.openSnackBar("Acción completada", 99);
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
    });
    
    
  }

  denegarrAll(tablalineaGrupo): void {
    
    let array = tablalineaGrupo.filteredData;
    console.log(array);
    let elementArray = [];
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Seguro que desea denegar todas las redes? \n\r"+ 
                      "Se denegará "+array.length+ " redes"
            }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
      if (result) {
        this.selectAll = false;
        array.forEach(e => {
          elementArray.push(e.n_idpl_linealn);
        });
        let request  = { 
          n_idtra_grupo: this.data.n_idtra_grupo,
          n_idpl_linea: elementArray,
          n_id_usermodi: this.usuarioLog.n_idseg_userprofile
        }
        this._confiGeneral_service.noAsignarLineaUser(request, this.getToken().token).subscribe(
          result => {
            try {
              if (result.estado) {
                this.dialogAsigLinea.close();
                this.openSnackBar("Acción completada", 99);
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
    });
  }

}

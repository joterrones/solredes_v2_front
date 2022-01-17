import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatPaginator, MatSnackBar, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { extend } from 'ol/array';
import { AppSettings } from 'src/app/common/appsettings';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { Roleditar } from 'src/app/interface/seguridad.interface';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-rolpermisos',
  templateUrl: './rolpermisos.component.html',
  styleUrls: ['./rolpermisos.component.css'],
  providers: [SeguridadService]
})
export class RolpermisosComponent extends BaseComponent implements OnInit {

  pantallas= [];
  tabla: MatTableDataSource<any>;
  displayedColumns: string[] = ['c_codigo', 'c_nombre', 'permiso'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  permisos = [
    { id: "SA", nombre: "SA" },
    { id: "CO", nombre: "CO" },
    { id: "MO", nombre: "MO" }    
  ];

  constructor(
    public dialogAsigPro: MatDialogRef<RolpermisosComponent>,
    private _seguridad_service: SeguridadService,
    @Inject(MAT_DIALOG_DATA) public data: Roleditar,
    public _router: Router,
    public snackBar: MatSnackBar
    ){
    super(snackBar, _router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    this.getPantalla();
  }

  getPantalla(){
    let request = {
      n_idseg_rol: this.data.rol.n_idseg_rol
    }
    console.log(request);
    
    this._seguridad_service.getPantalla(request,this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          console.log("Pantallas",resultado.data);
          this.tabla = new MatTableDataSource<any>(result.data);
          this.tabla.sort = this.sort;
          this.tabla.paginator = this.paginator;
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

  onSelectChange(item) {
    try {      
      if(item.n_idseg_rol == null){
        item.n_idseg_rol = this.data.rol.n_idseg_rol
      }
      item.n_id_usermodi = this.usuarioLog.n_idseg_userprofile
      console.log(item);
      this._seguridad_service.updatePantallaRol(item,this.getProyect()).subscribe(
        result => {
          if (result.estado) {

          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        }, error => {
          this.openSnackBar(<any>error, 99);

        });
    } catch (error) {
      this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
    }
  }

}

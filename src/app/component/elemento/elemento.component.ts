import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { ElementoService } from 'src/app/service/elemento.service';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-elemento',
  templateUrl: './elemento.component.html',
  styleUrls: ['./elemento.component.css'],
  providers: [ElementoService, SeguridadService]
})
export class ElementoComponent extends BaseComponent implements OnInit {
  pantallaRol= [];
  permisoEdit: boolean = false;

  tit = 'ADMINISTRACIÓN DE ELEMENTO';

  tabla: MatTableDataSource<any>;
  displayedColumns: string[] = [/*'n_idpl_elemento',*/ 'c_codigo', 'c_nombre', 'b_partidanueva', 'c_material', 'c_esfuerzo', 'c_altura', 'c_seccionconductor'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  config: boolean = false;

  tipoarmado: Array<any>;
  idtipoarmado: number;

  version: Array<any>;
  idversion: number;

  armado: any;

  general: Array<any>;
  url_lamina: String;
  url_iconomapa: String;

  material = [
    { id: "", nombre: "" },
    { id: "CAC", nombre: "CAC" },
    { id: "MD", nombre: "MD" },
    { id: "T", nombre: "T" },
    { id: "PEX", nombre: "PEX" }
  ];
  esfuerzo = [
    { id: "", nombre: "" },
    { id: "200", nombre: "200" },
    { id: "300", nombre: "300" },
    { id: "C6", nombre: "C6" },
    { id: "C7", nombre: "C7" }
  ];
  altura = [
    { id: "", nombre: "" },
    { id: "8", nombre: "8" },
    { id: "9", nombre: "9" },
    { id: "10", nombre: "10" },
    { id: "11", nombre: "11" },
    { id: "12", nombre: "12" },
    { id: "13", nombre: "13" }
  ];
  seccion = [
    { id: "", nombre: "" },
    { id: "35", nombre: "35" },
    { id: "70", nombre: "70" },
    { id: "140", nombre: "140" }
  ];

  constructor(
    public _elemento_service: ElementoService,
    public _seguridad_service: SeguridadService,
    public dialog: MatDialog,
    public snack_1: MatSnackBar,
    public router: Router
  ) {
    super(snack_1,router)
  }

  ngOnInit() {    
    this.usuarioLog = this.getUser().data;    
    this.getPantallaRol();
    this.getTabla();
  }

  applyFilter(filterValue: string) {
    this.tabla.filter = filterValue.trim().toLowerCase();
  }

  getTabla() {

    this._elemento_service.get(this.getProyect()).subscribe(
      result => {
        if (result.estado) {
          this.tabla = new MatTableDataSource<any>(result.data);
          console.log(result.data);          
          this.tabla.sort = this.sort;
          this.tabla.paginator = this.paginator;
        } else {

          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        this.openSnackBar(<any>error, 99);
      });
  }



  onSelectChange(item) {
    try {
      var str_material = "";
      item.array_material.forEach(element => {
        if (str_material == "") {
          str_material = element;
        } else {
          str_material = str_material + "," + element;
        }
      });
      item.c_material = str_material;
      var str_esfuerzo = "";
      item.array_esfuerzo.forEach(element => {
        if (str_esfuerzo == "") {
          str_esfuerzo = element;
        } else {
          str_esfuerzo = str_esfuerzo + "," + element;
        }
      });
      item.c_esfuerzo = str_esfuerzo;
      var str_altura = "";
      item.array_altura.forEach(element => {
        if (str_altura == "") {
          str_altura = element;
        } else {
          str_altura = str_altura + "," + element;
        }
      });
      item.c_altura = str_altura;
      var str_seccionconductor = "";
      item.array_seccionconductor.forEach(element => {
        if (str_seccionconductor == "") {
          str_seccionconductor = element;
        } else {
          str_seccionconductor = str_seccionconductor + "," + element;
        }
      });
      item.c_seccionconductor = str_seccionconductor;
      item.n_id_usermodi= this.usuarioLog.n_idseg_userprofile;
      this._elemento_service.updateconfig(item,this.getProyect()).subscribe(
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
  public setparametros(n_version) {
    this.idversion = n_version;
    this.getTabla();
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
            if(element.c_codigo === 'ma-adele'){
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

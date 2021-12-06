import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { AppSettings } from '../../../common/appsettings';
import { TareaService } from '../../../service/tarea.service';
import { ProyectoInterface } from '../../../interface/proyecto.interface';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-tareaconfig',
  templateUrl: './tareaconfig.component.html',
  styleUrls: ['./tareaconfig.component.css'],
  providers:[TareaService]
})
export class TareaconfigComponent extends BaseComponent implements OnInit {
  
    datoadicional = {
      n_idgen_datoadicional:0,
      c_dato:'',
      c_tipodato:'',
      n_idgen_tarea:0,
      c_unidad:''
    };

  tarea: any;
  flag = true;
  displayedColumns: string[] = ['add', 'c_dato','c_tipodato','unidad'];
  public tabla: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  textfilter = '';

  constructor(public dialogRef: MatDialogRef<TareaconfigComponent>,
    private _tarea_service: TareaService,
    @Inject(MAT_DIALOG_DATA) public data: ProyectoInterface,
    public _router: Router,
    public snackBar: MatSnackBar) {
    super(snackBar, _router);
  }

  ngOnInit() {
    this.tarea= this.data;

    this.get_tabla();
  }

  get_tabla() {
    let req={n_idgen_tarea:this.tarea.n_idgen_tarea};
    this._tarea_service.get_datoadicional(req,this.getToken().token).subscribe(
      result => {
        try {
          console.log(result)
          if (result.estado) {
            this.tabla = new MatTableDataSource<any>(result.data);
            this.tabla.sort = this.sort;
            this.tabla.paginator = this.paginator;
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
    this.tabla.filter = filterValue.trim().toLowerCase();
  }


  guardar(form) {
    
    this.datoadicional.n_idgen_tarea = this.tarea.n_idgen_tarea;
    
    this._tarea_service.save_datoadicional_tarea(this.datoadicional, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.get_tabla();
            this.flag=true;
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
  
  edit(elemento){
    this.flag=false;
    if(elemento==null){
      this.datoadicional = {
        n_idgen_datoadicional:0,
        c_dato:'',
        c_tipodato:'',
        n_idgen_tarea:0,
        c_unidad:''
      };
    }else{
      this.datoadicional=elemento;
    }
    console.log( this.datoadicional);
  }
  cancel(){
    this.flag=true;
  }
  
}

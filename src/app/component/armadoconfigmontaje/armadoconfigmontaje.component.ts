import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatPaginator, MatSnackBar, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ArmadoService } from 'src/app/service/armado.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-armadoconfigmontaje',
  templateUrl: './armadoconfigmontaje.component.html',
  styleUrls: ['./armadoconfigmontaje.component.css'],
  providers: [ArmadoService]
})
export class ArmadoconfigmontajeComponent extends BaseComponent implements OnInit {

  tipoarmado: Array<any>;
  idtipoarmado: number;

  public buscarFiltro: String = '';
  tabla: MatTableDataSource<any>;

  displayedColumns: string[] = ['estado', 'c_codigo', 'c_nombre'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
      public dialogRef: MatDialogRef<any>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public _armado_service: ArmadoService,

      public snackBar: MatSnackBar,
      public _router: Router
  ) {

      super(snackBar,_router);
  }

  ngOnInit() {
      this.getTabla();
  }

  public getTabla() {
      let request = {
          n_idpl_armado: this.data.item.n_idpl_armado,

      };
      this._armado_service.getconfigtipomontaje(request,this.getProyect()).subscribe(
          result => {
              if (result.estado) {
                  // this.lista = result.data
                  this.tabla = new MatTableDataSource<any>(result.data);
                  this.tabla.sort = this.sort;
                  this.tabla.paginator = this.paginator;
              } else {

                  this.openSnackBar(result.mensaje, 99);
              }
          }, error => {
              this.openSnackBar(<any>error, 99);
              alert(error.error);
          });
  }

  changeestado(item) {
      console.log("Estado")
      let request= {
          n_idpl_armado : this.data.item.n_idpl_armado,
          n_idmon_tipomontaje: item.n_idmon_tipomontaje,
          estado: !item.estado
      }
      this._armado_service.insertarmadoconfigmontaje(request,this.getProyect()).subscribe(
          result => {
              console.log(result);
              if (result.estado) {
                  this.openSnackBar("Estado guardado", 200);
              } else {

                  this.openSnackBar(result.mensaje, 99);
              }
          }, error => {
              this.openSnackBar(<any>error, 99);
              alert(error.error);
          });


  }
  applyFilter(filterValue: string) {

      this.tabla.filter = filterValue.trim().toLowerCase();
  }

}

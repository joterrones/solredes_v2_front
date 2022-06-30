import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatPaginator, MatSnackBar, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { ArmadoService } from 'src/app/service/armado.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-armadoconfigsuministro',
  templateUrl: './armadoconfigsuministro.component.html',
  styleUrls: ['./armadoconfigsuministro.component.css'],
  providers: [ArmadoService]
})
export class ArmadoconfigsuministroComponent extends BaseComponent implements OnInit {
  armado;
  tablaconfig: MatTableDataSource<any>;
  displayedColumnsConfig: string[] = [ 'c_codigo','c_nombre','c_unidad','n_cantidad'];
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
    console.log(this.data.item.n_idpl_armado);
    
    this.usuarioLog = this.getUser().data;
    this.armado = this.data.item;
    this.getTablaConfig(this.armado.n_idpl_armado);
  }

  getTablaConfig(id) {
    
    let request = {
      n_idpl_armado:id
    }
    this._armado_service.getconfigarmado(request,this.getProyect()).subscribe(
      result => {
        if(result.estado){
          this.tablaconfig = new MatTableDataSource<any>(result.data);
          this.tablaconfig.sort = this.sort;
          this.tablaconfig.paginator = this.paginator;
          console.log(result.data);
          
        }else{
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        this.openSnackBar(<any>error, 99);
      });
  }
  applyFilterConfig(filterValue: string) {
    
    this.tablaconfig.filter = filterValue.trim().toLowerCase();
  }

  keyPress(event: any,item) {
    if(event.key==="Enter"){
        if(!(isNaN(item.n_cantidad))){
          console.log(item);
          
          let request ={
            n_idpl_armado:this.armado.n_idpl_armado,
            n_idpl_elemento:item.n_idpl_elemento,
            n_cantidad:parseFloat(item.n_cantidad),
            n_id_usermodi: this.usuarioLog.n_idseg_userprofile
          }
          console.log(request);
          
          try {
            this._armado_service.insertconfigarmado(request,this.getProyect()).subscribe(
              result => {
                if(result.estado){
                  this.openSnackBar("Dato Guardado",200);
                }else{
                  this.openSnackBar(result.mensaje, 99);
                }
              }, error => {
                console.log(<any>error);
            
                  this.openSnackBar(<any>error, 99);
              
              });
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      } else{
        this.openSnackBar("Solo números", 99);
        item.n_cantidad = 0;
      }
    }
  }
  onFocus(item){

  }
}

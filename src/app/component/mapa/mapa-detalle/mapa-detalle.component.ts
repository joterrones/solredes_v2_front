import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router } from "@angular/router";
import { AppSettings } from 'src/app/common/appsettings';
import { Archivo, ArchivoEditar } from 'src/app/interface/archivos.interface';
import { Confirmar } from 'src/app/interface/confirmar.interface';
import { ArchivosServices } from 'src/app/service/archivos.service';
import { MapaService } from 'src/app/service/mapa.service';
import { BaseComponent } from '../../base/base.component';
import { FichaComponent } from '../../ficha/ficha.component';

@Component({
  selector: 'app-mapa-detalle',
  templateUrl: './mapa-detalle.component.html',
  styleUrls: ['./mapa-detalle.component.css'],
  providers: [MapaService]
})
export class MapaDetalleComponent extends BaseComponent implements OnInit  {

  displayedColumns: string[] = ['NombreArmado', 'Cantidad', 'Orientacion'];
  public tabla: MatTableDataSource<any>;
  public confirmar: Confirmar;
  c_nombre:string="";

  nombreEstruct: string="";
  codigoEstruct: string="";
  codigoMon: string="";
  showInspeccion = false;
  showEstruct = false;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<MapaDetalleComponent>,    
    public dialog: MatDialog,
    public _mapa_service: MapaService,  
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _router: Router,
    public snackBar: MatSnackBar) {
      super(snackBar, _router); 
  }

  ngOnInit() {
    this.c_nombre = this.data.n_idpl_estructura;
    
    if(this.data.n_idmon_inspeccion){
      this.showInspeccion = true;
      console.log(this.data.n_idmon_inspeccion);
      this.getMonIns();
    }else{
      this.showEstruct = true;
      console.log(this.data.n_idpl_estructura);
      this.getEstruct();
    }
    
  }

    
  getEstruct() {
    let request = {
      n_idpl_estructura: this.data.n_idpl_estructura,   
    }
    this._mapa_service.getdetalle(request).subscribe(
      result => {
        try {
          if (result.estado) {
            this.tabla = new MatTableDataSource<any>(result.data);
            this.tabla.sort = this.sort;
            this.tabla.paginator = this.paginator;

            this._mapa_service.getestructura(request).subscribe(
              result =>{
                if(result.estado){
                  this.nombreEstruct = result.data[0].c_nombre;
                  this.codigoEstruct = result.data[0].c_codigo;
                }
              });
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }

  getMonIns() {
    let request = {
      n_idmon_inspeccion: this.data.n_idmon_inspeccion,   
    }
    console.log(request);
    
    this._mapa_service.getdetalleMon(request).subscribe(
      result => {
        try {
          if (result.estado) {
            this.codigoMon = result.data[0].c_codigomon;
            this.tabla = new MatTableDataSource<any>(result.data);
            this.tabla.sort = this.sort;
            this.tabla.paginator = this.paginator;
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }

  keyPress(event: any,item) {
    if(event.key==="Enter"){
      
      if(!(isNaN(item.n_orientacion))){
        let request ={
          n_idpl_estructuraarmado: item.n_idpl_estructuraarmado,
          n_orientacion: parseFloat(item.n_orientacion)
        }
        console.log(request);
        
        try {
          this._mapa_service.insertOrientacion(request).subscribe(
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
      }
    }
  }

  download(){
    const dialogRef = this.dialog.open(FichaComponent, {
      width: '250px',
      data: { n_idmon_inspeccion: this.data.n_idmon_inspeccion }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {       
      } catch (error) {
        console.log(error);
      }
    });
  }

}



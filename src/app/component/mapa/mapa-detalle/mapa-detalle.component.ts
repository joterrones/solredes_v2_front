import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from "@angular/router";
import { AppSettings } from 'src/app/common/appsettings';
import { Archivo, ArchivoEditar } from 'src/app/interface/archivos.interface';
import { Confirmar } from 'src/app/interface/confirmar.interface';
import { ArchivosServices } from 'src/app/service/archivos.service';
import { MapaService } from 'src/app/service/mapa.service';
import { BaseComponent } from '../../base/base.component';

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

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<MapaDetalleComponent>,    
    public _mapa_service: MapaService,  
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _router: Router,
    public snackBar: MatSnackBar) {
      super(snackBar, _router); 
  }

  ngOnInit() {
    this.c_nombre = this.data.n_idpl_estructura;
    this.get();
  }

    
  get() {

    let request = {
      n_idpl_estructura: this.data.n_idpl_estructura,   
    }
    this._mapa_service.getdetalle(request).subscribe(
      result => {

        try {
          if (result.estado) {
            console.log(result.data);
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

}


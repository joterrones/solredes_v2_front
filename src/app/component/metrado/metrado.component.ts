import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { MetradoService } from 'src/app/service/metrado.service';
import { MetradoMontajeService } from 'src/app/service/metradomontaje.service';
import { BaseComponent } from '../base/base.component';
import { DetallemetradoComponent } from '../detallemetrado/detallemetrado.component';

@Component({
  selector: 'app-metrado',
  templateUrl: './metrado.component.html',
  styleUrls: ['./metrado.component.css'],
  providers: [MetradoService, MetradoMontajeService]
})
export class MetradoComponent extends BaseComponent implements OnInit {

  tit = 'METRADO';
  public buscarFiltro: String = '';
  tabla: MatTableDataSource<any>;
  displayedColumns: string[] = ['c_codigo', 'c_nombre', 'c_unidad', 'n_cantidad', 'estructuras'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  tipolineas: Array<any>;
  idtipolinea: number;

  pn_idpl_linea: number;
  pn_version: number;

  filtro = [{ id: 1, nombre: "Suministro" },
  { id: 2, nombre: "Montaje" }];

  constructor(
    public _metrado_service: MetradoService,
    public _metrado_montaje_service: MetradoMontajeService,
    public dialog: MatDialog,
    public snack_1: MatSnackBar,
    public router: Router
  ) {
    super(snack_1,router)
  }

  ngOnInit() {
  }

  onSelectTipo(id) {
    switch (id) {
      case 1:
        this.getTabla();
        break;
      case 2:
        this.getTablaMontaje();
        break;
    }
  }

  public getTabla() {
    let request = {
      n_idpl_tipolinea: this.idtipolinea,
      n_idpl_linea: this.pn_idpl_linea,
      n_version: this.pn_version
    };
    console.log(request);
    
    this._metrado_service.get(request, this.getProyect()).subscribe(
      result => {
        console.log("Metrado");
        console.log(result);
        if (result.estado) {
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

  public getTablaMontaje() {
    let request = {
      n_idpl_tipolinea: this.idtipolinea,
      n_idpl_linea: this.pn_idpl_linea,
      n_version: this.pn_version
    };
    this._metrado_montaje_service.getmontaje(request, this.getProyect()).subscribe(
      result => {
        if (result.estado) {
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


  isGroup(index, item): boolean {
    return item.isGroupBy;
  }

  public setparametros(n_idpl_linea, n_version, n_idpl_tiplinea) {
    this.pn_idpl_linea = n_idpl_linea;
    this.pn_version = n_version;
    this.idtipolinea = n_idpl_tiplinea;
    this.getTabla();

  }

  openDialog(item): void {
    let data = {
      item: item,
      n_idpl_elemento: item.n_idpl_elemento,
      n_idpl_linea: this.pn_idpl_linea,
      n_version: this.pn_version
    };
    const dialogRef = this.dialog.open(DetallemetradoComponent, {
      width: '80%',
      height: '800px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {

      this.getTabla();

    });
  }

}

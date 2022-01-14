import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MetradoService } from 'src/app/service/metrado.service';
import { MetradoMontajeService } from 'src/app/service/metradomontaje.service';
import { VersionService } from 'src/app/service/version.service';
import { BaseComponent } from '../base/base.component';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { DetallemetradoComponent } from '../detallemetrado/detallemetrado.component';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-metradomontaje',
  templateUrl: './metradomontaje.component.html',
  styleUrls: ['./metradomontaje.component.css'],
  providers: [MetradoService, MetradoMontajeService,VersionService]
})
export class MetradomontajeComponent extends BaseComponent implements OnInit {

  tit = 'METRADO';
  versiones = [];
  n_idpl_linea="";
  n_idpl_tipolinea="";
  idversion="";

  tabla2: MatTableDataSource<any>;
  displayedColumns: string[] = ['c_codigo', 'c_nombre', 'c_unidad', 'n_cantidad', 'estructuras'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public _metrado_service: MetradoMontajeService,
    private _Activatedroute: ActivatedRoute, 
    public _version_service: VersionService,
    public dialog: MatDialog,
    public snack_1: MatSnackBar,
    public router: Router
  ) {
    super(snack_1,router)
  }

  ngOnInit() {
    this.n_idpl_linea = this._Activatedroute.snapshot.paramMap.get("n_idpl_linea");
    this.n_idpl_tipolinea = this._Activatedroute.snapshot.paramMap.get("n_idpl_tipolinea");
    this.versiones = this._version_service.get();
  }

  selecVersion(id) {
    this.idversion = id;
    this.getTabla();
  }

  public getTabla() {
    let request = {
      n_idpl_tipolinea: this.n_idpl_tipolinea,
      n_idpl_linea: this.n_idpl_linea,
      n_version: this.idversion
    };
    this._metrado_service.getmontaje(request,this.getProyect()).subscribe(
      result => {
        if (result.estado) {
          console.log(result.data);
          
         // this.lista = result.data
          this.tabla2 = new MatTableDataSource<any>(result.data);
          this.tabla2.sort = this.sort;
          this.tabla2.paginator = this.paginator;
          //this.exportAsExcelFile(result.data,"sample")
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

  openDialog(item): void {
    let data = {
      item: item,
      n_idpl_elemento: item.n_idpl_elemento,
      n_idpl_linea: this.n_idpl_linea,
      n_version: this.versiones
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
  
  /*public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }*/
}

import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { Chart } from 'chart.js';
import * as fs from 'file-saver';
import {
  MatDialog,
  MatDialogRef,
  MatPaginator,
  MatSnackBar,
  MatSort,
  MatTableDataSource,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { Router } from "@angular/router";
import { Confirmar } from "src/app/interface/confirmar.interface";
import { EditarReporte, Reporte } from "src/app/interface/reporte.interface";
import { confGeneralService } from "src/app/service/confGeneral.service";
import { ReporteService } from "src/app/service/reporte.service";
import { SeguridadService } from "src/app/service/seguridad.service";
import { BaseComponent } from "../../base/base.component";
import { Workbook } from "exceljs";

@Component({
  selector: "app-reporte-avance",
  templateUrl: "./reporte-avance.component.html",
  styleUrls: ["./reporte-avance.component.css"],
  providers: [confGeneralService, SeguridadService, ReporteService],
})
export class ReporteAvanceComponent extends BaseComponent implements OnInit {

  id: number;
  listAdvance = [];
  listNotadvance = [];
  listpostes = [];
  nombreProyecto = this.proyecto.c_nombre;

  permisoEdit: boolean = false;

  idtipolinea = 0;
  textfilter = "";

  displayedColumns: string[] = [
    "seccion",
    "poste",
    "metradoc",
    "metrador",
    "llegadoo",
    "saldollegar",
    "cantidadesp",
    "saldoizar",
    "avanceizado",
    "izadopendiente",
  ];
  public tablaTipoLinea: MatTableDataSource<any>;
  public confirmar: Confirmar;

  public myChartLineasEstado:any;

  datosCambiados: any[];

  reporte: Reporte

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
   @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    public router: Router,
    private _confiGeneral_service: confGeneralService,
    public _seguridad_service: SeguridadService,
    public reporteService: ReporteService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ReporteAvanceComponent>,
  )

  {
    super(snackBar, router);
  }

  ngOnInit() {
    this.usuarioLog = this.getUser().data;
    this.id = this.data.item.n_idctrl_cabecerareporteavance;
    this.getTablaTipolinea();
    console.log("componente abierto");
  }

  //OBTENER REPORTES
  getTablaTipolinea() {
    let request = {
      n_idpl_tipolinea: this.id,
    };
    this.reporteService.getReporte(request, this.getToken().token).subscribe(
      (result) => {
        let datos: any[] = result.data;
        this.datosCambiados = datos.map(x => {
          x.saldoLlegar = x.n_metrado_replanteo - x.n_llegado_obra
          x.saldoIzar = x.n_metrado_replanteo - x.n_cantidadesposteizado
          if(x.n_metrado_replanteo ==0 || x.n_cantidadesposteizado ==0 ){
            x.avanceIzadoPostes = 0
          }else{
            x.avanceIzadoPostes = ((x.n_cantidadesposteizado/x.n_metrado_replanteo)*100).toFixed(0)
          }
          if(x.avanceIzadoPostes == 0){
            x.avancePendiente = 0
          }else{
            x.avancePendiente = 100 -  x.avanceIzadoPostes
          }
          
          return x;
        });
        this.tablaTipoLinea = new MatTableDataSource<any>(this.datosCambiados);
        this.tablaTipoLinea.sort = this.sort;
        this.tablaTipoLinea.paginator = this.paginator;
        this.listarAvance();
      },
      (error) => {
        this.openSnackBar(error.error, 99);
      }
    );
  }

  listarAvance(){
    this.datosCambiados.forEach(element => {
      this.listAdvance.push(parseInt(element.avanceIzadoPostes));
      this.listNotadvance.push(element.avancePendiente);
      this.listpostes.push(element.c_tipo);
    });
    this.myChartLineasEstado = new Chart('LineasEstado', {
      type: 'bar',
      data: {
        labels: this.listpostes,
        datasets: [{
          label: '% Avance del izado de postes',
          data: this.listAdvance,
          backgroundColor: ['rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)'],
          borderColor: ['rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)'],
          borderWidth: 1
        },{
          label: '% Izado pendiente',
          data: this.listNotadvance,
          backgroundColor: ['rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)'],
          borderColor: ['rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)'],
          borderWidth: 1
        }]
      },
      options: {
        legend: {  display: true },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  setdatogeneral(worksheet, cell, value, fontsize, bolt, fg_color = 'FFFFFF', bg_color = '000000') {
    const titleRow = worksheet.getCell(cell)
    titleRow.value = value;
    titleRow.font = { name: 'Arial Narrow', family: 4, size: fontsize, bold: bolt };
    titleRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: fg_color },
      color: { argb: bg_color }
    };
  }

  download(){
    this.downloadReporte(this.datosCambiados,this.nombreProyecto);
  }

  downloadReporte(data: any[], proyecto: string): void{        

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(proyecto);

    let row = 1;

    worksheet.getCell('A' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'A' + row, ' SECCION ', 10, true, '002060');
    worksheet.getCell('A' + row).font = { color: { argb: 'FFFFFF' }, bold: true, name: 'Arial Narrow'  , size: 11};
    worksheet.getCell('A' + row).border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
  };

    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, ' POSTE ', 10, true, '002060');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true, name: 'Arial Narrow'  };
    worksheet.getCell('B' + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin' },
    };

    worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'C' + row, ' Metrado Contractual ', 10, true, '002060');
    worksheet.getCell('C' + row).font = { color: { argb: 'FFFFFF' }, bold: true, name: 'Arial Narrow'  };
    worksheet.getCell('C' + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin' },
    };

    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, ' Metrado Replanteo ', 10, true, '002060');
    worksheet.getCell('D' + row).font = { color: { argb: 'FFFFFF' }, bold: true, name: 'Arial Narrow'  };
    worksheet.getCell('D' + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin' },
    };

    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, ' Llegados a Obra ', 10, true, '002060');
    worksheet.getCell('E' + row).font = { color: { argb: 'FFFFFF' }, bold: true, name: 'Arial Narrow'  };
    worksheet.getCell('E' + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin' },
    };

    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, ' Saldo por Llegar ', 10, true, '002060');
    worksheet.getCell('F' + row).font = { color: { argb: 'FFFFFF' }, bold: true, name: 'Arial Narrow'  };
    worksheet.getCell('F' + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin' },
    };

    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'G' + row, ' Cantidades de poste Izado ', 10, true, '002060');
    worksheet.getCell('G' + row).font = { color: { argb: 'FFFFFF' }, bold: true, name: 'Arial Narrow'  };
    worksheet.getCell('G' + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin' },
    };

    worksheet.getCell('H' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'H' + row, ' Saldo por Izar ', 10, true, '002060');
    worksheet.getCell('H' + row).font = { color: { argb: 'FFFFFF' }, bold: true, name: 'Arial Narrow'  };
    worksheet.getCell('H' + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin' },
    };

    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'I' + row, ' % Avamce del izado de postes ', 10, true, '002060');
    worksheet.getCell('I' + row).font = { color: { argb: 'FFFFFF' }, bold: true, name: 'Arial Narrow'  };
    worksheet.getCell('I' + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin' },
    };

    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'J' + row, ' % Izado pendiente ', 10, true, '002060');
    worksheet.getCell('J' + row).font = { color: { argb: 'FFFFFF' }, bold: true, name: 'Arial Narrow'  };
    worksheet.getCell('J' + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin' },
    };
    data.forEach(element => {
      
        row += 1;
        worksheet.getCell('A' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'A' + row, element.c_seccion, 10, false, '002060');
        worksheet.getCell('A' + row).font = { color: { argb: 'FFFFFF' }, bold: true , name: 'Arial Narrow' };
        worksheet.getCell('A' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, element.c_tipo, 10, false, '8ca7db');
        worksheet.getCell('B' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'C' + row, element.n_metrado_contractual, 10, false);
        worksheet.getCell('C' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, element.n_metrado_replanteo, 10, false);
        worksheet.getCell('D' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'E' + row, element.n_llegado_obra, 10, false);
        worksheet.getCell('E' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };
        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, element.saldoLlegar, 10, true);
        worksheet.getCell('F' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };
        worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'G' + row, element.n_cantidadesposteizado, 10, false);
        worksheet.getCell('G' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };
        worksheet.getCell('H' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'H' + row, element.saldoIzar, 10, true, 'f5da82');
        worksheet.getCell('H' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };
        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, element.avanceIzadoPostes, 10, false);
        worksheet.getCell('I' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, element.avancePendiente, 10, true,'f5da82');
        worksheet.getCell('J' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

    });   

    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 20;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 20;
    worksheet.getColumn(5).width = 20;
    worksheet.getColumn(6).width = 20;
    worksheet.getColumn(7).width = 20;
    worksheet.getColumn(8).width = 20;
    worksheet.getColumn(9).width = 20;
    worksheet.getColumn(10).width = 20;

    worksheet.getRow(1).height = 60;
    worksheet.getRow(2).height = 20;
    worksheet.getRow(3).height = 20;
    worksheet.getRow(4).height = 20;
    worksheet.getRow(5).height = 20;
    worksheet.getRow(6).height = 20;
    worksheet.getRow(7).height = 20;
    worksheet.getRow(8).height = 20;
    worksheet.getRow(9).height = 20;
    worksheet.getRow(10).height = 20;

    //worksheet.getRow(2).height = 20;

    //worksheet.mergeCells(`B1:I1`);

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'DataReporte-' +proyecto+ '.xlsx');
    });

    this.router.navigate(["/reporte"]);
  } 


}




 


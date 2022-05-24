import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import { confGeneralService } from 'src/app/service/confGeneral.service';
import { ExportarService } from 'src/app/service/exportar.service';
import { BaseComponent } from '../base/base.component';
import * as fs from 'file-saver';
import { VersionService } from 'src/app/service/version.service';

@Component({
  selector: 'app-importacion-planilla-descargar',
  templateUrl: './importacion-planilla-descargar.component.html',
  styleUrls: ['./importacion-planilla-descargar.component.css'],
  providers: [confGeneralService, ExportarService, VersionService]
})
export class ImportacionPlanillaDescargarComponent extends BaseComponent implements OnInit {
  versiones = [];
  idlinea = 0;
  idversion = 0; 
  idzona = 0;
  idtipolinea = 0;
  nomT = "";
  nomZ = "";
  nomL = "";
  procesando: boolean =  false;
  constructor(
    public dialogRef: MatDialogRef<ImportacionPlanillaDescargarComponent>,    
    public _confiGeneral_service: confGeneralService,
    public _exportar_service: ExportarService,
    public _version_service: VersionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _router: Router,
    public snackBar: MatSnackBar) {
      super(snackBar, _router);
  }

  ngOnInit() {
    this.versiones = this._version_service.get();
    this.idlinea = this.data.linea.n_idpl_linea;
    this.idzona = this.data.linea.n_idpl_zona;
    this.idtipolinea = this.data.linea.n_idpl_tipolinea;
    this.nomT = this.data.linea.c_nombret;
    this.nomZ = this.data.linea.c_nombrez;
    this.nomL = this.data.linea.c_codigo;
  }

  setdatogeneral(worksheet, cell, value, fontsize, bolt, fg_color = 'FFFFFF', bg_color = '000000') {
    const titleRow = worksheet.getCell(cell)
    titleRow.value = value;
    titleRow.font = { name: 'ARIAL', family: 4, size: fontsize, bold: bolt };
    titleRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: fg_color },
      color: { argb: bg_color }
    };
  }

  guardar(newForm) {
    if(this.idversion != 0){
        this.procesando = true;
        let request = {
            n_idpro_proyecto: this.proyecto.n_idpro_proyecto,
            idversion: this.idversion,
            idlinea: this.idlinea,
            idzona: this.idzona,
            idtipolinea: this.idtipolinea
        }
        console.log(request);

        this._exportar_service.exportar(request, this.getToken().token).subscribe(
        result => {    
            console.log(result.data);
            
            //this._exportar_service.exportarExcelPlanilla(result.data);
            var datos = result.data;

            const workbook = new Workbook();
            const worksheet = workbook.addWorksheet(this.nomL);

            let row = 1;

            worksheet.getCell('A' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'A' + row, 'LINEA', 10, true, '00DA50');
            worksheet.getCell('A' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('A' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'B' + row, 'NRO_SSEE', 10, true, '00DA50');
            worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('B' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'C' + row, 'CIRCUITO', 10, true, '00DA50');
            worksheet.getCell('C' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('C' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'D' + row, 'ESTRUCTURA_ANTERIOR', 10, true, '00DA50');
            worksheet.getCell('D' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('D' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'E' + row, 'ESTRUCTURA', 10, true, '00DA50');
            worksheet.getCell('E' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('E' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'F' + row, 'ARMADO_P', 10, true, '00DA50');
            worksheet.getCell('F' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('F' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'G' + row, 'ARMADO_S', 10, true, '00DA50');
            worksheet.getCell('G' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('G' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('H' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'H' + row, 'ARMADO_RS_SE', 10, true, '00DA50');
            worksheet.getCell('H' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('H' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'I' + row, 'PROGRESIVA', 10, true, '002060');
            worksheet.getCell('I' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('I' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };


            worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'J' + row, 'COTA', 10, true, '002060');
            worksheet.getCell('J' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('J' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'K' + row, 'VERTICE', 10, true, '002060');
            worksheet.getCell('K' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('K' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
            };

            worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'L' + row, 'ANGULO', 10, true, '00DA50');
            worksheet.getCell('L' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('L' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'M' + row, 'VANO', 10, true, '002060');
            worksheet.getCell('M' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('M' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'N' + row, 'T_TERRENO', 10, true, '00DA50');
            worksheet.getCell('N' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('N' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('O' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'O' + row, 'S_CANTIDAD', 10, true, '002060');
            worksheet.getCell('O' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('O' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('P' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'P' + row, 'S_TIPO', 10, true, '002060');
            worksheet.getCell('P' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('P' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('Q' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'Q' + row, 'COOR_E', 10, true, '00DA50');
            worksheet.getCell('Q' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('Q' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('R' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'R' + row, 'COOR_N', 10, true, '00DA50');
            worksheet.getCell('R' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('R' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('S' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'S' + row, 'ZONA', 10, true, '002060');
            worksheet.getCell('S' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('S' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('T' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'T' + row, 'TIPO_CONDUCTOR', 10, true, '002060');
            worksheet.getCell('T' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('T' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('U' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'U' + row, 'CANTIDAD_CONDUCTOR', 10, true, '002060');
            worksheet.getCell('U' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('U' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('V' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'V' + row, 'AISLADOR_56_3', 10, true, '002060');
            worksheet.getCell('V' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('V' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('W' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'W' + row, 'AISLADOR_POLIMERICO', 10, true, '002060');
            worksheet.getCell('W' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('W' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('X' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'X' + row, 'AMOR_35', 10, true, '002060');
            worksheet.getCell('X' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('X' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };
            
            worksheet.getCell('Y' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'Y' + row, 'AMOR_70', 10, true, '002060');
            worksheet.getCell('Y' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('Y' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('Z' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'Z' + row, 'RI_A', 10, true, '002060');
            worksheet.getCell('Z' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('Z' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('AA' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AA' + row, 'RV_A', 10, true, '002060');
            worksheet.getCell('AA' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AA' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('AB' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AB' + row, 'RI_MT', 10, true, '002060');
            worksheet.getCell('AB' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AB' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };
            

            worksheet.getCell('AC' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AC' + row, 'RV_MT', 10, true, '002060');
            worksheet.getCell('AC' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AC' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('AD' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AD' + row, 'RI', 10, true, '002060');
            worksheet.getCell('AD' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AD' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('AE' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AE' + row, 'RV', 10, true, '002060');
            worksheet.getCell('AE' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AE' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('AF' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AF' + row, 'RIY', 10, true, '002060');
            worksheet.getCell('AF' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AF' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('AG' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AG' + row, 'RVY', 10, true, '002060');
            worksheet.getCell('AG' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AG' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('AH' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AH' + row, 'PAT_1', 10, true, '002060');
            worksheet.getCell('AH' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AH' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('AI' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AI' + row, 'PAT_1C', 10, true, '002060');
            worksheet.getCell('AI' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AI' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('AJ' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AJ' + row, 'PAT_2', 10, true, '002060');
            worksheet.getCell('AJ' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AJ' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };


            worksheet.getCell('AK' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AK' + row, 'PAT_3', 10, true, '002060');
            worksheet.getCell('AK' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AK' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('AL' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AL' + row, 'PAT_1CS', 10, true, '002060');
            worksheet.getCell('AL' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AL' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
            };

            worksheet.getCell('AM' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AM' + row, 'PAT_2S', 10, true, '002060');
            worksheet.getCell('AM' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AM' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('AN' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AN' + row, 'PAT_3S', 10, true, '002060');
            worksheet.getCell('AN' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AN' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('AO' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AO' + row, 'PAT_1S', 10, true, '002060');
            worksheet.getCell('AO' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AO' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('AP' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AP' + row, 'TIPO_TRANS', 10, true, '00DA50');
            worksheet.getCell('AP' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AP' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('AQ' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AQ' + row, 'CANTIDAD_TRANS', 10, true, '002060');
            worksheet.getCell('AQ' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AQ' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('AR' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AR' + row, 'AP_BT', 10, true, '002060');
            worksheet.getCell('AR' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AR' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('AS' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AS' + row, 'AP_BT_ANGULO', 10, true, '002060');
            worksheet.getCell('AS' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AS' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('AT' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AT' + row, 'AP_MT', 10, true, '002060');
            worksheet.getCell('AT' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AT' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('AU' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AU' + row, 'AP_MT_ANGULO', 10, true, '002060');
            worksheet.getCell('AU' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AU' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('AV' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AV' + row, 'FASES', 10, true, '002060');
            worksheet.getCell('AV' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
            worksheet.getCell('AV' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('AW' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'AW' + row, 'FUNCION_ARMADO', 10, true, 'FFFF00');
            worksheet.getCell('AW' + row).font = { color: { argb: '000000' }, bold: true };
            worksheet.getCell('AW' + row).border = {
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };
            var cont = 0;
            var elementAux = 0;
            datos.forEach(element => {

                if ( elementAux != element.n_idpl_estructura && (cont == 2 || cont == 0)) {
                    elementAux = element.n_idpl_estructura;
                    row += 1;
                    worksheet.getCell('A' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'A' + row, element.c_nombre, 10, false);
                    worksheet.getCell('A' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'B' + row, element.c_nro_se, 10, false);
                    worksheet.getCell('B' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'C' + row, element.c_nro_se, 10, false);
                    worksheet.getCell('C' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'D' + row, element.estructant, 10, false);
                    worksheet.getCell('D' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'E' + row, element.c_codigonodo, 10, false);
                    worksheet.getCell('E' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };
                    if (element.codigoap == 'undefined') {
                        element.codigoap = "";
                    }

                    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'F' + row, element.codigoap, 10, false);
                    worksheet.getCell('F' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    }

                    worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'I' + row, element.c_progresiva, 10, false);
                    worksheet.getCell('I' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'J' + row, element.c_cota, 10, false);
                    worksheet.getCell('J' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    worksheet.getCell('K' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'K' + row, element.c_vertice, 10, false);
                    worksheet.getCell('K' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    worksheet.getCell('L' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'L' + row, element.c_angulo, 10, false);
                    worksheet.getCell('L' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    worksheet.getCell('M' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'M' + row, element.n_cantidadpsta, 10, false);
                    worksheet.getCell('M' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };
                    
                    worksheet.getCell('N' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'N' + row, element.c_tipoterreno, 10, false);
                    worksheet.getCell('N' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    worksheet.getCell('O' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'O' + row, element.n_cantidad, 10, false);
                    worksheet.getCell('O' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    worksheet.getCell('P' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'P' + row, element.c_codigo, 10, false);
                    worksheet.getCell('P' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    worksheet.getCell('Q' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'Q' + row, element.c_longitud, 10, false);
                    worksheet.getCell('Q' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    worksheet.getCell('R' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'R' + row, element.c_latitud, 10, false);
                    worksheet.getCell('R' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    worksheet.getCell('S' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'S' + row, 17, 10, false);
                    worksheet.getCell('S' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    worksheet.getCell('T' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'T' + row, element.c_etiquetacorto, 10, false);
                    worksheet.getCell('T' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    worksheet.getCell('U' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'U' + row, element.n_cantidadpsta, 10, false);
                    worksheet.getCell('U' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    if(element.amortiguador_35 === null){
                        element.amortiguador_35 = 0;
                    }
                    worksheet.getCell('X' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'X' + row, element.amortiguador_35, 10, false);
                    worksheet.getCell('X' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    if(element.amortiguador_70 === null){
                        element.amortiguador_70 = 0;
                    }
                    worksheet.getCell('Y' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'Y' + row, element.amortiguador_70, 10, false);
                    worksheet.getCell('Y' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };                           
                    
                    if(element.ri_a === null){
                        element.ri_a = 0;
                    }
                    worksheet.getCell('Z' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'Z' + row, element.ri_a, 10, false);
                    worksheet.getCell('Z' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };
                    
                    if(element.rv_a === null){
                        element.rv_a = 0;
                    }
                    worksheet.getCell('AA' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AA' + row, element.rv_a, 10, false);
                    worksheet.getCell('AA' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                       

                    if(element.ri_mt === null){
                        element.ri_mt = 0;
                    }
                    worksheet.getCell('AB' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AB' + row, element.ri_mt, 10, false);
                    worksheet.getCell('AB' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };
                    
                    if(element.rv_mt === null){
                        element.rv_mt = 0;
                    }
                    worksheet.getCell('AC' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AC' + row, element.rv_mt, 10, false);
                    worksheet.getCell('AC' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };
                    
                    if(element.ri === null){
                        element.ri = 0;
                    }
                    worksheet.getCell('AD' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AD' + row, element.ri, 10, false);
                    worksheet.getCell('AD' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };
                    
                    if(element.rv === null){
                        element.rv = 0;
                    }
                    worksheet.getCell('AE' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AE' + row, element.rv, 10, false);
                    worksheet.getCell('AE' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };
                    
                    if(element.riy === null){
                        element.riy = 0;
                    }
                    worksheet.getCell('AF' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AF' + row, element.riy, 10, false);
                    worksheet.getCell('AF' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };
                    
                    if(element.rvy === null){
                        element.rvy = 0;
                    }
                    worksheet.getCell('AG' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AG' + row, element.rvy, 10, false);
                    worksheet.getCell('AG' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };
                    
                    if(element.pat_1 === null){
                        element.pat_1 = 0;
                    }
                    worksheet.getCell('AH' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AH' + row, element.pat_1, 10, false);
                    worksheet.getCell('AH' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };
                    
                    if(element.pat_1c === null){
                        element.pat_1c = 0;
                    }
                    worksheet.getCell('AI' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AI' + row, element.pat_1c, 10, false);
                    worksheet.getCell('AI' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };                            
                    
                    if(element.pat_2 === null){
                        element.pat_2 = 0;
                    }
                    worksheet.getCell('AJ' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AJ' + row, element.pat_2, 10, false);
                    worksheet.getCell('AJ' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };
                    
                    if(element.pat_3 === null){
                        element.pat_3 = 0;
                    }
                    worksheet.getCell('AK' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AK' + row, element.pat_3, 10, false);
                    worksheet.getCell('AK' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };
                    
                    if(element.pat_1cs === null){
                        element.pat_1cs = 0;
                    }
                    worksheet.getCell('AL' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AL' + row, element.pat_1cs, 10, false);
                    worksheet.getCell('AL' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };
                    
                    if(element.pat_2s === null){
                        element.pat_2s = 0;
                    }
                    worksheet.getCell('AM' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AM' + row, element.pat_2s, 10, false);
                    worksheet.getCell('AM' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };
                    
                    if(element.pat_3s === null){
                        element.pat_3s = 0;
                    }
                    worksheet.getCell('AN' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AN' + row, element.pat_3s, 10, false);
                    worksheet.getCell('AN' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };
                    
                    if(element.pat_1s === null){
                        element.pat_1s = 0;
                    }
                    worksheet.getCell('AO' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AO' + row, element.pat_1s, 10, false);
                    worksheet.getCell('AO' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    if(element.c_codigott === null){
                        element.c_codigott = '';
                    }

                    worksheet.getCell('AP' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AP' + row, element.c_codigott, 10, false);
                    worksheet.getCell('AP' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    worksheet.getCell('AQ' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AQ' + row, element.n_cantidadea, 10, false);
                    worksheet.getCell('AQ' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    if(element.ap_bt === null){
                        element.ap_bt = 0;
                    }
                    worksheet.getCell('AR' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AR' + row, element.ap_bt, 10, false);
                    worksheet.getCell('AR' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    if(element.n_orientacion === null){
                        element.n_orientacion = 0;
                    }
                    worksheet.getCell('AS' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AS' + row, element.n_orientacion, 10, false);
                    worksheet.getCell('AS' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    if(element.apmt === null){
                        element.apmt = 0;
                    }
                    worksheet.getCell('AT' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AT' + row, element.apmt, 10, false);
                    worksheet.getCell('AT' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    worksheet.getCell('AU' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AU' + row, element.n_orientacion, 10, false);
                    worksheet.getCell('AU' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    worksheet.getCell('AV' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AV' + row, element.n_fases, 10, false);
                    worksheet.getCell('AV' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };

                    worksheet.getCell('AW' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'AW' + row, element.c_funcion, 10, false);
                    worksheet.getCell('AW' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };  
                    
                    cont=1;
                }else if(cont == 1 && elementAux == element.n_idpl_estructura){
                    
                    if (element.c_codigoas == 'undefined') {
                        element.c_codigoas = "";
                    }
                    worksheet.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'G' + row, element.c_codigoas, 10, false);
                    worksheet.getCell('G' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };
                    cont = 2;
                    elementAux = element.n_idpl_estructura;
                }else if(cont == 2 && elementAux == element.n_idpl_estructura){
                    
                    if (element.c_codigoarsse == 'undefined') {
                        element.c_codigoarsse = "";
                    }
                    worksheet.getCell('H' + row).alignment = { vertical: 'middle', horizontal: 'center' };
                    this.setdatogeneral(worksheet, 'H' + row, element.c_codigoarsse, 10, false);
                    worksheet.getCell('H' + row).border = {
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                        bottom: { style: 'thin' },
                    };
                    cont = 0;
                    elementAux = element.n_idpl_estructura;
                }
                
            });
            worksheet.autoFilter = 'A1:AW1';

            worksheet.getColumn(1).width = 50;
            worksheet.getColumn(2).width = 15;
            worksheet.getColumn(3).width = 15;
            worksheet.getColumn(4).width = 23;
            worksheet.getColumn(5).width = 18;
            worksheet.getColumn(6).width = 18;
            worksheet.getColumn(7).width = 18;
            worksheet.getColumn(8).width = 20;
            worksheet.getColumn(9).width = 20;
            worksheet.getColumn(10).width = 20;

            worksheet.getColumn(12).width = 15;
            worksheet.getColumn(13).width = 15;
            worksheet.getColumn(14).width = 20;
            worksheet.getColumn(15).width = 20;
            worksheet.getColumn(16).width = 20;
            worksheet.getColumn(17).width = 20;
            worksheet.getColumn(18).width = 20;
            
            worksheet.getColumn(19).width = 23;
            worksheet.getColumn(20).width = 25;
            worksheet.getColumn(21).width = 25;
            worksheet.getColumn(22).width = 25;
            worksheet.getColumn(23).width = 25;
            worksheet.getColumn(24).width = 18;

            worksheet.getColumn(41).width = 20;
            worksheet.getColumn(42).width = 25;
            worksheet.getColumn(43).width = 25;
            worksheet.getColumn(44).width = 25;
            worksheet.getColumn(45).width = 25;
            worksheet.getColumn(46).width = 20;
            worksheet.getColumn(47).width = 25;
            worksheet.getColumn(49).width = 25;         

            worksheet.getRow(1).height = 30;
            //worksheet.getRow(2).height = 20;

            //worksheet.mergeCells(`B1:I1`);        
            // Generate Excel File with given name
            workbook.xlsx.writeBuffer().then((data: any) => {
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, this.nomL +'-'+ this.nomZ + '.xlsx');
            this.procesando = false;
            });
        }, error => {
            this.openSnackBar(<any>error, 99);
        });
    }else{
        this.openSnackBar("Seleccione una versión", 200);
    }
    
  }

}

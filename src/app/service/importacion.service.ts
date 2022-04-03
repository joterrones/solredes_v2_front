import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from '../common/appsettings';
import { environment } from 'src/environments/environment';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as fs from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable()
export class ImportacionService {
    request: Request;
    public url: String;
    public credentials: any;
    public basic: any;
    public urlmetodo: String;


    constructor(public _http: HttpClient) {
        this.url =  environment.url;
    }

    insertplanilla(request): Observable<any> {
        return this._http.post(this.url + 'importacion/insertplanilla', request);
    }

    creargeom(): Observable<any> {
        let req = {};
        return this._http.post(this.url + 'importacion/creargeom',req);
    }

    orientacionautomatica(req): Observable<any> {
        return this._http.post(this.url + 'importacion/orientacionautomatica',req);
    }
    
    
    insertplanillaacometida(request, proyecto): Observable<any> {
        request.proyecto = proyecto;
        return this._http.post(this.url + 'importacion/insertplanillaacometida', request);
    }

    insertlinea(request): Observable<any> {
        return this._http.post(this.url + 'importacion/insertlinea', request);
    }

    insertSuministro(request): Observable<any> {
        return this._http.post(this.url + 'importacion/insertSuministro', request);
    }

    insertMontaje(request): Observable<any> {
        return this._http.post(this.url + 'importacion/insertMontaje', request);
    }

    deleteEstructLinea(request): Observable<any> {
        console.log(request);        
        return this._http.post(this.url + 'importacion/deleteEstructLinea', request);
    }

    deleteAllEstructLinea(request): Observable<any> {
        return this._http.post(this.url + 'importacion/deleteAllEstructLinea', request);
    }

    downloadPlantillaSuministro():Observable<any>{
        return this._http.get(this.url+'importacion/downloadPlantillaSuministro',{responseType:'blob'});
    }  
    downloadPlantillaMontaje():Observable<any>{
        return this._http.get(this.url+'importacion/downloadPlantillaMontaje',{responseType:'blob'});
    }
    
    gettipolinea(token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'importacion/gettipolinea', { headers: reqHeader });
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

    downloadPlantillaLinea(dataZona: any[], dataTipoLi: any[],excelFileName: string): void{        

        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('P. Linea');

        let row = 1;

        worksheet.getCell('A' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'A' + row, 'NOMBRE_LINEA', 10, true, '002060');
        worksheet.getCell('A' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
        

        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, 'CODIGO_LINEA', 10, true, '002060');
        worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
        worksheet.getCell('B' + row).border = {
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'C' + row, 'TIPO_LINEA', 10, true, '002060');
        worksheet.getCell('C' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
        worksheet.getCell('C' + row).border = {
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, 'ZONA', 10, true, '002060');
        worksheet.getCell('D' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
        worksheet.getCell('D' + row).border = {
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'J' + row, 'ZONAS', 10, true, '002060');
        worksheet.getCell('J' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
        worksheet.getCell('J' + row).border = {
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'I' + row, 'TIPO DE LINEA', 10, true, '002060');
        worksheet.getCell('I' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
        worksheet.getCell('I' + row).border = {
            right: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
        };
        

        dataTipoLi.forEach(element => {
            row += 1;
            worksheet.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'I' + row, element.c_nombretl, 10, false);
            worksheet.getCell('I' + row).border = {
                left: { style: 'thin' },
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };
        });

        row = 1;
        dataZona.forEach(element => {
            row += 1;
            worksheet.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'J' + row, element.c_nombre, 10, false);
            worksheet.getCell('J' + row).border = {
                left: { style: 'thin' },
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };
        });

        worksheet.getColumn(1).width = 50;
        worksheet.getColumn(2).width = 20;
        worksheet.getColumn(3).width = 20;
        worksheet.getColumn(4).width = 20;
        worksheet.getColumn(9).width = 20;
        worksheet.getColumn(10).width = 20;

        worksheet.getRow(1).height = 30;
        //worksheet.getRow(2).height = 20;

        //worksheet.mergeCells(`B1:I1`);

        // Generate Excel File with given name
        workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, excelFileName + '.xlsx');
        });
    } 

    saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

    downloadPlantillaRedes():Observable<any>{
        return this._http.get(this.url+'importacion/downloadPlantillaRedes',{responseType:'blob'});
    } 

    downloadPlantillaRedes2(dataZona: any[], dataTipoLi: any[], dataLinea: any[]){

        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Hoja1');

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
        this.setdatogeneral(worksheet, 'S' + row, 'ZONA_UTM', 10, true, '002060');
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
        this.setdatogeneral(worksheet, 'Y' + row, 'CANTIDAD_CONDUCTOR', 10, true, '002060');
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

        worksheet.getCell('AY' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'AY' + row, 'SECTOR', 10, true, '002060');
        worksheet.getCell('AY' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
        worksheet.getCell('AY' + row).border = {
            right: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
        };

        worksheet.getCell('AZ' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'AZ' + row, 'CÓDIGO', 10, true, '002060');
        worksheet.getCell('AZ' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
        worksheet.getCell('AZ' + row).border = {
            right: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
        };

        worksheet.getCell('BA' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'BA' + row, 'LINEAS', 10, true, '002060');
        worksheet.getCell('BA' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
        worksheet.getCell('BA' + row).border = {
            right: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
        };

        worksheet.getCell('BB' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'BB' + row, 'TIPO DE LINEAS', 10, true, '002060');
        worksheet.getCell('BB' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
        worksheet.getCell('BB' + row).border = {
            right: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
        };

        worksheet.getCell('BC' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'BC' + row, 'ZONAS', 10, true, '002060');
        worksheet.getCell('BC' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
        worksheet.getCell('BC' + row).border = {
            right: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
        };        

        dataLinea.forEach(element => {
            row += 1;

            worksheet.getCell('AY' + row).alignment = { vertical: 'middle', horizontal: 'left' };
            this.setdatogeneral(worksheet, 'AY' + row, element.c_nombrez, 10, false);
            worksheet.getCell('AY' + row).border = {
                left: { style: 'thin' },
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('AZ' + row).alignment = { vertical: 'middle', horizontal: 'left' };
            this.setdatogeneral(worksheet, 'AZ' + row, element.c_codigo, 10, false);
            worksheet.getCell('AZ' + row).border = {
                left: { style: 'thin' },
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };

            worksheet.getCell('BA' + row).alignment = { vertical: 'middle', horizontal: 'left' };
            this.setdatogeneral(worksheet, 'BA' + row, element.c_nombre, 10, false);
            worksheet.getCell('BA' + row).border = {
                left: { style: 'thin' },
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };
        });

        row = 1;
        dataTipoLi.forEach(element => {
            row += 1;
            worksheet.getCell('BB' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'BB' + row, element.c_nombretl, 10, false);
            worksheet.getCell('BB' + row).border = {
                left: { style: 'thin' },
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };
        });
        row = 1;
        dataZona.forEach(element => {
            row += 1;
            worksheet.getCell('BC' + row).alignment = { vertical: 'middle', horizontal: 'center' };
            this.setdatogeneral(worksheet, 'BC' + row, element.c_nombre, 10, false);
            worksheet.getCell('BC' + row).border = {
                left: { style: 'thin' },
                right: { style: 'thin' },
                bottom: { style: 'thin' },
            };
        });

        worksheet.autoFilter = 'AZ1:BC1';

        worksheet.getColumn(1).width = 50;
        worksheet.getColumn(2).width = 15;
        worksheet.getColumn(3).width = 15;
        worksheet.getColumn(4).width = 23;
        worksheet.getColumn(5).width = 18;
        worksheet.getColumn(6).width = 18;
        worksheet.getColumn(7).width = 18;
        worksheet.getColumn(8).width = 20;
        worksheet.getColumn(9).width = 20;
        worksheet.getColumn(10).width = 15;

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
        worksheet.getColumn(23).width = 18;
        worksheet.getColumn(24).width = 18;

        worksheet.getColumn(41).width = 20;
        worksheet.getColumn(42).width = 25;
        worksheet.getColumn(44).width = 25;
        worksheet.getColumn(46).width = 20;
        worksheet.getColumn(49).width = 25;         

        worksheet.getColumn(52).width = 20; 
        worksheet.getColumn(53).width = 55; 
        worksheet.getColumn(54).width = 25; 
        worksheet.getColumn(55).width = 20; 

        worksheet.getRow(1).height = 30;
        //worksheet.getRow(2).height = 20;

        //worksheet.mergeCells(`B1:I1`);        
        // Generate Excel File with given name
        workbook.xlsx.writeBuffer().then((data: any) => {
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, 'Plantilla_Redes.xlsx');
            
        });
    }

}
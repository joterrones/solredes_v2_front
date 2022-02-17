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


}
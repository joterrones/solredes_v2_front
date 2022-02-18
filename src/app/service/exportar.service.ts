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
export class ExportarService {
    request: Request;
    public url: String;
    public credentials: any;
    public basic: any;
    public urlmetodo: String;


    constructor(public _http: HttpClient) {
        this.url =  environment.url;
    }

    exportar(request, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'exportar/exportar', request, { headers: reqHeader } );
    }

    exportarExcelPlanilla( datos: any[]):void{
        console.log(datos);

    }

}
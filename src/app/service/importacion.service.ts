import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from '../common/appsettings';

@Injectable()
export class ImportacionService {
    request: Request;
    public url: String;
    public credentials: any;
    public basic: any;
    public urlmetodo: String;


    constructor(public _http: HttpClient) {
        this.url = AppSettings.URL;
    }

    insertplanilla(request): Observable<any> {
        return this._http.post(this.url + 'importacion/insertplanilla', request);
    }

    insertplanillaacometida(request, proyecto): Observable<any> {
        request.proyecto = proyecto;
        return this._http.post(this.url + 'importacion/insertplanillaacometida', request);
    }

}
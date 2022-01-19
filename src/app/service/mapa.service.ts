import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from '../common/appsettings';

@Injectable()
export class MapaService {

    public url: String;
    public credentials: any;
    public basic: any;

    constructor(public _http: HttpClient) {
        this.url = AppSettings.URL;
    }

    get(req): Observable<any> {
        return this._http.post(this.url + 'mapa/get', req);
    }

    getlineas(req): Observable<any> {
        return this._http.post(this.url + 'mapa/getlineas', req);
    }

    getdetalle(req): Observable<any> {
        return this._http.post(this.url + 'mapa/getdetalle', req);
    }
}
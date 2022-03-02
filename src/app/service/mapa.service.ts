import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from '../common/appsettings';
import { environment } from 'src/environments/environment';

@Injectable()
export class MapaService {

    public url: String;
    public credentials: any;
    public basic: any;

    constructor(public _http: HttpClient) {
        this.url = environment.url;
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

    getestructura(req): Observable<any> {
        return this._http.post(this.url + 'mapa/getestructura', req);
    }

    buscarLinea(req): Observable<any> {
        return this._http.post(this.url + 'mapa/buscarLinea', req);
    }

    insertOrientacion(req): Observable<any> {
        return this._http.post(this.url + 'mapa/insertOrientacion', req);
    }

    buscarEstruct(req, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'mapa/buscarEstruct', req, { headers: reqHeader });
    }
    
}
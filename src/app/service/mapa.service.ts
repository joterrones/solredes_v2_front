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

    getZona(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node zona')
        console.log(data)
        return this._http.post(this.url + 'mapa/getZona', data, { headers: reqHeader });
    }

    gettipolinea(token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'mapa/gettipolinea', { headers: reqHeader });
    }

    getLinea(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node linea')
        console.log(data)
        return this._http.post(this.url + 'mapa/getLinea', data, { headers: reqHeader });
    }

    getLineaFiltro(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node linea')
        console.log(data)
        return this._http.post(this.url + 'mapa/getLineaFiltro', data, { headers: reqHeader });
    }


    getestructura2(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node linea')
        console.log(data)
        return this._http.post(this.url + 'mapa/getestructura2', data, { headers: reqHeader });
    }
    
}
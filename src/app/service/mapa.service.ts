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

    getdetalleMon(req): Observable<any> {
        return this._http.post(this.url + 'mapa/getdetallemon', req);
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

    getDataClick(req): Observable<any>{
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        console.log(req);
        return this._http.get(req,{ headers: reqHeader });
    }

    getMonInspeccion(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'mapa/getMonInspeccion', data, { headers: reqHeader });
    }

    getLineasMon( req, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'mapa/getLineasMon', req,{ headers: reqHeader });
    }

    getinspeccionxls(token, request): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'mapa/getinspeccionxls',request, { headers: reqHeader });
    }

    getUsers(req,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log(req);
        
        return this._http.post(this.url + 'mapa/getUsers', req, { headers: reqHeader });
    }


    getTipoLineaMon(req, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });       
        return this._http.post(this.url + 'mapa/getTipoLineaMon', req, { headers: reqHeader });
    }

    getZonaMon(req, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'mapa/getZonaMon', req, { headers: reqHeader });
    }

    saveMon(req, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'mapa/saveMon', req, { headers: reqHeader });
    }

    getObservaciones(req, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'mapa/getObservaciones', req, { headers: reqHeader });
    }

    saveObservacion(req, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'mapa/saveObservacion', req, { headers: reqHeader });
    }

    saveGenObservacion(req, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'mapa/saveGenObservacion', req, { headers: reqHeader });
    }
    
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from '../common/appsettings';

@Injectable()
export class BolsaProyectoService {

    public url: String;
    public credentials: any;
    public basic: any;

    constructor(public _http: HttpClient) {
        this.url = AppSettings.URL;
    }

    get(rq, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'bolsaproyecto/get', rq, { headers: reqHeader });
    }

    save(rq): Observable<any> {
        return this._http.post(this.url + 'bolsaproyecto/save', rq);
    }

    crearproyecto(rq): Observable<any> {
        return this._http.post(this.url + 'bolsaproyecto/crearproyecto', rq);
    }

    getdetalle(rq, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'bolsaproyecto/getdetalle', rq, { headers: reqHeader });
    }

    savedetalle(rq, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'bolsaproyecto/savedetalle', rq, { headers: reqHeader });
    }

    deletedetalle(rq, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'bolsaproyecto/deletedetalle', rq, { headers: reqHeader });
    }

    get_exportbolsadetalle(req): Observable<any> {
        return this._http.post(this.url + 'bolsaproyecto/get_exportbolsadetalle', req);
    }

    getannio(rq, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'bolsaproyecto/getannioprogramacion', rq, { headers: reqHeader });
    }

    delete(rq, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'bolsaproyecto/deletebolsa', rq, { headers: reqHeader });
    }

    getubigeobolsa(rq, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'bolsaproyecto/getubigeobolsa', rq, { headers: reqHeader });
    }

    saveubigeobolsa(rq, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'bolsaproyecto/saveubigeobolsa', rq, { headers: reqHeader });
    }

    getdepartamento(rq, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'bolsaproyecto/getdepartamento', rq, { headers: reqHeader });
    }

    getprovincia(rq, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'bolsaproyecto/getprovincia', rq, { headers: reqHeader });
    }

    getdistrito(rq, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'bolsaproyecto/getdistrito', rq, { headers: reqHeader });
    }

    getUbigeoBolsaProyecto(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'bolsaproyecto/getubigeobolsaproyecto', rq, { headers: reqHeader });
    }
}
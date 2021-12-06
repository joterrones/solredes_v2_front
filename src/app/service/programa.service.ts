import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from '../common/appsettings';

@Injectable()
export class ProgramaService {

    public url: String;
    public credentials: any;
    public basic: any;

    constructor(public _http: HttpClient) {
        this.url = AppSettings.URL;
    }

    getversion(rq): Observable<any> {
        return this._http.post(this.url + 'programa/getversion', rq);
    }

    saveprograma(rq): Observable<any> {
        return this._http.post(this.url + 'programa/saveprograma', rq);
    }

    deleteprograma(rq): Observable<any> {
        return this._http.post(this.url + 'programa/deleteprograma', rq);
    }
    

    getprograma(rq): Observable<any> {
        return this._http.post(this.url + 'programa/getprograma', rq);
    }
  
    save(rq): Observable<any> {
        return this._http.post(this.url + 'programa/save', rq);
    }

    copiar(rq): Observable<any> {
        return this._http.post(this.url + 'programa/copiar', rq);
    }
    
    
    deleteversion(rq): Observable<any> {
        return this._http.post(this.url + 'programa/deleteversion', rq);
    }
    
 
    crearproyecto(rq): Observable<any> {
        return this._http.post(this.url + 'programa/crearproyecto', rq);
    }
    
}
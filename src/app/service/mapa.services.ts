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

    get(req,token): Observable<any> {
        return this._http.post(this.url + 'mapa/get', req);
    }

    getxls(req,token): Observable<any> {
        return this._http.post(this.url + 'mapa/getxls', req);
    }

    
    getfiles(req,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'mapa/getfiles', req, { headers: reqHeader });
    }
    get_proyecto_atributo(req,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'mapa/get_proyecto_atributo', req, { headers: reqHeader });
    }
    gettareasincompletas(req,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'mapa/gettareasincompletas', req, { headers: reqHeader });
    }

    download(nombre):Observable<any>{
        return this._http.get(this.url+'mapa/download?nombre='+nombre,{responseType:'blob'});
    }  

}
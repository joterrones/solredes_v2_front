    import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from '../common/appsettings';

@Injectable()
export class GeneralService {

    public url: String;
    public credentials: any;
    public basic: any;


    constructor(public _http: HttpClient) {
        this.url = AppSettings.URL;
    }

    get(token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'general/get', {}, { headers: reqHeader });
    }


    save(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log(data)
        return this._http.post(this.url + 'general/save', data, { headers: reqHeader });
    }

    get_feriado(token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'general/get_feriado', {}, { headers: reqHeader });
    }


    save_feriado(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log(data)
        return this._http.post(this.url + 'general/save_feriado', data, { headers: reqHeader });
    }

    getdepartamento(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log(data)
        return this._http.post(this.url + 'general/getdepartamento', data, { headers: reqHeader });
    }
    getprovincia(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log(data)
        return this._http.post(this.url + 'general/getprovincia', data, { headers: reqHeader });
    }
    getdistrito(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log(data)
        return this._http.post(this.url + 'general/getdistrito', data, { headers: reqHeader });
    }
    getcentropoblado(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log(data)
        return this._http.post(this.url + 'general/getcentropoblado', data, { headers: reqHeader });
    }

}
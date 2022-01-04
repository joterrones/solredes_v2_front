import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from '../common/appsettings';

@Injectable()
export class SeguridadService {

    public url: String;
    public credentials: any;
    public basic: any;


    constructor(public _http: HttpClient) {
        this.url = AppSettings.URL;
    }

    login(dataLogin): Observable<any> {
        let json = JSON.stringify(dataLogin);
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        reqHeader.append('Accept', 'application/json');
        reqHeader.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
        reqHeader.append('Access-Control-Allow-Origin', '*');
        reqHeader.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
        return this._http.post(this.url + 'seguridad/login', dataLogin, { headers: reqHeader });
    }

    get(request,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log(request)
        return this._http.post(this.url + 'seguridad/get', request, { headers: reqHeader });
    }

    getrole(request,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'seguridad/getrole', request, { headers: reqHeader });
    }
    
    

    resetarclave(data, token): Observable<any> {
        console.log("Reseteando")
        console.log(data);
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'seguridad/resetearclave', data, { headers: reqHeader });
    }

    save(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log(data)
        return this._http.post(this.url + 'seguridad/save', data, { headers: reqHeader });
    }

    saveRol(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log(data)
        return this._http.post(this.url + 'seguridad/saveRol', data, { headers: reqHeader });
    }

    

    delete(data): Observable<any> {
        console.log(data)
        return this._http.post(this.url + 'seguridad/delete_usuario', data);
    }

    deleteRol(data): Observable<any> {
        console.log(data)
        return this._http.post(this.url + 'seguridad/deleteRol', data);
    }

    getProyectos(token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'seguridad/getProyectos', { headers: reqHeader });
    }

    getUserPro(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'seguridad/getUserPro', data, { headers: reqHeader });
    }

    saveUserPro(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log(data)
        return this._http.post(this.url + 'seguridad/saveUserPro', data, { headers: reqHeader });
    }

    resetUserPro(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'seguridad/resetUserPro', data, { headers: reqHeader });
    }

}
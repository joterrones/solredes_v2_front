import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from '../common/appsettings';
import { environment } from 'src/environments/environment';

@Injectable()
export class TareaService {

    public url: String;
    public credentials: any;
    public basic: any;


    constructor(public _http: HttpClient) {
        this.url =  environment.url;
    }

    get(req,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'tarea/get', req, { headers: reqHeader });
    }

    
    get_tarea(req,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'tarea/get_tarea', req, { headers: reqHeader });
    }

    get_fase(token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token  
        });
        return this._http.post(this.url + 'tarea/get_fase', {}, { headers: reqHeader });
    }

    get_actividad(req,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'tarea/get_actividad', req, { headers: reqHeader });
    }

    get_datoadicional(req,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'tarea/get_datoadicional',req, { headers: reqHeader });
    }
    

    save_tipoproyecto_tarea(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'tarea/save_tipoproyecto_tarea', rq, { headers: reqHeader });
    }

    save_fase(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'tarea/save_fase', rq, { headers: reqHeader });
    }

    
    save_actividad(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'tarea/save_actividad', rq, { headers: reqHeader });
    }

    save_tarea(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'tarea/save_tarea', rq, { headers: reqHeader });
    }

    save_datoadicional_tarea(rq,token): Observable<any> {
        console.log("Pueba add dato adicional")
        console.log(rq)
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'tarea/save_datoadicional_tarea', rq, { headers: reqHeader });
    }
    

    
    delete_tarea(rq,token): Observable<any> {

        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'tarea/delete_tarea', rq, { headers: reqHeader });
    }
    delete_fase(rq,token): Observable<any> {

        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'tarea/delete_fase', rq, { headers: reqHeader });
    }

    delete_actividad(rq,token): Observable<any> {

        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'tarea/delete_actividad', rq, { headers: reqHeader });
    }


    
}
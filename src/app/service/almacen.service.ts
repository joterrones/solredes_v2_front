import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from '../common/appsettings';

@Injectable()
export class AlmacenService{

    public url: String;
    public credentials: any;
    public basic: any;


    constructor(public _http: HttpClient) {
        this.url = AppSettings.URL;
    }

    getAlmacen(data,token): Observable<any> {
        
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });        
        return this._http.post(this.url + 'almacen/getAlmacen',data, { headers: reqHeader });
    }
    

    getProyecto(data,token): Observable<any> {
        
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });        
        return this._http.post(this.url + 'almacen/getProyecto',data, { headers: reqHeader });
    }


    saveAlmacen(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node')
        console.log(data)
        return this._http.post(this.url + 'almacen/saveAlmacen', data, { headers: reqHeader });
    }

    deleteAlmacen(data): Observable<any> {
        console.log(data)
        console.log('borrando')
        return this._http.post(this.url + 'almacen/deleteAlmacen', data);
    }

    getGuia(data,token): Observable<any> {
        
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });        
        console.log("datos de guia a node")
        console.log(data)
        return this._http.post(this.url + 'almacen/getGuia',data, { headers: reqHeader });
    }

    getAlmacenes(data,token): Observable<any> {
        
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });        
        return this._http.post(this.url + 'almacen/getAlmacenes',data, { headers: reqHeader });
    }

    getPeriodos(data,token): Observable<any> {
        
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });        
        return this._http.post(this.url + 'almacen/getPeriodos',data, { headers: reqHeader });
    }

    saveGuia(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node')
        console.log(data)
        return this._http.post(this.url + 'almacen/saveGuia', data, { headers: reqHeader });
    }

    deleteGuia(data): Observable<any> {
        console.log(data)
        console.log('borrando')
        return this._http.post(this.url + 'almacen/deleteGuia', data);
    }
    
    getGuias(data,token): Observable<any> {
        
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });        
        return this._http.post(this.url + 'almacen/getGuias',data, { headers: reqHeader });
    }

    getElementos(data,token): Observable<any> {
        
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });        
        return this._http.post(this.url + 'almacen/getElementos',data, { headers: reqHeader });
    }

    getDetalleGuia(data,token): Observable<any> {
        
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });        
        console.log("datos de guia a node")
        console.log(data)
        return this._http.post(this.url + 'almacen/getDetalleGuia',data, { headers: reqHeader });
    }

    saveDetalleGuia(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node')
        console.log(data)
        return this._http.post(this.url + 'almacen/saveDetalleGuia', data, { headers: reqHeader });
    }
    

}
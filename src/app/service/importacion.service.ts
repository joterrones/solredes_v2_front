import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from '../common/appsettings';

@Injectable()
export class ImportacionService {
    request: Request;
    public url: String;
    public credentials: any;
    public basic: any;
    public urlmetodo: String;


    constructor(public _http: HttpClient) {
        this.url = AppSettings.URL;
    }

    insertplanilla(request): Observable<any> {
        return this._http.post(this.url + 'importacion/insertplanilla', request);
    }

    creargeom(): Observable<any> {
        let req = {};
        return this._http.post(this.url + 'importacion/creargeom',req);
    }
    
    insertplanillaacometida(request, proyecto): Observable<any> {
        request.proyecto = proyecto;
        return this._http.post(this.url + 'importacion/insertplanillaacometida', request);
    }

    insertlinea(request): Observable<any> {
        return this._http.post(this.url + 'importacion/insertlinea', request);
    }

    insertSuministro(request): Observable<any> {
        return this._http.post(this.url + 'importacion/insertSuministro', request);
    }

    insertMontaje(request): Observable<any> {
        return this._http.post(this.url + 'importacion/insertMontaje', request);
    }

    deleteEstructLinea(request): Observable<any> {
        console.log(request);        
        return this._http.post(this.url + 'importacion/deleteEstructLinea', request);
    }

    deleteAllEstructLinea(request): Observable<any> {
        return this._http.post(this.url + 'importacion/deleteAllEstructLinea', request);
    }

    downloadPlantillaSuministro():Observable<any>{
        return this._http.get(this.url+'importacion/downloadPlantillaSuministro',{responseType:'blob'});
    }  
    downloadPlantillaMontaje():Observable<any>{
        return this._http.get(this.url+'importacion/downloadPlantillaMontaje',{responseType:'blob'});
    }  
    downloadPlantillaLinea():Observable<any>{
        return this._http.get(this.url+'importacion/downloadPlantillaLinea',{responseType:'blob'});
    } 
    downloadPlantillaRedes():Observable<any>{
        return this._http.get(this.url+'importacion/downloadPlantillaRedes',{responseType:'blob'});
    }  


}
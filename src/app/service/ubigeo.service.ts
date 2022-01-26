import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from '../common/appsettings';
import { environment } from 'src/environments/environment';

@Injectable()
export class UbigeoService {

    public url: String;
    public credentials: any;
    public basic: any;


    constructor(public _http: HttpClient) {
        this.url =  environment.url;
    }

    get_ubigeoproyecto(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'ubigeo/get_ubigeoproyecto', rq, { headers: reqHeader });
    }

    get_ubigeobolsaproyecto(rq): Observable<any> {
        return this._http.post(this.url + 'ubigeo/get_ubigeobolsaproyecto', rq);
    }

    
    save_bolsaproyectoubicacion(rq): Observable<any> {
        return this._http.post(this.url + 'ubigeo/save_bolsaproyectoubicacion', rq);
    } 
    
    get_ubigeoproyecto_fase(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'ubigeo/get_ubigeoproyecto_fase', rq, { headers: reqHeader });
    }
    

    get_departamento(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'ubigeo/get_departamento', rq, { headers: reqHeader });
    }
    get_provincia(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'ubigeo/get_provincia', rq, { headers: reqHeader });
    }
    get_distrito(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'ubigeo/get_distrito', rq, { headers: reqHeader });
    }

    get_centropoblado(rq): Observable<any> {
        return this._http.post(this.url + 'ubigeo/get_centropoblado', rq);
    }
    

    save_proyectoubicacion(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'ubigeo/save_proyectoubicacion', rq, { headers: reqHeader });
    }   
    save_proyectoubicacion_import(rq): Observable<any> {
  
        return this._http.post(this.url + 'ubigeo/save_proyectoubicacion_import',rq);
    }   
    


   /* save(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log(data)
        return this._http.post(this.url + 'general/save', data, { headers: reqHeader });
    }*/

}
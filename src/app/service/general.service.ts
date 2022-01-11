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

    get(proyecto):Observable<any>{
        let request={proyecto:proyecto};
        return this._http.post(this.url+'general/get',request);
    }
    getzona(proyecto):Observable<any>{
        let request={proyecto:proyecto};
        return this._http.post(this.url+'general/getzona',request);
    }
    gettipolinea(proyecto):Observable<any>{
        let request={proyecto:proyecto};
        return this._http.post(this.url+'general/gettipolinea',request);
    }
    getlinea(request,proyecto):Observable<any>{
        request.proyecto=proyecto;
        return this._http.post(this.url+'general/getlinea',request);
    }
}
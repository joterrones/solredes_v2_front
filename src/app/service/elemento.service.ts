import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from '../common/appsettings';

@Injectable()
export class ElementoService{
    request:Request;
    public url: String;
    public credentials: any;
    public basic: any;


    constructor(public _http: HttpClient) {
        this.url = AppSettings.URL;
    }
        get(proyecto):Observable<any>{
            let request={proyecto:proyecto};
            console.log(request);
            
            return this._http.post(this.url+'elemento/get',request);
        }

        updateconfig(request,proyecto):Observable<any>{
            request.proyecto=proyecto;
            console.log(request);
            
            return this._http.post(this.url+'elemento/updateconfig',request);
        }
      
}
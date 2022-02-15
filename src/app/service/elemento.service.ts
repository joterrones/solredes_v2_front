import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from '../common/appsettings';
import { environment } from 'src/environments/environment';

@Injectable()
export class ElementoService{
    request:Request;
    public url: String;
    public credentials: any;
    public basic: any;


    constructor(public _http: HttpClient) {
        this.url =  environment.url;
    }
        get(request,proyecto):Observable<any>{
            
            console.log(request);
            
            return this._http.post(this.url+'elemento/get',request);
        }

        updateconfig(request,proyecto):Observable<any>{
            request.proyecto=proyecto;
            console.log(request);
            
            return this._http.post(this.url+'elemento/updateconfig',request);
        }

        getTipoElemento(request, proyecto):Observable<any>{            
            console.log(request);            
            return this._http.post(this.url+'elemento/getTipoElemento',request);
        }
      
}
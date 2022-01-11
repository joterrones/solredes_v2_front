import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import {AppSettings} from '../common/appsettings';

@Injectable()
export class MetradoService{
    request:Request;
    public url:String;
    public credentials:any;
    public basic:any;
    public urlmetodo:String;

    constructor(public _http:HttpClient){
            this.url=AppSettings.URL;
        }
        get(request,proyecto):Observable<any>{
            request.proyecto=proyecto;
            return this._http.post(this.url+'metrado/get',request);
        }
     
        gettipolinea(proyecto):Observable<any>{
            let request={proyecto:proyecto};
            return this._http.post(this.url+'metrado/gettipolinea',null);
        }
        getestructurametrado(request,proyecto):Observable<any>{
            request.proyecto=proyecto;
            return this._http.post(this.url+'metrado/getestructurametrado',request);
        }
      
}

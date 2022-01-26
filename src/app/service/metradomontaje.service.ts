import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import {AppSettings} from '../common/appsettings';
import { environment } from 'src/environments/environment';

@Injectable()
export class MetradoMontajeService{
    request:Request;
    public url:String;
    public credentials:any;
    public basic:any;
    public urlmetodo:String;

    constructor(public _http:HttpClient){
            this.url= environment.url;;
        }
      
        getmontaje(request,proyecto):Observable<any>{
            request.proyecto=proyecto;
            return this._http.post(this.url+'metrado/getmontaje',request);
        }
     
}

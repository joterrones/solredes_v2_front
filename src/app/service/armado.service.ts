import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import {AppSettings} from '../common/appsettings';
import { environment } from 'src/environments/environment';

@Injectable()
export class ArmadoService{
    request:Request;
    public url:String;
    public credentials:any;
    public basic:any;
    public urlmetodo:String;


    constructor(public _http:HttpClient){
            this.url= environment.url;
        }
        gettipoarmado(proyecto):Observable<any>{
            let request={proyecto:proyecto};
            return this._http.post(this.url+'armado/gettipoarmado',request);
        }
        get(request,proyecto):Observable<any>{
            request.proyecto=proyecto;
            return this._http.post(this.url+'armado/get',request,request);
        }
        getversion(proyecto):Observable<any>{
            let request={proyecto:proyecto};
            return this._http.post(this.url+'armado/getversion',request);
        }
        getconfigtipomontaje(request,proyecto):Observable<any>{
            request.proyecto=proyecto;
            return this._http.post(this.url+'armado/getconfigtipomontaje',request);
        }
        insert(request,proyecto):Observable<any>{
            request.proyecto=proyecto;
            console.log(request);            
            return this._http.post(this.url+'armado/insert',request);
        }
        
        deleteArmado(request): Observable<any> {
            console.log(request)
            console.log('borrando')
            return this._http.post(this.url + 'armado/deleteArmado', request);
        }

        getconfigarmado(request,proyecto):Observable<any>{
            request.proyecto=proyecto;
            return this._http.post(this.url+'armado/getconfigarmado',request);
        }
        insertconfigarmado(request,proyecto):Observable<any>{
            request.proyecto=proyecto;
            return this._http.post(this.url+'armado/insertconfigarmado',request);
        }
        insertarmadoconfigmontaje(request,proyecto):Observable<any>{
            request.proyecto=proyecto;
            return this._http.post(this.url+'armado/insertarmadoconfigmontaje',request);
        }
        
}
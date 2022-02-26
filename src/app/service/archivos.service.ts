import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from '../common/appsettings';
import { environment } from 'src/environments/environment';

@Injectable()

export class ArchivosServices{
    public url: String;
    public credentials: any;
    public basic: any;


    constructor(public _http: HttpClient) {
        this.url =  environment.url;
    }

    getArchivo(data,token): Observable<any> {
        console.log("enviando ....."+data)
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });        
        return this._http.post(this.url + 'AdmArchivos/getArchivo', data, { headers: reqHeader });
    }

    saveArchivo(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node archivo....')
        console.log(data)
        return this._http.post(this.url + 'AdmArchivos/saveArchivo', data, { headers: reqHeader });
    }

    deleteArchivo(data): Observable<any> {
        console.log('borrando archivo...')
        console.log(data)        
        return this._http.post(this.url + 'AdmArchivos/deleteArchivo', data);
    }

    
    uploadfile(extension,archivo,fileToUpload,token):Observable<any>{
            
        const formData: FormData = new FormData();
        formData.append('DA', fileToUpload, fileToUpload.name);
        return this._http.post(this.url+'AdmArchivos/uploadfile?extension='+extension+'&archivo='+archivo,formData);
    }


    downloadArchivo(c_ruta):Observable<any>{
        return this._http.get(this.url+'AdmArchivos/downloadArchivo?c_ruta='+c_ruta,{responseType:'blob'});
    }  

    getCarpetas(request,token): Observable<any> {        
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });        
        return this._http.post(this.url + 'AdmArchivos/getCarpetas',request, { headers: reqHeader });
    }
}
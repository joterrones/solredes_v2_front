import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from '../common/appsettings';

@Injectable()

export class ArchivosServices{
    public url: String;
    public credentials: any;
    public basic: any;


    constructor(public _http: HttpClient) {
        this.url = AppSettings.URL;
    }

    getArchivo(data,token): Observable<any> {
        console.log("enviando .....")
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });        
        return this._http.post(this.url + 'AdmArchivos/getArchivo', data, { headers: reqHeader });
    }

    getCarpetas(token): Observable<any> {
        
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });        
        return this._http.post(this.url + 'AdmArchivos/getCarpetas', { headers: reqHeader });
    }

    deleteCarpeta(data): Observable<any> {
        console.log(data)
        console.log('borrando')
        return this._http.post(this.url + 'AdmArchivos/deleteCarpeta', data);
    }

    saveCarpeta(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node')
        console.log(data)
        return this._http.post(this.url + 'AdmArchivos/saveCarpeta', data, { headers: reqHeader });
    }

    uploadfile(extension,archivo,fileToUpload,token):Observable<any>{
            
        const formData: FormData = new FormData();
        formData.append('DA', fileToUpload, fileToUpload.name);
        return this._http.post(this.url+'AdmArchivos/uploadfile?extension='+extension+'&archivo='+archivo,formData);
    }

    deleteArchivo(data): Observable<any> {
        console.log(data)
        console.log('borrando archivo')
        return this._http.post(this.url + 'AdmArchivos/deleteArchivo', data);
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

    /*downloadArchivo(data): Observable<any> {
        console.log('Descargando.....', data)
        return this._http.get(this.url + 'AdmArchivos/downloadArchivo', data);
    }*/

    downloadArchivo(c_ruta):Observable<any>{
        return this._http.get(this.url+'AdmArchivos/downloadArchivo?c_ruta='+c_ruta,{responseType:'blob'});
    }  
}
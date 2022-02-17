import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from '../common/appsettings';
import { environment } from 'src/environments/environment';

@Injectable()
export class confGeneralService{

    public url: String;
    public credentials: any;
    public basic: any;


    constructor(public _http: HttpClient) {
        this.url =  environment.url;
    }

    getempresa(token): Observable<any> {
        console.log('getempresa')
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'configuracionGeneral/getempresa', { headers: reqHeader });
    }

    saveEmpresa(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node')
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/saveEmpresa', data, { headers: reqHeader });
    }

    deleteEmpresa(data): Observable<any> {
        console.log(data)
        console.log('borrando')
        return this._http.post(this.url + 'configuracionGeneral/deleteEmpresa', data);
    }

    saveLinea(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });        
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/saveLinea', data, { headers: reqHeader });
    }

    getLinea(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node linea')
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/getLinea', data, { headers: reqHeader });
    }

    estadoLinea(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node linea')
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/estadoLinea', data, { headers: reqHeader });
    }

    deleteLinea(data): Observable<any> {
        console.log('borrando linea')
        console.log(data)        
        return this._http.post(this.url + 'configuracionGeneral/deleteLinea', data);
    }

    gettipolinea(request,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'configuracionGeneral/gettipolinea', request, { headers: reqHeader });
    }
    
    saveTipoLinea(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node')
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/saveTipoLinea', data, { headers: reqHeader });
    }

    deleteTipoLinea(data): Observable<any> {
        console.log('borrando Tipo linea')
        console.log(data)        
        return this._http.post(this.url + 'configuracionGeneral/deleteTipoLinea', data);
    }       

    getZona(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node zona')
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/getZona', data, { headers: reqHeader });
    }

    getZonas(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node zona')
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/getZonas', data, { headers: reqHeader });
    }

    saveZona(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });        
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/saveZona', data, { headers: reqHeader });
    }

    deleteZona(data): Observable<any> {
        console.log('borrando zona')
        console.log(data)        
        return this._http.post(this.url + 'configuracionGeneral/deleteZona', data);
    }

    getProyecto(request,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'configuracionGeneral/getProyecto', request, { headers: reqHeader });
    }

    saveProyecto(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });        
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/saveProyecto', data, { headers: reqHeader });
    }

    deleteProyecto(data): Observable<any> {
        console.log('borrando proyecto')
        console.log(data)        
        return this._http.post(this.url + 'configuracionGeneral/deleteProyecto', data);
    }

    getTipoFoto(token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'configuracionGeneral/getTipoFoto', { headers: reqHeader });
    } 

    saveTipoFoto(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node')
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/saveTipoFoto', data, { headers: reqHeader });
    }

    deleteTipoFoto(data): Observable<any> {
        console.log(data)
        console.log('borrando tipo foto')
        return this._http.post(this.url + 'configuracionGeneral/deleteTipoFoto', data);
    }

    getEstructura(request, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'configuracionGeneral/getEstructura',request, { headers: reqHeader });
    }

    saveEstructura(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node estructura')
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/saveEstructura', data, { headers: reqHeader });
    }

    deleteEstructura(data): Observable<any> {
        console.log('borrando Estructura')
        console.log(data)        
        return this._http.post(this.url + 'configuracionGeneral/deleteEstructura', data);
    }    

    getTipoEmpresa(token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'configuracionGeneral/getTipoEmpresa', { headers: reqHeader });
    }

    saveTipoEmpresa(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });        
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/saveTipoEmpresa', data, { headers: reqHeader });
    }

    deleteTipoEmpresa(data): Observable<any> {
        console.log('borrando Estructura')
        console.log(data)        
        return this._http.post(this.url + 'configuracionGeneral/deleteTipoEmpresa', data);
    } 

    getValoresGnr(token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'configuracionGeneral/getValoresGnr', { headers: reqHeader });
    }

    saveValoresGnr(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node')
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/saveValoresGnr', data, { headers: reqHeader });
    }

    deleteValorGnr(data): Observable<any> {
        console.log('borrando Tipo linea')
        console.log(data)        
        return this._http.post(this.url + 'configuracionGeneral/deleteValorGnr', data);
    }   

    getTraGrupos(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node linea')
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/getTraGrupos', data, { headers: reqHeader });
    }

    savetraGrupos(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });        
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/savetraGrupos', data, { headers: reqHeader });
    }

    deletetraGrupos(data): Observable<any> {
        console.log('borrando linea')
        console.log(data)        
        return this._http.post(this.url + 'configuracionGeneral/deletetraGrupos', data);
    }

    getProUser(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/getProUser', data, { headers: reqHeader });
    }

    resetProUser(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/resetProUser', data, { headers: reqHeader });
    }

    saveProUser(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });        
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/saveProUser', data, { headers: reqHeader });
    }

    getLineaUser(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/getLineaUser', data, { headers: reqHeader });
    }

    noAsignarLineaUser(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/noAsignarLineaUser', data, { headers: reqHeader });
    }

    asignarLineaUser(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });        
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/asignarLineaUser', data, { headers: reqHeader });
    }

    getTipoElemento(token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'configuracionGeneral/getTipoElemento', { headers: reqHeader });
    } 

    saveTipoElemento(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node')
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/saveTipoElemento', data, { headers: reqHeader });
    }

    deleteTipoElemento(data): Observable<any> {
        console.log(data)
        console.log('borrando tipo elemento')
        return this._http.post(this.url + 'configuracionGeneral/deleteTipoElemento', data);
    }

    getTablaCateTipoMontaje(request,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'configuracionGeneral/getTablaCateTipoMontaje', request,{ headers: reqHeader });
    } 

    saveCateTipoMontaje(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node')
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/saveCateTipoMontaje', data, { headers: reqHeader });
    }

    deleteCateTipoMontaje(data): Observable<any> {
        console.log(data)
        console.log('borrando tipo montaje')
        return this._http.post(this.url + 'configuracionGeneral/deleteCateTipoMontaje', data);
    }

    uploadfile(extension,archivo,fileToUpload,token):Observable<any>{
            
        const formData: FormData = new FormData();
        formData.append('DA', fileToUpload, fileToUpload.name);
        return this._http.post(this.url+'configuracionGeneral/uploadfile?extension='+extension+'&archivo='+archivo,formData);
    } 

    saveProImg(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node archivo....')
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/saveProImg', data, { headers: reqHeader });
    }

    saveProImgLogo(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node archivo....')
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/saveProImgLogo', data, { headers: reqHeader });
    }

    saveColorPro(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/saveColorPro', data, { headers: reqHeader });
    }

    getTipoMontaje(request,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'configuracionGeneral/getTipoMontaje', request,{ headers: reqHeader });
    } 

    saveTipoMontaje(data, token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log('enviando datos a node')
        console.log(data)
        return this._http.post(this.url + 'configuracionGeneral/saveTipoMontaje', data, { headers: reqHeader });
    }

    deleteTipoMontaje(data): Observable<any> {
        console.log(data)
        console.log('borrando tipo montaje')
        return this._http.post(this.url + 'configuracionGeneral/deleteTipoMontaje', data);
    }
}
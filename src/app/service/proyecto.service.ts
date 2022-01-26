import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from '../common/appsettings';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProyectoService {

    public url: String;
    public credentials: any;
    public basic: any;


    constructor(public _http: HttpClient) {
        this.url =  environment.url;
    }

    get_seleccionproyecto(req): Observable<any> {
        return this._http.post(this.url + 'proyecto/get_seleccionproyecto', req);
    }

    get(req): Observable<any> {
        return this._http.post(this.url + 'proyecto/get', req);
    }

    get_exportalldata(req): Observable<any> {
        return this._http.post(this.url + 'proyecto/get_exportalldata', req);
    }

    get_cartafianza(req): Observable<any> {
        return this._http.post(this.url + 'proyecto/get_cartafianza', req);
    }
    
    save_cartafianza(req): Observable<any> {
        console.log(req)
        return this._http.post(this.url + 'proyecto/save_cartafianza', req);
    }

    delete_cartafianza(req): Observable<any> {
        console.log(req)
        return this._http.post(this.url + 'proyecto/delete_cartafianza', req);
    }

    get_tipocarta(): Observable<any> {
        return this._http.post(this.url + 'proyecto/get_tipocarta',{});
    }

    getid(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/getid', rq, { headers: reqHeader });
    }

    get_lista(rq,token): Observable<any> {
        return this._http.post(this.url + 'proyecto/get_lista', rq);
    }
    
    getid_dos(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/getid_dos', rq, { headers: reqHeader });
    }

    get_tarea_proyecto_registro(rq): Observable<any> {
      
        return this._http.post(this.url + 'proyecto/get_tarea_proyecto_registro', rq);
    }

    get_tarea_edit_proyecto_registro(rq): Observable<any> {
        return this._http.post(this.url + 'proyecto/get_tarea_edit_proyecto_registro', rq);
    }

    get_datoadicional_registro(rq): Observable<any> {
        return this._http.post(this.url + 'proyecto/get_datoadicional_registro', rq);
    }

    save(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/save', rq, { headers: reqHeader });
    }

    
    
    save_orden(rq): Observable<any> {
        return this._http.post(this.url + 'proyecto/save_orden', rq);
    }

    save_tarea_proyecto_individual(rq): Observable<any> {
        return this._http.post(this.url + 'proyecto/save_tarea_proyecto_individual', rq);
    }

    delete_tarea_proyecto_individual(rq): Observable<any> {
        return this._http.post(this.url + 'proyecto/delete_tarea_proyecto_individual', rq);
    }

    save_tarea_proyecto(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/save_tarea_proyecto', rq, { headers: reqHeader });
    }

    get_tarea_proyecto(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_tarea_proyecto', rq, { headers: reqHeader });
    }

    save_valor_datoadicional(rq): Observable<any> {

        
        return this._http.post(this.url + 'proyecto/save_valor_datoadicional', rq);
    }

    delete_proyecto(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/delete_proyecto', rq, { headers: reqHeader });
    }
    
    get_proyecto_atributo(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_proyecto_atributo', rq, { headers: reqHeader });
    }
    
    get_situacion(rq): Observable<any> {
        return this._http.post(this.url + 'proyecto/get_situacion', rq);
    }

    save_situacion(rq): Observable<any> {
        return this._http.post(this.url + 'proyecto/save_situacion', rq);
    }
    
    delete_situacion(rq): Observable<any> {
        return this._http.post(this.url + 'proyecto/delete_situacion', rq);
    }
    
    get_proyecto_atributo_file(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_proyecto_atributo_file', rq, { headers: reqHeader });
    }
    

    uploadfile(extension,proyecto,fileToUpload,token):Observable<any>{
            
        const formData: FormData = new FormData();
        formData.append('DA', fileToUpload, fileToUpload.name);
        return this._http.post(this.url+'proyecto/uploadfile?extension='+extension+'&proyecto='+proyecto,formData/*, { headers: reqHeader }*/);
    }  



    fechar_tarea(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/fechar_tarea', rq, { headers: reqHeader });
    }

    get_dato_fase(token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_dato_fase', {}, { headers: reqHeader });
    }
    get_dato_fase_historico(rq): Observable<any> {
        return this._http.post(this.url + 'proyecto/get_dato_fase_historico', rq, );
    }
    
    getusuarioproyecto(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/getusuarioproyecto', rq, { headers: reqHeader });
    }
    guardarusuarioproyecto(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/guardarusuarioproyecto', rq, { headers: reqHeader });
    }
    
    get_xls_formato_perfil(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_perfil', rq, { headers: reqHeader });
    }
    
    get_xls_formato_diseno(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_diseno', rq, { headers: reqHeader });
    }

    get_xls_formato_ejecucion(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_ejecucion', rq, { headers: reqHeader });
    }
    get_xls_formato_cierre(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_cierre', rq, { headers: reqHeader });
    }
    get_xls_formato_proyecto(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_proyecto', rq, { headers: reqHeader });
    }
    get_xls_formato_otros(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_otros', rq, { headers: reqHeader });
    }
    get_xls_formato_obra(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_obra', rq, { headers: reqHeader });
    }

    // Obra - Valorización Contractual
    get_xls_formato_obra_valorizacioncontractual(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_obra_valorizacioncontractual', rq, { headers: reqHeader });
    }
    // Obra - Presupuesto Obra Aprobados
    get_xls_formato_obra_presupuestoobra(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_obra_presupuestoobra', rq, { headers: reqHeader });
    }
    // Obra - Avance Programado vs Real Ejecutado
    get_xls_formato_obra_avanceprogramadovsrealejectutado(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_obra_avanceprogramadovsrealejectutado', rq, { headers: reqHeader });
    }
    // Obra - Valoriación Mayores Metrados
    get_xls_formato_obra_valorizacionmayoresmetrados(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_obra_valorizacionmayoresmetrados', rq, { headers: reqHeader });
    }
    // Obra - Valoriación Partidas Adicionales
    get_xls_formato_obra_valorizacionpartidasadicionales(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_obra_valorizacionpartidasadicionales', rq, { headers: reqHeader });
    }
    // Obra - Adelanto Materiales
    get_xls_formato_obra_adelantomateriales(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_obra_adelantomateriales', rq, { headers: reqHeader });
    }
    // Obra - Ampliacion plazo
    get_xls_formato_obra_ampliacionplazo(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_obra_ampliacionplazo', rq, { headers: reqHeader });
    }


    // SUPERVISION
    get_xls_formato_supervision(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_supervision', rq, { headers: reqHeader });
    }
    // SUPERVISION Avance Programado vs Real Ejecutado
    get_xls_formato_supervision_avanceprogramadovsrealejecutado(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_supervision_avanceprogramadovsrealejecutado', rq, { headers: reqHeader });
    }
    // SUPERVISION Valorizacion Contractual
    get_xls_formato_supervision_valorizacioncontractual(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_supervision_valorizacioncontractual', rq, { headers: reqHeader });
    }
    // SUPERVISION Mayor Prestación
    get_xls_formato_supervision_mayorprestacion(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_supervision_mayorprestacion', rq, { headers: reqHeader });
    }
    // SUPERVISION Mayor Prestación
    get_xls_formato_supervision_prestacionadicional(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_supervision_prestacionadicional', rq, { headers: reqHeader });
    }
    // SUPERVISION Presupuesto Obra
    get_xls_formato_supervision_presupuestoobra(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_supervision_presupuestoobra', rq, { headers: reqHeader });
    }

    // OBRA - SUPERVISION Garantías
    get_xls_formato_obra_supervision_garantias(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_obra_supervision_garantias', rq, { headers: reqHeader });
    }
    
    // OTROS
    get_xls_formato_otros_amp_plazo(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_otros_amp_plazo', rq, { headers: reqHeader });
    }
    get_xls_formato_otros_mod_presupuestal(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_otros_mod_presupuestal', rq, { headers: reqHeader });
    }
    get_xls_formato_otros_adel_directo(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_otros_adel_directo', rq, { headers: reqHeader });
    }
    get_xls_formato_otros_adel_materiales(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_otros_adel_materiales', rq, { headers: reqHeader });
    }
    get_xls_formato_otros_emple_generados(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_xls_formato_otros_emple_generados', rq, { headers: reqHeader });
    }

    get_exportalldata2(req): Observable<any> {
        return this._http.post(this.url + 'proyecto/get_exportalldata2', req);
    }

    getUbigeoProyecto(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/getubigeoproyecto', rq, { headers: reqHeader });
    }

    get_exportdatosadicionales(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/get_exportdatosadicionales', rq, { headers: reqHeader });
    }

    getUbigeoProyecto_xls(rq,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this._http.post(this.url + 'proyecto/getubigeoproyecto_xls', rq, { headers: reqHeader });
    }
}
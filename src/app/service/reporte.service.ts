import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from '../common/appsettings';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  public url: String;
    public credentials: any;
    public basic: any;

    constructor(public _http: HttpClient) {
        this.url =  environment.url;
    }

    getReporte(request,token): Observable<any> {
        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        console.log(request);
        
        return this._http.post(this.url + 'reporte/getReporte', request, { headers: reqHeader });
    }

    getReporteCabecero(request,token): Observable<any> {
      var reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      });
      console.log(request);
      
      return this._http.post(this.url + 'reporte/getReporteCabecero', request, { headers: reqHeader });
  }

  getZonasProyectos(request,token): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    console.log(request);
    
    return this._http.post(this.url + 'reporte/getZonasProyectos', request, { headers: reqHeader });
}

saveReporteCabecero(request,token): Observable<any> {
  var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
  });
  console.log(request);
  
  return this._http.post(this.url + 'reporte/saveReporteCabecero', request, { headers: reqHeader });
}

deleteReporteCabecero(request): Observable<any> {
  console.log(request);  
  return this._http.post(this.url + 'reporte/deleteReporteCabecero', request);
}

saveReporte(request,token): Observable<any> {
  var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
  });
  console.log(request);
  
  return this._http.post(this.url + 'reporte/saveReporte', request, { headers: reqHeader });
}

deleteReporte(request): Observable<any> {
  console.log(request);  
  return this._http.post(this.url + 'reporte/deleteReporte', request);
}


}

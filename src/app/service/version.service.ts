import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from '../common/appsettings';

@Injectable()
export class VersionService {

    public url: String;
    public credentials: any;
    public basic: any;

    constructor(public _http: HttpClient) {
        this.url = AppSettings.URL;
    }

    get() {
        return [
            { id: 1, nombre: "Expediente" },
            { id: 2, nombre: "Replanteo" },
            { id: 3, nombre: "Montaje" },
            { id: 4, nombre: "Cierre" },
        ];
    }


}
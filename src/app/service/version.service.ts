import { Injectable } from '@angular/core';

@Injectable()
export class VersionService {
    get() {
        return [
            { id: 1, nombre: "Expediente" },
            { id: 2, nombre: "Replanteo" },
            { id: 3, nombre: "Montaje" },
            { id: 4, nombre: "Cierre" },
        ];
    }
}
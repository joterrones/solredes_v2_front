import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { MetradoService } from 'src/app/service/metrado.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-detallemetrado',
  templateUrl: './detallemetrado.component.html',
  styleUrls: ['./detallemetrado.component.css'],
  providers: [MetradoService]
})
export class DetallemetradoComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['c_tipo','c_codigo','c_nombreelemento','c_unidadmedida','n_cantidad'];
    estructuras = [];
    procesando: boolean =  false;
    constructor(
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public _metrado_service: MetradoService,
        public snackBar: MatSnackBar,
        public _router: Router
    ) {
        super(snackBar,_router);
    }

    ngOnInit() {
        this.procesando = true;
        this.getEstructuras();
    }

    public getEstructuras() {
        let request = {
            n_idpl_elemento: this.data.n_idpl_elemento,
            n_idpl_linea: this.data.n_idpl_linea,
            n_version: this.data.n_version
        };
        this._metrado_service.getestructurametrado(request,this.getProyect()).subscribe(
            result => {
                if (result.estado) {
                    this.procesando = false;
                    this.estructuras = result.data;
                } else {

                    this.openSnackBar(result.mensaje, 99);
                }
            }, error => {
                this.openSnackBar(<any>error, 99);
                alert(error.error);
            });
    }

}

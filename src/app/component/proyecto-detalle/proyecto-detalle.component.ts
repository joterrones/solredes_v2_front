import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { confGeneralService } from 'src/app/service/confGeneral.service';
import { environment } from 'src/environments/environment';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-proyecto-detalle',
  templateUrl: './proyecto-detalle.component.html',
  styleUrls: ['./proyecto-detalle.component.css']
})
export class ProyectoDetalleComponent extends BaseComponent implements OnInit {

  infoProyecto: any;
  urlImagen: string;

  constructor(
    public dialogRef: MatDialogRef<ProyectoDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _router: Router,
    public snackBar: MatSnackBar) {
      super(snackBar, _router);
  }

  ngOnInit() {
    this.infoProyecto = this.data.item;
    this.urlImagen = environment.urlArchivo;
  }

}

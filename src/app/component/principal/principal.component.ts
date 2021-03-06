import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { environment } from 'src/environments/environment';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent extends BaseComponent implements OnInit {

  urlImagen: string;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
  ) { 
    super(snackBar, router);
  }

  ngOnInit() {
    this.urlImagen = environment.urlArchivo+this.proyecto.c_rutaimg;
    console.log(this.proyecto);
    
  }

}

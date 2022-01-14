import { Component, OnInit } from '@angular/core';
import { SnackComponent } from '../generico/snack/snack.component';
import { SnackInterface } from '../../interface/snack.interface';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../common/appsettings'
import { Router } from "@angular/router";
@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  bLogin: boolean = true;
  proyecto:any;
  usuarioLog:any;

  objsnack: SnackInterface = {
    mensaje: "",
    tipo: 0
  };

  pagin: string[] = ['25', '50', '100', '150'];

  constructor(
    public snackBar: MatSnackBar, public router: Router
  ) {
    this.isLogin();
    this.proyecto = this.getProyecto();
  }

  ngOnInit() {
    
  }

  public isLogin() {

    if (this.getToken() == null) {
      this.router.navigate(['/login']);
      this.bLogin = false;
    } else {
      this.bLogin = true;

    }
    console.log(this.bLogin)
  }

  public getToken(): any {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser;
  }
  /*public getTokenString(): String {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.tocken;
  }*/

  /*
  public getUsuarioLogin(): String {
    var currentUser = JSON.parse(localStorage.getItem('user'));
    return currentUser.token;
  }*/

  public getUser(): any {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));    
    return currentUser;
  }

  public setToken(obj) {
    localStorage.setItem('currentUser', JSON.stringify(obj));
  }

  public setProyecto(obj) {
    localStorage.setItem('proyecto', JSON.stringify(obj));
  }

  public getProyecto(): any {
    var currentUser = JSON.parse(localStorage.getItem('proyecto'));
    return currentUser;
  }

  public getProyect(): any {
    var currentUser = JSON.parse(localStorage.getItem('proyecto')).c_nombre;
    return currentUser;
  }

  public openSnackBar(mensaje: String, tipo: number) {
    if (mensaje == 'Token inválido!.') {
      localStorage.clear();
      this.router.navigate(['/login']);
    } else {
      this.objsnack.mensaje = mensaje;
      this.objsnack.tipo = tipo;
      this.snackBar.openFromComponent(SnackComponent, {
        duration: 2500,
        data: this.objsnack
      });
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  decimalOnly(event: any) {
    const pattern = /[0-9\.\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    console.log('dato ingresado: ' + inputChar);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  decimalOnly2(event: any) {
    const pattern = /[0-9\.\ ]/;
    //const pattern = /^-?[0-9\.\ ]/;
    //const pattern = /^-?[0-9]\d*(\.\d+)?$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      //invalid character, prevent input
      console.log(inputChar + ' : valid');
      //event.preventDefault();
      if (event.keyCode != 45) {
        event.preventDefault();
      }
    }
  }

}

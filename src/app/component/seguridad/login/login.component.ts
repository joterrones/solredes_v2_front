import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from "@angular/router";
import { BaseComponent } from '../../base/base.component';
import { SeguridadService } from '../../../service/seguridad.service';
import { VersionesComponent } from '../../versiones/versiones.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[SeguridadService]
})
export class LoginComponent extends BaseComponent implements OnInit {
  public typepassword:String="password";
  public iconpassword:String ="visibility_off";
  ruta_img_login: String;
  flag=false;
  dataLogin = {
    c_username: "",
    c_clave: ""
  };
  resultado = {
    expiration: "",
    token: "",
    cMensaje: "",
    flag:false
  };
  isActive:boolean= true;

  constructor(public _login_service: SeguridadService, public router: Router, public snackBar: MatSnackBar, public dialog: MatDialog) { 
    super(snackBar,router);
    this.ruta_img_login = "assets/images/fondologin3.jpg";
    
  }

  ngOnInit() {
        
  }

  login(form) {
    console.log(this.dataLogin);
    this._login_service.login(this.dataLogin).subscribe(
      result => {
        console.log(result)
        if (result.estado) {
          this.setToken(result);
          this.router.navigate(['/proyectoseleccion']);
          this.isLogin();
        } else {
          this.openSnackBar(result.mensaje, 99);
          this.isLogin();
        }
        form.reset();

      }, error => {
        console.log(error);
        this.openSnackBar(error.error.Detail, error.error.StatusCode);
        form.reset();
        this.isLogin();
      });
  }
  changetipepassword(){
    if(this.typepassword=="password"){
      this.typepassword="text";
      this.iconpassword="visibility";
    }else{
      this.typepassword="password";
      this.iconpassword="visibility_off";
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VersionesComponent, {
      width: '750px',
    });
    dialogRef.afterClosed().subscribe(result => {
      try {
      } catch (error) {
        console.log(error);
      }
    });
  }
}

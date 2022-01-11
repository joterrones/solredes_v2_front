import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { BaseComponent } from '../../base/base.component';
import { MatSnackBar } from '@angular/material';
import { Router } from "@angular/router";
import { ResetearclaveComponent } from '../../generico/resetarclave/resetarclave.component';
import { MatDialog } from '@angular/material';
//import { MapaService } from '../../../service/mapa.services';
import { saveAs } from 'file-saver';
import { AppSettings } from 'src/app/common/appsettings';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  //providers: [MapaService]

})
export class MenuComponent extends BaseComponent implements OnInit {
  @Input() titulo: String;

  public usuario: any;
  public username: string = "Logearse";
  public role: any;
  public menu: any;
  public rol = '';

  public seguridad: boolean = false;
  public configuracion_general: boolean = false;
  public administracion_proyecto: boolean = false;
  public mapa: boolean = false;
  public proyecto_fase: boolean = false;
  public dashboard: boolean = false;
  public dashboard_bolsa: boolean = false;
  public bolsa_proyecto: boolean = false;

  colorPro: string;

  date: Date;
  urlImagen: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    /*public mapaService: MapaService*/) {
    super(snackBar, router);
    setInterval(() => {
      this.date = new Date()
    }, 1000)
  }

  ngOnInit() {
    this.colorPro = this.proyecto.c_color
    console.log(this.proyecto.c_color);

    this.urlImagen = AppSettings.URL_IMG_PROYECTO+this.proyecto.c_rutalogo;
    if (this.bLogin) {
      this.username = this.getToken().data.c_username;
      this.usuario = this.getToken().data;
      console.log('Usuario Menu');
      console.log(this.usuario);
      this.rol = this.usuario.c_rolename;

    /*  switch (this.usuario.n_idseg_role) {
        case 1:
          this.setearMenu(true, true, true, true, true, true, true, true);
          break;
        case 2:
          this.setearMenu(false, true, true, true, true, true, true, true);
          break;
        case 3:
          this.setearMenu(false, false, true, true, true, true, true, true);
          break;
        case 5:
          this.setearMenu(false, false, false, true, true, true, false, true);
          break;
      }*/
    }
  }

  setearMenu(b_seguridad, b_configuracion_general, b_administracion_proyecto, b_mapa, b_proyecto_fase, b_dashboard, b_bolsa_proyecto, b_dashboard_bolsa) {
    this.seguridad = b_seguridad;
    this.configuracion_general = b_configuracion_general;
    this.administracion_proyecto = b_administracion_proyecto;
    this.mapa = b_mapa;
    this.proyecto_fase = b_proyecto_fase;
    this.dashboard = b_dashboard;
    this.bolsa_proyecto = b_bolsa_proyecto;
    this.dashboard_bolsa = b_dashboard_bolsa;
  }

  logoff() {
    localStorage.clear();
    this.isLogin();
    this.router.navigate(['/login']);

  }

  openDialogClave(): void {
    console.log(this.usuario)
    let data = {
      data: this.usuario,
      titulo: "Cambiar Contraseña",
      esresetpassword: false
    };

    const dialogRefClave = this.dialog.open(ResetearclaveComponent, {
      width: '750px',
      data: data
    });
    dialogRefClave.afterClosed().subscribe(result => {

    });
  }



  descargarManual = () => {
  /*  this.mapaService.download("DGER_HSP_Guia_Usuario_HSP.pdf").subscribe(
      result => {
        saveAs(result, "DGER_HSP_Guia_Usuario_HSP.pdf");
      }, error => {
        this.openSnackBar(<any>error, 99);
      });*/
  }

}

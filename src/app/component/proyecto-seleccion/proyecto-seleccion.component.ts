import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { SocketWebService } from 'src/app/service/socket.services';
import { environment } from 'src/environments/environment';
import { BaseComponent } from '../base/base.component';
import { ProyectoDetalleComponent } from '../proyecto-detalle/proyecto-detalle.component';

@Component({
  selector: 'app-proyecto-seleccion',
  templateUrl: './proyecto-seleccion.component.html',
  styleUrls: ['./proyecto-seleccion.component.css'],
  providers: [ProyectoService]
})
export class ProyectoSeleccionComponent extends BaseComponent implements OnInit {
  proyectos = [];
  urlImagen: string;
  constructor(
    public _proyecto_service: ProyectoService,
    public _router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
    ) {
    super(snackBar, _router)
    
  }

  ngOnInit() {
    this.urlImagen = environment.urlArchivo;
    this.getProyectos();
  }

  getProyectos() {
    let usuario = this.getToken().data;
    this._proyecto_service.get_seleccionproyecto(usuario).subscribe(
      result => {
        console.log("get_seleccionproyecto", result)
        try {
          if (result.estado) {
            this.proyectos = result.data            
          } else {
            // this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          // this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
        }
      }, error => {
        // this.openSnackBar(error.error, 99);
        console.log("get_seleccionproyecto error")
      });
  }

  irProyecto(item){
    console.log("get_seleccionproyecto usuario", item);
    this.setProyecto(item);
    this.router.navigate(['/principal']);
  }

  openDialog(item): void {    
    const dialogRef = this.dialog.open(ProyectoDetalleComponent, {
      width: '750px', height: '600px',
      data: { item: item }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {                
      } catch (error) {
        console.log(error);        
      }
    });
  } 

}

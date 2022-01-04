import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-proyecto-seleccion',
  templateUrl: './proyecto-seleccion.component.html',
  styleUrls: ['./proyecto-seleccion.component.css'],
  providers: [ProyectoService]
})
export class ProyectoSeleccionComponent extends BaseComponent implements OnInit {
  proyectos = []
  constructor(public _proyecto_service: ProyectoService,
    public _router: Router,
    public snackBar: MatSnackBar) {
    super(snackBar, _router)
  }

  ngOnInit() {
    this.getProyectos();
  }

  getProyectos() {
    let usuario = this.getToken().data;
    console.log("get_seleccionproyecto usuario", usuario)
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

}

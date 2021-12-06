import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ExcelFormatService } from '../../../service/excelformat.service';
import { BaseComponent } from '../../base/base.component';
import { ProyectoService } from '../../../service/proyecto.service';
import { AppSettings } from 'src/app/common/appsettings';
@Component({
  selector: 'app-exportalldata',
  templateUrl: './exportalldata.component.html',
  styleUrls: ['./exportalldata.component.css'],
  providers: [ProyectoService,]
})
export class ExportalldataComponent extends BaseComponent implements OnInit {

  @Input() n_idgen_fase = 0;
  @Input() iddepartamento = 0;
  @Input() idprovincia =0;
  @Input() iddistrito = 0;
  @Input() idcentropoblado = 0;

  public edited = false;

  constructor(private _excel_service: ExcelFormatService,
    public snackBar: MatSnackBar,
    public router: Router,
    public _proyecto_service: ProyectoService) {
    super(snackBar, router);
  }

  ngOnInit() {
  }

  generaralldataproyecto() {
    let req = {
      n_idgen_fase:this.n_idgen_fase,
      n_idgen_departamento: this.iddepartamento,
      n_idgen_provincia: this.idprovincia,
      n_idgen_distrito: this.iddistrito,
      n_idgen_centropoblado: this.idcentropoblado,
    }

    this.edited = true;

    this._proyecto_service.get(req).subscribe(
      result => {
        if (result.estado) {
            const proyectos = result.data;
            console.log(proyectos);
            this._proyecto_service.get_exportalldata(req).subscribe(
              result => {
                if (result.estado) {
                    const datosadicionales = result.data;
                    
                    console.log(datosadicionales);
                    this._excel_service.generaralldataproyecto(proyectos,datosadicionales);
                    this.edited = false;
                } else {
                  this.openSnackBar(result.mensaje, 99);
                  this.edited = false;
                }
              }, error => {
                try {
                  this.openSnackBar(error.error.Detail, error.error.StatusCode);
                } catch (error) {
                  this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
                }
              });
        } else {
          this.openSnackBar(result.mensaje, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ExcelFormatService } from '../../../service/excelformat.service';
import { BaseComponent } from '../../base/base.component';
import { ProyectoService } from '../../../service/proyecto.service';
import { AppSettings } from 'src/app/common/appsettings';

@Component({
  selector: 'app-exportdatoadicional',
  templateUrl: './exportdatoadicional.component.html',
  styleUrls: ['./exportdatoadicional.component.css']
})
export class ExportdatoadicionalComponent extends BaseComponent implements OnInit {

  @Input() idfase = 0;
  @Input() iddepartamento = 0;
  @Input() idprovincia = 0;
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

  generaralldatosadicionales() {
    let req = {
      n_idgen_fase: this.idfase,
      n_idgen_departamento: this.iddepartamento,
      n_idgen_provincia: this.idprovincia,
      n_idgen_distrito: this.iddistrito,
      n_idgen_centropoblado: this.idcentropoblado
    }

    this.edited = true;

    this._proyecto_service.get_exportdatosadicionales(req, this.getToken().token).subscribe(
      result => {
        if (result.estado) {
          const detalles = result.data;
          console.log(detalles);
          this._excel_service.generaralldatosadicionales(detalles);
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
  }
}

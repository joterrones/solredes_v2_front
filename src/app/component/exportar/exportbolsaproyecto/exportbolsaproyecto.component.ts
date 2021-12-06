import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ExcelFormatService } from '../../../service/excelformat.service';
import { BaseComponent } from '../../base/base.component';
import { BolsaProyectoService } from '../../../service/bolsaproyecto.service';
import { AppSettings } from 'src/app/common/appsettings';

@Component({
  selector: 'app-exportbolsaproyecto',
  templateUrl: './exportbolsaproyecto.component.html',
  styleUrls: ['./exportbolsaproyecto.component.css'],
  providers: [BolsaProyectoService]
})
export class ExportbolsaproyectoComponent extends BaseComponent implements OnInit {

  @Input() n_idgen_fase = 0;
  @Input() iddepartamento = 0;
  @Input() idprovincia = 0;
  @Input() iddistrito = 0;
  @Input() idcentropoblado = 0;
  @Input() idbolsaproyecto = 0;
  @Input() annio = 0;

  public edited = false;

  constructor(private _excel_service: ExcelFormatService,
    public snackBar: MatSnackBar,
    public router: Router,
    public _bolsaproyecto_service: BolsaProyectoService) {
    super(snackBar, router);
  }

  ngOnInit() {
  }

  generaralldatabolsadetalle() {
    let req = {
      n_idgen_fase: this.n_idgen_fase,
      n_idgen_departamento: this.iddepartamento,
      n_idgen_provincia: this.idprovincia,
      n_idgen_distrito: this.iddistrito,
      n_idgen_centropoblado: this.idcentropoblado,
      n_idgen_bolsaproyecto: this.idbolsaproyecto,
      n_annio: this.annio
    }

    this.edited = true;

    this._bolsaproyecto_service.get_exportbolsadetalle(req).subscribe(
      result => {
        if (result.estado) {
          const detalles = result.data;
          console.log(detalles);
          this._excel_service.generarallbolsadetalle(detalles);
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

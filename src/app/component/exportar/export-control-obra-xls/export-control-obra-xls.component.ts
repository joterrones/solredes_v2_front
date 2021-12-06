import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ExcelFormatService } from '../../../service/excelformat.service';
import { BaseComponent } from '../../base/base.component';
import { ProyectoService } from '../../../service/proyecto.service';
import { AppSettings } from 'src/app/common/appsettings';

@Component({
  selector: 'app-export-control-obra-xls',
  templateUrl: './export-control-obra-xls.component.html',
  styleUrls: ['./export-control-obra-xls.component.css'],
  providers: [ProyectoService,]
})
export class ExportControlObraXlsComponent extends BaseComponent implements OnInit  {

  @Input() n_idgen_proyecto = 1;
  constructor(private _excel_service: ExcelFormatService,
    public snackBar: MatSnackBar,
    public router: Router,
    public _proyecto_service: ProyectoService) {
    super(snackBar, router);
  }

  ngOnInit() {
  }

  generarObra() {
    const req1 = {
      n_idgen_proyecto: this.n_idgen_proyecto
    }
    this._proyecto_service.get_xls_formato_obra(req1, this.getToken().token).subscribe(
      result => {
        if (result.estado) {
            const proyecto = result.data[0];
            console.log('Aquí mostraremos los datos que utilizaremos en el excel');
            console.log(proyecto);
            this._proyecto_service.get_xls_formato_obra_valorizacioncontractual(req1, this.getToken().token).subscribe(
              result => {
                if (result.estado) {
                  const valorizacioncontractual = result.data;
                  console.log('Valorización Contractual');
                  console.log(valorizacioncontractual);
                  this._proyecto_service.get_xls_formato_obra_presupuestoobra(req1, this.getToken().token).subscribe(
                    result => {
                      if (result.estado) {
                        const presupuetoobra = result.data;
                        console.log('Presupuesto Obra');
                        console.log(presupuetoobra);
                        this._proyecto_service.get_xls_formato_obra_avanceprogramadovsrealejectutado(req1, this.getToken().token).subscribe(
                          result => {
                            if (result.estado) {
                              const avanceprogramadovsrealejecutado = result.data;
                              console.log('Avance Programado vs Real Ejecutado');
                              console.log(avanceprogramadovsrealejecutado);
                              this._proyecto_service.get_xls_formato_obra_valorizacionmayoresmetrados(req1, this.getToken().token)
                              .subscribe(
                                result => {
                                  if (result.estado) {
                                    const valorMayoresMetrados = result.data;
                                    console.log('Valorización Mayores Metrados');
                                    console.log(valorMayoresMetrados);
                                    this._proyecto_service.get_xls_formato_obra_valorizacionpartidasadicionales(req1, this.getToken().token)
                                    .subscribe(
                                      result => {
                                        if (result.estado) {
                                          const valPartidasAdicionales = result.data;
                                          console.log('Valorización Partidas Adicionales');
                                          console.log(valPartidasAdicionales);
                                          this._proyecto_service.get_xls_formato_obra_adelantomateriales(req1, this.getToken().token)
                                          .subscribe(
                                            result => {
                                              if (result.estado) {
                                                const adelantoMateriales = result.data;
                                                console.log('Adelanto Materiales');
                                                console.log(adelantoMateriales);
                                                this._proyecto_service.get_xls_formato_obra_ampliacionplazo(req1, this.getToken().token)
                                                .subscribe(
                                                  result => {
                                                    if (result.estado) {
                                                      const ampliacionPlazo = result.data;
                                                      console.log('Ampliación Plazo');
                                                      console.log(ampliacionPlazo);
                                                      this._proyecto_service.get_xls_formato_obra_supervision_garantias(req1, this.getToken().token)
                                                      . subscribe(
                                                        result => {
                                                          if(result.estado) {
                                                            const garantias = result.data;
                                                            console.log('Garantias');
                                                            console.log(garantias);
                                                            this._excel_service.generarObra(proyecto, valorizacioncontractual, presupuetoobra,
                                                              avanceprogramadovsrealejecutado, valorMayoresMetrados, valPartidasAdicionales,
                                                              adelantoMateriales, ampliacionPlazo, garantias);
                                                          } else {
                                                            this.openSnackBar(result.mensaje, 99);
                                                          }
                                                        }
                                                      );
                                                    } else {
                                                      this.openSnackBar(result.mensaje, 99);
                                                    }
                                                  }
                                                );
                                              } else {
                                                this.openSnackBar(result.mensaje, 99);
                                              }
                                            }
                                          );
                                        } else {
                                          this.openSnackBar(result.mensaje, 99);
                                        }
                                      }
                                    );
                                  } else {
                                    this.openSnackBar(result.mensaje, 99);
                                  }
                                }
                              );
                            } else {
                              this.openSnackBar(result.mensaje, 99);
                            }
                          }
                        );
                      } else {
                        this.openSnackBar(result.mensaje, 99);
                      }
                    }
                  );
                } else {
                  this.openSnackBar(result.mensaje, 99);
                }
              }, error => {
                try {
                  this.openSnackBar(error.error.Detail, error.error.StatusCode);
                } catch (error) {
                  this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
                }
              }
            );
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

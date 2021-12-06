import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ExcelFormatService } from '../../../service/excelformat.service';
import { BaseComponent } from '../../base/base.component';
import { ProyectoService } from '../../../service/proyecto.service';
import { AppSettings } from 'src/app/common/appsettings';
@Component({
  selector: 'app-exportperfilxls',
  templateUrl: './exportperfilxls.component.html',
  styleUrls: ['./exportperfilxls.component.css'],
  providers: [ProyectoService,]
})
export class ExportperfilxlsComponent extends BaseComponent implements OnInit {
  @Input() n_idgen_proyecto = 1;
  @Input() excel = 6; // 1 perfi l, 2 diseño, 3 ejecucion, 4 cierre // 5 Contro de Proyecto, 6 Otros
  @Input() titulo = "Proyecto";
  constructor(private _excel_service: ExcelFormatService,
    public snackBar: MatSnackBar,
    public router: Router,
    public _proyecto_service: ProyectoService) {
    super(snackBar, router);
  }

  ngOnInit() {
  }

  generateExcel() {
    switch (this.excel) {
      case 1:
        this.generatePerfil();
        break;
      case 2:
        this.generateExcelDiseno();
        break;
      case 3:
        this.generateExcelEjecucion();
        break;
      case 4:
        this.generateExcelCierre();
        break;
      case 5:
        this.generateExcelProyecto();
        break;
      case 6:
        this.generateExcelOtros();
        break;
      case 7:
        this.generateUbigeoProyecto();
        break;
    }
  }

  generatePerfil() {
    let req1 = {
      n_idgen_proyecto: this.n_idgen_proyecto
    }
    this._proyecto_service.get_xls_formato_perfil(req1, this.getToken().token).subscribe(
      result => {
        if (result.estado) {
          let proyecto = result.data.proyectos[0];
          let departamentos = result.data.ubigeos;
          this._excel_service.generateExcel(proyecto, departamentos);
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

  generateExcelDiseno() {
    let req1 = {
      n_idgen_proyecto: this.n_idgen_proyecto
    }
    this._proyecto_service.get_xls_formato_diseno(req1, this.getToken().token).subscribe(
      result => {
        if (result.estado) {
          let proyecto = result.data.proyectos[0];
          let departamentos = result.data.ubigeos;
          this._excel_service.generateExcelDiseno(proyecto, departamentos);
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

  generateExcelEjecucion() {
    let req1 = {
      n_idgen_proyecto: this.n_idgen_proyecto
    }
    this._proyecto_service.get_xls_formato_ejecucion(req1, this.getToken().token).subscribe(
      result => {
        if (result.estado) {
          let proyecto = result.data.proyectos[0];
          let departamentos = result.data.ubigeos;
          this._excel_service.generateExcelEjecucion(proyecto, departamentos);
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

  generateExcelCierre() {
    let req1 = {
      n_idgen_proyecto: this.n_idgen_proyecto
    }
    this._proyecto_service.get_xls_formato_cierre(req1, this.getToken().token).subscribe(
      result => {
        if (result.estado) {
          let proyecto = result.data.proyectos[0];
          let departamentos = result.data.ubigeos;

          this._excel_service.generateExcelCierre(proyecto, departamentos);
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

  generateExcelProyecto() {
    let req1 = {
      n_idgen_proyecto: this.n_idgen_proyecto
    }
    this._proyecto_service.get_xls_formato_proyecto(req1, this.getToken().token).subscribe(
      result => {
        if (result.estado) {
          let proyecto = result.data.proyectos[0];
          let departamentos = result.data.ubigeos;
          this._excel_service.generateExcelProyecto(proyecto, departamentos);
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

  generateExcelOtros() {
    let req1 = {
      n_idgen_proyecto: this.n_idgen_proyecto
    }
    this._proyecto_service.get_xls_formato_otros(req1, this.getToken().token).subscribe(
      result => {
        if (result.estado) {
          let proyecto = result.data.proyectos[0];
          let departamentos = result.data.ubigeos;
          this._proyecto_service.get_xls_formato_otros_amp_plazo(req1, this.getToken().token).subscribe(
            result => {
              if (result.estado) {
                const amp_plazo = result.data;
                console.log('Ampliación Plazo');
                console.log(amp_plazo);
                this._proyecto_service.get_xls_formato_otros_mod_presupuestal(req1, this.getToken().token).subscribe(
                  result => {
                    if (result.estado) {
                      const mod_presupuestal = result.data;
                      console.log('Modificación Presupuestal');
                      console.log(mod_presupuestal);
                      this._proyecto_service.get_xls_formato_otros_adel_directo(req1, this.getToken().token).subscribe(
                        result => {
                          if (result.estado) {
                            const adel_directo = result.data;
                            console.log('Adelanto Directo');
                            console.log(adel_directo);
                            this._proyecto_service.get_xls_formato_otros_adel_materiales(req1, this.getToken().token).subscribe(
                              result => {
                                if (result.estado) {
                                  const adel_materiales = result.data;
                                  console.log('Adelanto Materiales');
                                  console.log(adel_materiales);
                                  this._proyecto_service.get_xls_formato_otros_emple_generados(req1, this.getToken().token).subscribe(
                                    result => {
                                      if (result.estado) {
                                        const emp_generados = result.data;
                                        console.log('Empleados Generados');
                                        console.log(emp_generados);
                                        this._proyecto_service.get_xls_formato_obra_valorizacioncontractual(req1, this.getToken().token).subscribe(
                                          result => {
                                            if (result.estado) {
                                              const contractual = result.data;
                                              console.log('Contractual');
                                              console.log(contractual);
                                              this._proyecto_service.get_xls_formato_obra_avanceprogramadovsrealejectutado(req1, this.getToken().token).subscribe(
                                                result => {
                                                  if (result.estado) {
                                                    const programadoejecutado = result.data;
                                                    console.log('Programado Ejecutado');
                                                    console.log(programadoejecutado);
                                                    this._excel_service.generateExcelOtros(proyecto, departamentos,
                                                      amp_plazo, mod_presupuestal, adel_directo, adel_materiales, emp_generados,
                                                      contractual, programadoejecutado);
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
      });
  }

  generateUbigeoProyecto() {
    let req1 = {
      n_idgen_proyecto: this.n_idgen_proyecto
    }
    this._proyecto_service.getUbigeoProyecto_xls(req1, this.getToken().token).subscribe(
      result => {
        if (result.estado) {
          let detalle = result.data;
          console.log(detalle);
          this._excel_service.generarUbigeoProyecto(detalle);
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

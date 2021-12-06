import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../base/base.component';
import { Router } from "@angular/router";
import { ProyectoService } from '../../../service/proyecto.service';
import { AppSettings } from '../../../common/appsettings'
import { Chart } from 'chart.js';
@Component({
  selector: 'app-curvas',
  templateUrl: './curvas.component.html',
  styleUrls: ['./curvas.component.css'],
  providers: [ProyectoService]
})
export class CurvasComponent extends BaseComponent implements OnInit {

  b_graf1 = false;
  b_graf2 = false;

  n_idgen_proyecto = "";
  c_nombreproyecto = "";

  public chartgraf1: any;
  public chartgraf2: any;

  public tablagra1: MatTableDataSource<any>;
  displayedColumnsgra1: string[] = ['mesanio', 'programado', 'avance'];


  public tablagra2: MatTableDataSource<any>;
  displayedColumnsgra2: string[] = ['mesanio', 'programado', 'avance'];


  constructor(
    private _proyecto_service: ProyectoService,
    public _router: Router,
    private _Activatedroute: ActivatedRoute,
    public snackBar: MatSnackBar) {
    super(snackBar, _router);
  }

  ngOnInit() {
    this.n_idgen_proyecto = this._Activatedroute.snapshot.paramMap.get("n_idgen_proyecto");
    this.c_nombreproyecto = this._Activatedroute.snapshot.paramMap.get("c_nombreproyecto");
    this.get_xls_formato_obra_avanceprogramadovsrealejectutado();
    this.get_xls_formato_supervision_avanceprogramadovsrealejecutado();
  }

  get_xls_formato_obra_avanceprogramadovsrealejectutado() {
    let req = { n_idgen_proyecto: this.n_idgen_proyecto }
    console.log("Gráfico");
    console.log(req);
    this._proyecto_service.get_xls_formato_obra_avanceprogramadovsrealejectutado(req, this.getToken().token).subscribe(
      result => {
        console.log(result.data);
        if (result.estado) {
          let resultado = [];

          let etiquetas = [];
          let programados = [];
          let ejecutados = [];

          let grilla1 = result.data;
          
          let acumprogramdo = 0;
          let acumcontractual = 0;

          grilla1.forEach(element => {
            acumprogramdo = acumprogramdo + element.mensual_prog;

            let sumacontractual = element.acum_contractual_eje + element.acumulado_mm_eje + element.acumulado_pa_eje;
            acumcontractual = acumcontractual + sumacontractual;


            element.programadoacumulado = acumprogramdo;
            element.contractualacumulado = acumcontractual;
            resultado.push(element);

            programados.push(acumprogramdo);
            if (sumacontractual > 0) {
              ejecutados.push(acumcontractual);
            } else {
              ejecutados.push(0);
            }
            etiquetas.push(element.mes_anio);
          });

          if(resultado.length>0){
            this.b_graf1=true;
          }

          this.tablagra1 = new MatTableDataSource<any>(resultado);

          if (this.chartgraf1 != undefined) {
            this.chartgraf1.destroy();
          }
          this.chartgraf1 = new Chart('graf1', {
            type: 'bar',
            data: {
              labels: etiquetas,
              datasets: [{
                data: programados,
                type: 'line',
                borderWidth: 2,
                borderColor: [
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',

                ]
              }, {
                data: ejecutados,
                type: 'line',
                borderWidth: 2,
                borderColor: [
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',

                ]
              }, {
                data: programados,
                backgroundColor: [
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',

                ]
              }, {
                data: ejecutados,

                backgroundColor: [
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',

                ]
              }]
            },

            options: {
              legend: { display: false },
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  get_xls_formato_supervision_avanceprogramadovsrealejecutado() {
    let req = { n_idgen_proyecto: this.n_idgen_proyecto }
    console.log("Gráfico");
    console.log(req);
    this._proyecto_service.get_xls_formato_supervision_avanceprogramadovsrealejecutado(req, this.getToken().token).subscribe(
      result => {
        console.log(result.data);
        if (result.estado) {
          let resultado = [];

          let etiquetas = [];
          let programados = [];
          let ejecutados = [];

          let grilla1 = result.data;
          let acumprogramdo = 0;
          let acumcontractual = 0;

          grilla1.forEach(element => {
            acumprogramdo = acumprogramdo + element.mensual_prog;

            let sumacontractual = element.n_acumuladocontractual + element.n_acumuladomayormetrado + element.n_acumuladopartidaacional;
            acumcontractual = acumcontractual + sumacontractual;
            element.programadoacumulado = acumprogramdo;
            element.contractualacumulado = acumcontractual;
            resultado.push(element);

            programados.push(acumprogramdo);
            if (sumacontractual > 0) {
              ejecutados.push(acumcontractual);
            } else {
              ejecutados.push(0);
            }
            etiquetas.push(element.mes_anio);
          });

          if(resultado.length>0){
            this.b_graf2=true;
          }

          this.tablagra2 = new MatTableDataSource<any>(resultado);

          if (this.chartgraf2 != undefined) {
            this.chartgraf2.destroy();
          }
          this.chartgraf2 = new Chart('graf2', {
            type: 'bar',
            data: {
              labels: etiquetas,
              datasets: [{
                data: programados,
                type: 'line',
                borderWidth: 2,
                borderColor: [
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',
                  'rgba(0, 0, 0,1.0)',

                ]
              }, {
                data: ejecutados,
                type: 'line',
                borderWidth: 2,
                borderColor: [
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',
                  'rgba(230, 123, 218,1.0)',

                ]
              }, {
                data: programados,
                backgroundColor: [
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',
                  'rgba(0, 162, 75,1.0)',

                ]
              }, {
                data: ejecutados,

                backgroundColor: [
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',
                  'rgba(0, 111, 255,1.0)',

                ]
              }]
            },

            options: {
              legend: { display: false },
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });
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

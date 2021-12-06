import { Component, OnInit, ɵConsole } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from '../../../service/dashboard.service';
import { GeneralService } from '../../../service/general.service'
import { MatSnackBar } from '@angular/material';
import { Router } from "@angular/router";
import { ResultadoApi } from '../../../interface/common.interface';
import { BaseComponent } from '../../base/base.component';
import { AppSettings } from '../../../common/appsettings'
import { UbigeoService } from '../../../service/ubigeo.service';
import { TareaService } from '../../../service/tarea.service';
import { ProyectoService } from '../../../service/proyecto.service';
import { BolsaProyectoService } from '../../../service/bolsaproyecto.service';

@Component({
  selector: 'app-dashboardbolsa',
  templateUrl: './dashboardbolsa.component.html',
  styleUrls: ['./dashboardbolsa.component.css'],
  providers: [DashboardService, GeneralService, UbigeoService, TareaService, ProyectoService, BolsaProyectoService]
})
export class DashboardbolsaComponent extends BaseComponent implements OnInit {

  departamentos = []
  fases = []
  annios = []

  iddepartamento = 0;
  idfase = 0;
  annio = 0;

  widthdetail = 1;
  widthdash = 2;
  rowspan = 1;
  public myChartDepartamento: any;
  public MyCharAnnio: any;
  public MyCharMontoProgramado: any;
  public MyCharMontoEjecutado: any;

  ntotproyectos = 0;
  ntotencartera = 0;
  ntotendesarrollo = 0;

  ntotalmontoprogramado = 0;
  ntotalmontoejecutado = 0;
  ntotalmontopim = 0;
  ntotalmontopia = 0;
  ntotalmontoreprogramado = 0;
  ntotalmontodif = 0;
  ntotalmontoprogramado2 = 0;
  ntotalmontodif2 = 0;

  nporcentaje1 = 0;
  nporcentaje2 = 0;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    private dashboardServices: DashboardService,
    private _tarea_service: TareaService,
    private _ubigeo_service: UbigeoService,
    private _proyecto_service: ProyectoService,
    private _bolsa_service: BolsaProyectoService,

  ) { super(snackBar, router); }

  ngOnInit() {
    this.getFase();
    this.getDepartamento();
    this.getAnnio();
    this.getDashboard();
  }

  selectFase(id) {
    this.idfase = id;
    this.getDashboard();
  }

  selectDepartamento(id) {
    this.iddepartamento = id;
    this.getDashboard();
  }

  selectAnnio(id) {
    this.annio = id;
    this.getDashboard();
  }

  getFase() {
    this._tarea_service.get_fase(this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.fases = result.data
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }

  getDepartamento() {
    this._bolsa_service.getdepartamento({}, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.departamentos = result.data
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }

  getAnnio() {
    this._bolsa_service.getannio({}, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.annios = result.data
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }

  getDashboard() {
    let rq = {
      n_idgen_departamento: this.iddepartamento,
      n_idgen_provincia: 0,
      n_idgen_distrito: 0,
      n_idgen_centropoblado: 0,
      n_idgen_fase: this.idfase,
      n_annio: this.annio
    }
    this.dashboardServices.getDashboardBolsa(rq, this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          console.log(result.data)

          this.ntotalmontoprogramado = 0;
          this.ntotalmontoejecutado = 0;
          this.ntotproyectos = 0;
          this.ntotencartera = 0;
          this.ntotendesarrollo = 0;
          this.ntotalmontopia = 0;
          this.ntotalmontopim = 0;
          this.ntotalmontoreprogramado = 0;
          this.ntotalmontodif = 0;
          this.ntotalmontodif2 = 0;
          this.ntotalmontoprogramado2 = 0;
          this.nporcentaje1 = 0;
          this.nporcentaje2 = 0;

          for (let i = 1; i <= resultado.data.graficomonto1.cantidades.length; i++) {
            this.ntotalmontoprogramado = this.ntotalmontoprogramado + resultado.data.graficomonto1.cantidades[i - 1];
          }

          for (let i = 1; i <= resultado.data.graficomonto2.cantidades.length; i++) {
            this.ntotalmontoejecutado = this.ntotalmontoejecutado + resultado.data.graficomonto2.cantidades[i - 1];
          }

          for (let i = 1; i <= resultado.data.graficomonto3.cantidades.montopia.length; i++) {
            this.ntotalmontopia = this.ntotalmontopia + resultado.data.graficomonto3.cantidades.montopia[i - 1];
          }

          for (let i = 1; i <= resultado.data.graficomonto3.cantidades.montopim.length; i++) {
            this.ntotalmontopim = this.ntotalmontopim + resultado.data.graficomonto3.cantidades.montopim[i - 1];
          }

          for (let i = 1; i <= resultado.data.graficomonto3.cantidades.montoreprogramado.length; i++) {
            this.ntotalmontoreprogramado = this.ntotalmontoreprogramado + resultado.data.graficomonto3.cantidades.montoreprogramado[i - 1];
          }

          for (let i = 1; i <= resultado.data.graficomonto3.cantidades.montoprogramado.length; i++) {
            this.ntotalmontoprogramado2 = this.ntotalmontoprogramado2 + resultado.data.graficomonto3.cantidades.montoprogramado[i - 1];
          }

          for (let i = 1; i <= resultado.data.graficoannio.cantidades.cantidadannios.length; i++) {
            this.ntotproyectos = this.ntotproyectos + resultado.data.graficoannio.cantidades.cantidadannios[i - 1];
          }

          for (let i = 1; i <= resultado.data.graficoannio.cantidades.cantidadcartera.length; i++) {
            this.ntotencartera = this.ntotencartera + resultado.data.graficoannio.cantidades.cantidadcartera[i - 1];
          }

          for (let i = 1; i <= resultado.data.graficoannio.cantidades.cantidaddesarrollo.length; i++) {
            this.ntotendesarrollo = this.ntotendesarrollo + resultado.data.graficoannio.cantidades.cantidaddesarrollo[i - 1];
          }

          this.ntotalmontodif = this.ntotalmontopim - this.ntotalmontoreprogramado;
          this.ntotalmontodif2 = this.ntotalmontopia - this.ntotalmontopim;
          this.nporcentaje1 = ((this.ntotalmontoejecutado * 100) / this.ntotalmontoprogramado);
          this.nporcentaje2 = ((this.ntotalmontopim * 100) / this.ntotalmontopia);

          console.log("DIF PIA - PIM");
          console.log(this.ntotalmontodif2);

          if (this.myChartDepartamento != undefined) {
            this.myChartDepartamento.destroy();
          }

          if (this.MyCharAnnio != undefined) {
            this.MyCharAnnio.destroy();
          }

          if (this.MyCharMontoProgramado != undefined) {
            this.MyCharMontoProgramado.destroy();
          }

          if (this.MyCharMontoEjecutado != undefined) {
            this.MyCharMontoEjecutado.destroy();
          }

          this.myChartDepartamento = new Chart('dashboarddepartamento', {
            type: 'bar',
            data: {
              labels: resultado.data.graficodepartamento.claves,
              datasets: [{
                label: 'En cartera',
                data: resultado.data.graficodepartamento.cantidades.cantidaddepartamentoscartera,
                backgroundColor: [
                  'rgba(255, 235, 59,1.0)',
                  'rgba(255, 193, 7,1.0)',
                  'rgba(255, 152, 0,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',
                  'rgba(136, 14, 79,1.0)',
                  'rgba(74, 20, 140,1.0)',
                  'rgba(49, 27, 146,1.0)',
                  'rgba(26, 35, 126,1.0)',
                  'rgba(51, 105, 30,1.0)',
                  'rgba(255, 99, 132)',
                  'rgba(244, 67, 54,1.0)',
                  'rgba(156, 39, 176,1.0)',
                  'rgba(103, 58, 183,1.0)',
                  'rgba(63, 81, 181,1.0)',
                  'rgba(33, 150, 243,1.0)',
                  'rgba(3, 169, 244,1.0)',
                  'rgba(0, 188, 212,1.0)',
                  'rgba(0, 150, 136,1.0)',
                  'rgba(76, 175, 80,1.0)',
                  'rgba(139, 195, 74,1.0)',
                  'rgba(205, 220, 57,1.0)',
                  'rgba(62, 39, 35,1.0)',
                ],
                borderColor: [
                  'rgba(255, 235, 59,1.0)',
                  'rgba(255, 193, 7,1.0)',
                  'rgba(255, 152, 0,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',
                  'rgba(136, 14, 79,1.0)',
                  'rgba(74, 20, 140,1.0)',
                  'rgba(49, 27, 146,1.0)',
                  'rgba(26, 35, 126,1.0)',
                  'rgba(51, 105, 30,1.0)',
                  'rgba(255, 99, 132)',
                  'rgba(244, 67, 54,1.0)',
                  'rgba(156, 39, 176,1.0)',
                  'rgba(103, 58, 183,1.0)',
                  'rgba(63, 81, 181,1.0)',
                  'rgba(33, 150, 243,1.0)',
                  'rgba(3, 169, 244,1.0)',
                  'rgba(0, 188, 212,1.0)',
                  'rgba(0, 150, 136,1.0)',
                  'rgba(76, 175, 80,1.0)',
                  'rgba(139, 195, 74,1.0)',
                  'rgba(205, 220, 57,1.0)',
                  'rgba(62, 39, 35,1.0)',
                ],
                borderWidth: 1
              }, {
                label: 'En desarrollo',
                data: resultado.data.graficodepartamento.cantidades.cantidaddepartamentosdesarrollo,
                backgroundColor: [
                  'rgba(255, 152, 0,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',
                  'rgba(136, 14, 79,1.0)',
                  'rgba(74, 20, 140,1.0)',
                  'rgba(49, 27, 146,1.0)',
                  'rgba(26, 35, 126,1.0)',
                  'rgba(51, 105, 30,1.0)',
                  'rgba(255, 99, 132)',
                  'rgba(244, 67, 54,1.0)',
                  'rgba(156, 39, 176,1.0)',
                  'rgba(103, 58, 183,1.0)',
                  'rgba(63, 81, 181,1.0)',
                  'rgba(33, 150, 243,1.0)',
                  'rgba(3, 169, 244,1.0)',
                  'rgba(0, 188, 212,1.0)',
                  'rgba(0, 150, 136,1.0)',
                  'rgba(76, 175, 80,1.0)',
                  'rgba(139, 195, 74,1.0)',
                  'rgba(205, 220, 57,1.0)',
                  'rgba(62, 39, 35,1.0)',
                  'rgba(255, 235, 59,1.0)',
                  'rgba(255, 193, 7,1.0)',
                ],
                borderColor: [
                  'rgba(255, 152, 0,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',
                  'rgba(136, 14, 79,1.0)',
                  'rgba(74, 20, 140,1.0)',
                  'rgba(49, 27, 146,1.0)',
                  'rgba(26, 35, 126,1.0)',
                  'rgba(51, 105, 30,1.0)',
                  'rgba(255, 99, 132)',
                  'rgba(244, 67, 54,1.0)',
                  'rgba(156, 39, 176,1.0)',
                  'rgba(103, 58, 183,1.0)',
                  'rgba(63, 81, 181,1.0)',
                  'rgba(33, 150, 243,1.0)',
                  'rgba(3, 169, 244,1.0)',
                  'rgba(0, 188, 212,1.0)',
                  'rgba(0, 150, 136,1.0)',
                  'rgba(76, 175, 80,1.0)',
                  'rgba(139, 195, 74,1.0)',
                  'rgba(205, 220, 57,1.0)',
                  'rgba(62, 39, 35,1.0)',
                  'rgba(255, 235, 59,1.0)',
                  'rgba(255, 193, 7,1.0)',
                ],
                borderWidth: 1
              }]
            },

            options: {
              legend: { display: false },
              scales: {
                xAxes: [{
                  stacked: true,
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            }
          });

          this.MyCharAnnio = new Chart('dashboardannio', {
            type: 'bar',
            data: {
              labels: resultado.data.graficoannio.claves,
              datasets: [{
                label: 'En cartera',
                data: resultado.data.graficoannio.cantidades.cantidadcartera,
                backgroundColor: [
                  'rgba(0, 188, 212,1.0)',
                  'rgba(0, 150, 136,1.0)',
                  'rgba(76, 175, 80,1.0)',
                  'rgba(139, 195, 74,1.0)',
                  'rgba(205, 220, 57,1.0)',
                  'rgba(62, 39, 35,1.0)',
                  'rgba(255, 235, 59,1.0)',
                  'rgba(255, 193, 7,1.0)',
                  'rgba(255, 152, 0,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',
                  'rgba(136, 14, 79,1.0)',
                  'rgba(74, 20, 140,1.0)',
                  'rgba(49, 27, 146,1.0)',
                  'rgba(26, 35, 126,1.0)',
                  'rgba(51, 105, 30,1.0)',
                  'rgba(255, 99, 132)',
                  'rgba(244, 67, 54,1.0)',
                  'rgba(156, 39, 176,1.0)',
                  'rgba(103, 58, 183,1.0)',
                  'rgba(63, 81, 181,1.0)',
                  'rgba(33, 150, 243,1.0)',
                  'rgba(3, 169, 244,1.0)',
                ],
                borderColor: [
                  'rgba(0, 188, 212,1.0)',
                  'rgba(0, 150, 136,1.0)',
                  'rgba(76, 175, 80,1.0)',
                  'rgba(139, 195, 74,1.0)',
                  'rgba(205, 220, 57,1.0)',
                  'rgba(62, 39, 35,1.0)',
                  'rgba(255, 235, 59,1.0)',
                  'rgba(255, 193, 7,1.0)',
                  'rgba(255, 152, 0,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',
                  'rgba(136, 14, 79,1.0)',
                  'rgba(74, 20, 140,1.0)',
                  'rgba(49, 27, 146,1.0)',
                  'rgba(26, 35, 126,1.0)',
                  'rgba(51, 105, 30,1.0)',
                  'rgba(255, 99, 132)',
                  'rgba(244, 67, 54,1.0)',
                  'rgba(156, 39, 176,1.0)',
                  'rgba(103, 58, 183,1.0)',
                  'rgba(63, 81, 181,1.0)',
                  'rgba(33, 150, 243,1.0)',
                  'rgba(3, 169, 244,1.0)',
                ],
                borderWidth: 1
              }, {
                label: 'En desarrollo',
                data: resultado.data.graficoannio.cantidades.cantidaddesarrollo,
                backgroundColor: [
                  'rgba(255, 235, 59,1.0)',
                  'rgba(255, 193, 7,1.0)',
                  'rgba(255, 152, 0,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',
                  'rgba(136, 14, 79,1.0)',
                  'rgba(74, 20, 140,1.0)',
                  'rgba(49, 27, 146,1.0)',
                  'rgba(26, 35, 126,1.0)',
                  'rgba(51, 105, 30,1.0)',
                  'rgba(255, 99, 132)',
                  'rgba(244, 67, 54,1.0)',
                  'rgba(156, 39, 176,1.0)',
                  'rgba(103, 58, 183,1.0)',
                  'rgba(63, 81, 181,1.0)',
                  'rgba(33, 150, 243,1.0)',
                  'rgba(3, 169, 244,1.0)',
                  'rgba(0, 188, 212,1.0)',
                  'rgba(0, 150, 136,1.0)',
                  'rgba(76, 175, 80,1.0)',
                  'rgba(139, 195, 74,1.0)',
                  'rgba(205, 220, 57,1.0)',
                  'rgba(62, 39, 35,1.0)',
                ],
                borderColor: [
                  'rgba(255, 235, 59,1.0)',
                  'rgba(255, 193, 7,1.0)',
                  'rgba(255, 152, 0,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',
                  'rgba(136, 14, 79,1.0)',
                  'rgba(74, 20, 140,1.0)',
                  'rgba(49, 27, 146,1.0)',
                  'rgba(26, 35, 126,1.0)',
                  'rgba(51, 105, 30,1.0)',
                  'rgba(255, 99, 132)',
                  'rgba(244, 67, 54,1.0)',
                  'rgba(156, 39, 176,1.0)',
                  'rgba(103, 58, 183,1.0)',
                  'rgba(63, 81, 181,1.0)',
                  'rgba(33, 150, 243,1.0)',
                  'rgba(3, 169, 244,1.0)',
                  'rgba(0, 188, 212,1.0)',
                  'rgba(0, 150, 136,1.0)',
                  'rgba(76, 175, 80,1.0)',
                  'rgba(139, 195, 74,1.0)',
                  'rgba(205, 220, 57,1.0)',
                  'rgba(62, 39, 35,1.0)',
                ],
                borderWidth: 1
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

          this.MyCharMontoProgramado = new Chart('dashboardmontoprogramado', {
            type: 'bar',
            data: {
              labels: resultado.data.graficomonto1.claves,
              datasets: [{
                label: 'Programado',
                data: resultado.data.graficomonto1.cantidades,
                backgroundColor: [
                  'rgba(255, 152, 0,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',
                  'rgba(136, 14, 79,1.0)',
                  'rgba(74, 20, 140,1.0)',
                  'rgba(49, 27, 146,1.0)',
                  'rgba(26, 35, 126,1.0)',
                  'rgba(51, 105, 30,1.0)',
                  'rgba(255, 99, 132)',
                  'rgba(244, 67, 54,1.0)',
                  'rgba(156, 39, 176,1.0)',
                  'rgba(103, 58, 183,1.0)',
                  'rgba(63, 81, 181,1.0)',
                  'rgba(33, 150, 243,1.0)',
                  'rgba(3, 169, 244,1.0)',
                  'rgba(0, 188, 212,1.0)',
                  'rgba(0, 150, 136,1.0)',
                  'rgba(76, 175, 80,1.0)',
                  'rgba(139, 195, 74,1.0)',
                  'rgba(205, 220, 57,1.0)',
                  'rgba(62, 39, 35,1.0)',
                  'rgba(255, 235, 59,1.0)',
                  'rgba(255, 193, 7,1.0)',
                ],
                borderColor: [
                  'rgba(255, 152, 0,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',
                  'rgba(136, 14, 79,1.0)',
                  'rgba(74, 20, 140,1.0)',
                  'rgba(49, 27, 146,1.0)',
                  'rgba(26, 35, 126,1.0)',
                  'rgba(51, 105, 30,1.0)',
                  'rgba(255, 99, 132)',
                  'rgba(244, 67, 54,1.0)',
                  'rgba(156, 39, 176,1.0)',
                  'rgba(103, 58, 183,1.0)',
                  'rgba(63, 81, 181,1.0)',
                  'rgba(33, 150, 243,1.0)',
                  'rgba(3, 169, 244,1.0)',
                  'rgba(0, 188, 212,1.0)',
                  'rgba(0, 150, 136,1.0)',
                  'rgba(76, 175, 80,1.0)',
                  'rgba(139, 195, 74,1.0)',
                  'rgba(205, 220, 57,1.0)',
                  'rgba(62, 39, 35,1.0)',
                  'rgba(255, 235, 59,1.0)',
                  'rgba(255, 193, 7,1.0)',
                ],
                borderWidth: 1
              },
              {
                label: 'Ejecutado',
                data: resultado.data.graficomonto2.cantidades,
                backgroundColor: [
                  'rgba(74, 20, 140,1.0)',
                  'rgba(156, 39, 176,1.0)',
                  'rgba(255, 152, 0,1.0)',
                  'rgba(33, 150, 243,1.0)',
                  'rgba(3, 169, 244,1.0)',
                  'rgba(0, 188, 212,1.0)',
                  'rgba(0, 150, 136,1.0)',
                  'rgba(76, 175, 80,1.0)',
                  'rgba(139, 195, 74,1.0)',
                  'rgba(205, 220, 57,1.0)',
                  'rgba(62, 39, 35,1.0)',
                  'rgba(255, 235, 59,1.0)',
                  'rgba(255, 193, 7,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',
                  'rgba(136, 14, 79,1.0)',
                  'rgba(49, 27, 146,1.0)',
                  'rgba(26, 35, 126,1.0)',
                  'rgba(51, 105, 30,1.0)',
                  'rgba(255, 99, 132)',
                  'rgba(244, 67, 54,1.0)',
                  'rgba(103, 58, 183,1.0)',
                  'rgba(63, 81, 181,1.0)',
                ],
                borderColor: [
                  'rgba(74, 20, 140,1.0)',
                  'rgba(156, 39, 176,1.0)',
                  'rgba(255, 152, 0,1.0)',
                  'rgba(33, 150, 243,1.0)',
                  'rgba(3, 169, 244,1.0)',
                  'rgba(0, 188, 212,1.0)',
                  'rgba(0, 150, 136,1.0)',
                  'rgba(76, 175, 80,1.0)',
                  'rgba(139, 195, 74,1.0)',
                  'rgba(205, 220, 57,1.0)',
                  'rgba(62, 39, 35,1.0)',
                  'rgba(255, 235, 59,1.0)',
                  'rgba(255, 193, 7,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',
                  'rgba(136, 14, 79,1.0)',
                  'rgba(49, 27, 146,1.0)',
                  'rgba(26, 35, 126,1.0)',
                  'rgba(51, 105, 30,1.0)',
                  'rgba(255, 99, 132)',
                  'rgba(244, 67, 54,1.0)',
                  'rgba(103, 58, 183,1.0)',
                  'rgba(63, 81, 181,1.0)',
                ],
                borderWidth: 1
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

          this.MyCharMontoEjecutado = new Chart('dashboardmontoejecutado', {
            type: 'bar',
            data: {
              labels: resultado.data.graficomonto3.claves,
              datasets: [{
                label: 'PIM',
                data: resultado.data.graficomonto3.cantidades.montopim,
                backgroundColor: [
                  'rgba(74, 20, 140,1.0)',
                  'rgba(156, 39, 176,1.0)',
                  'rgba(255, 152, 0,1.0)',
                  'rgba(33, 150, 243,1.0)',
                  'rgba(3, 169, 244,1.0)',
                  'rgba(0, 188, 212,1.0)',
                  'rgba(0, 150, 136,1.0)',
                  'rgba(76, 175, 80,1.0)',
                  'rgba(139, 195, 74,1.0)',
                  'rgba(205, 220, 57,1.0)',
                  'rgba(62, 39, 35,1.0)',
                  'rgba(255, 235, 59,1.0)',
                  'rgba(255, 193, 7,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',
                  'rgba(136, 14, 79,1.0)',
                  'rgba(49, 27, 146,1.0)',
                  'rgba(26, 35, 126,1.0)',
                  'rgba(51, 105, 30,1.0)',
                  'rgba(255, 99, 132)',
                  'rgba(244, 67, 54,1.0)',
                  'rgba(103, 58, 183,1.0)',
                  'rgba(63, 81, 181,1.0)',
                ],
                borderColor: [
                  'rgba(74, 20, 140,1.0)',
                  'rgba(156, 39, 176,1.0)',
                  'rgba(255, 152, 0,1.0)',
                  'rgba(33, 150, 243,1.0)',
                  'rgba(3, 169, 244,1.0)',
                  'rgba(0, 188, 212,1.0)',
                  'rgba(0, 150, 136,1.0)',
                  'rgba(76, 175, 80,1.0)',
                  'rgba(139, 195, 74,1.0)',
                  'rgba(205, 220, 57,1.0)',
                  'rgba(62, 39, 35,1.0)',
                  'rgba(255, 235, 59,1.0)',
                  'rgba(255, 193, 7,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',
                  'rgba(136, 14, 79,1.0)',
                  'rgba(49, 27, 146,1.0)',
                  'rgba(26, 35, 126,1.0)',
                  'rgba(51, 105, 30,1.0)',
                  'rgba(255, 99, 132)',
                  'rgba(244, 67, 54,1.0)',
                  'rgba(103, 58, 183,1.0)',
                  'rgba(63, 81, 181,1.0)',
                ],
                borderWidth: 1
              },
              {
                label: 'PIA',
                data: resultado.data.graficomonto3.cantidades.montopia,
                backgroundColor: [
                  'rgba(0, 188, 212,1.0)',
                  'rgba(0, 150, 136,1.0)',
                  'rgba(76, 175, 80,1.0)',
                  'rgba(139, 195, 74,1.0)',
                  'rgba(205, 220, 57,1.0)',
                  'rgba(62, 39, 35,1.0)',
                  'rgba(255, 235, 59,1.0)',
                  'rgba(255, 193, 7,1.0)',
                  'rgba(255, 152, 0,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',
                  'rgba(136, 14, 79,1.0)',
                  'rgba(74, 20, 140,1.0)',
                  'rgba(49, 27, 146,1.0)',
                  'rgba(26, 35, 126,1.0)',
                  'rgba(51, 105, 30,1.0)',
                  'rgba(255, 99, 132)',
                  'rgba(244, 67, 54,1.0)',
                  'rgba(156, 39, 176,1.0)',
                  'rgba(103, 58, 183,1.0)',
                  'rgba(63, 81, 181,1.0)',
                  'rgba(33, 150, 243,1.0)',
                  'rgba(3, 169, 244,1.0)',
                ],
                borderColor: [
                  'rgba(0, 188, 212,1.0)',
                  'rgba(0, 150, 136,1.0)',
                  'rgba(76, 175, 80,1.0)',
                  'rgba(139, 195, 74,1.0)',
                  'rgba(205, 220, 57,1.0)',
                  'rgba(62, 39, 35,1.0)',
                  'rgba(255, 235, 59,1.0)',
                  'rgba(255, 193, 7,1.0)',
                  'rgba(255, 152, 0,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',
                  'rgba(136, 14, 79,1.0)',
                  'rgba(74, 20, 140,1.0)',
                  'rgba(49, 27, 146,1.0)',
                  'rgba(26, 35, 126,1.0)',
                  'rgba(51, 105, 30,1.0)',
                  'rgba(255, 99, 132)',
                  'rgba(244, 67, 54,1.0)',
                  'rgba(156, 39, 176,1.0)',
                  'rgba(103, 58, 183,1.0)',
                  'rgba(63, 81, 181,1.0)',
                  'rgba(33, 150, 243,1.0)',
                  'rgba(3, 169, 244,1.0)',
                ],
                borderWidth: 1
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
        } else {
          this.openSnackBar(resultado.mensaje, 99);
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

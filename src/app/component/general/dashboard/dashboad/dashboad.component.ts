import { Component, OnInit, ɵConsole } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from '../../../../service/dashboard.service';
import { GeneralService } from '../../../../service/general.service'
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from "@angular/router";
import { ResultadoApi } from '../../../../interface/common.interface';
import { BaseComponent } from '../../../base/base.component';
import { AppSettings } from '../../../../common/appsettings'
import { UbigeoService } from '../../../../service/ubigeo.service';
import { TareaService } from '../../../../service/tarea.service';
import { ProyectoService } from '../../../../service/proyecto.service';
import { DecimalPipe } from '@angular/common';
import { DashboardProgresoComponent } from '../dashboard-progreso/dashboard-progreso.component';
import { DashboardLineasEstructurasComponent } from '../dashboard-lineas-estructuras/dashboard-lineas-estructuras.component';
import { DashboardLineaZonaComponent } from '../dashboard-linea-zona/dashboard-linea-zona.component';
import { DashboardPeriodoComponent } from '../dashboard-periodo/dashboard-periodo.component';
import { DashboardZonaComponent } from '../dashboard-zona/dashboard-zona.component';
import { DashboardLineaEstadoComponent } from '../dashboard-linea-estado/dashboard-linea-estado.component';
import { DashboardGuiasComponent } from '../dashboard-guias/dashboard-guias.component';
import { DashboardInspeccionComponent } from '../dashboard-inspeccion/dashboard-inspeccion.component';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-dashboad',
  templateUrl: './dashboad.component.html',
  styleUrls: ['./dashboad.component.css'],
  providers: [DashboardService, GeneralService, UbigeoService, TareaService, ProyectoService]
})

export class DashboadComponent extends BaseComponent implements OnInit {

  departamentos = []
  provincias = []
  distritos = []
  centropoblados = []
  proyectos = []
  fases = []
  
  dataResultado: any;

  iddepartamento = 0;
  idprovincia = 0;
  iddistrito = 0;
  idcentropoblado = 0;
  n_idgen_fase = 0;
  idproyecto = 0;

  widthdetail = 1;
  widthdash = 2;
  rowspan = 1;
  selected: number = 0;

  versiones =[
    { id: 1, nombre: "Expediente" },
    { id: 2, nombre: "Replanteo" },
    { id: 3, nombre: "Montaje" },
    { id: 4, nombre: "Cierre" },
  ];

  selectVersion;
  tplinea = [];
  expediente = [];
  replanteo = [];
  montaje = [];
  cierre = [];
  selectedArr = [];
  total = [];

  public myChartLineas: any;
  public MyCharProgreso: any;
  public MyCharPeriodo: any;
  public MyCharLineaZona: any;
  public MyCharZona: any;
  public myChartLineasEstado: any;


  public MyCharTipoEjecucion: any;
  public MyCharMontoValorizado: any;
  public MyCharRedPrimaria: any;
  public MyCharRedSecundaria: any;
  public MyCharLuminaria: any;
  public MyCharLPReforzamiento: any;

  public myChartInspeccion: any;
  public myChartGuia: any;

  ntotproyecto1 = 0;
  ntotproyecto2 = 0;
  nsinasignacionf1 = 0;
  nsinasignacionf2 = 0;
  npreinversion1 = 0;
  npreinversion2 = 0;
  nestudiodef1 = 0;
  nestudiodef2 = 0;
  nejecucion1 = 0;
  nejecucion2 = 0;
  nsupervision1 = 0;
  nsupervision2 = 0;
  ncierre1 = 0;
  ncierre2 = 0;

  ntotalmontocontratado = 0.00;
  ntotalmontocontratado2 = 0.00;
  ntotalmontovalorizado = 0.00;
  nporcentajevalorizado = 0;
  ntotalLP = 0.00;
  ntotalRP = 0.00;
  ntotalRS = 0.00;
  ntotalLuminaria = 0.00;
  ntotalLPReforzamiento = 0.00;

  fechaInicio= "";
  fechaInicioInspecion;
  fechaFinal= "";
  fechaFinalInspecion;

  fechaInicio2= "";
  fechaInicioGuia;
  fechaFinal2= "";
  fechaFinalGuia;

  fechaFinalBool = false;


  fechaFinalBool2 = false;

  date = new FormControl(new Date());
  date2;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    private dashboardServices: DashboardService,
    private _tarea_service: TareaService,
    private _ubigeo_service: UbigeoService,
    private _proyecto_service: ProyectoService,
    public dialog: MatDialog

  ) { 
    super(snackBar, router); 
    let anio = new Date().getFullYear();
    let mes = new Date().getMonth() +1;
    let dia = new Date().getDate();
    this.date2 =  new FormControl(new Date(anio, (mes-2), dia));
    let c_mesInicio = (mes-1).toString();
    let c_mesFinal = mes.toString();
    let c_dia = dia.toString();

    if (mes < 10) {
      c_mesInicio = '0'+(mes-1).toString();
      c_mesFinal = '0'+mes.toString();
    }

    if (dia < 10) {
      c_dia = '0'+dia.toString;
    }

    if(mes == 2 && dia > 28){
      this.fechaInicio = anio + '-' + c_mesInicio + '-28 00:00:00.000'
      this.fechaFinal = anio + '-' + c_mesFinal + '-' + c_dia + ' 23:59:59.000'
      this.fechaInicio2 = anio + '-' + c_mesInicio + '-28 00:00:00.000'
      this.fechaFinal2 = anio + '-' + c_mesFinal + '-' + c_dia + ' 23:59:59.000'
    }else{
      this.fechaInicio = anio + '-' + c_mesInicio + '-' + c_dia + ' 00:00:00.000'
      this.fechaFinal = anio + '-' + c_mesFinal + '-' + c_dia + ' 23:59:59.000'
      this.fechaInicio2 = anio + '-' + c_mesInicio + '-' + c_dia + ' 00:00:00.000'
      this.fechaFinal2 = anio + '-' + c_mesFinal + '-' + c_dia + ' 23:59:59.000'
    }
  }

  ngOnInit() {
    /*this.getFase();
    this.getDepartamento();
    this.getProyectos();
    this.getTotales();
    this.getDepartamento_dash();*/
    this.getLineas();
    this.getMonInspeccion();
    this.getDatosGuia();
  }

  selectFase(id) {
    this.n_idgen_fase = id;
    this.idproyecto = 0;
    this.getProyectos();
    this.getTotales();
    this.getDepartamento_dash();
  }

  selectDepartamento(id) {
    this.iddepartamento = id;
    this.idproyecto = 0;
    this.getProvincia();
    this.getProyectos();
    this.getTotales();
    this.getDepartamento_dash();
  }

  selectProvincia(id) {
    this.idprovincia = id;
    this.getDistrito();
    this.getProyectos();
    this.getTotales();
    this.getDepartamento_dash();
  }

  selectDistrito(id) {
    this.iddistrito = id;
    this.getCentoPoblado();
    this.getProyectos();
    this.getTotales();
    this.getDepartamento_dash();
  }

  selectCentroPoblado(id) {
    this.idcentropoblado = id;
    this.getProyectos();
    this.getTotales();
    this.getDepartamento_dash();
  }

  selectProyecto(id) {
    this.idproyecto = id;
    this.getTotales();
    this.getDepartamento_dash();
  }

  selecVersion(id) {
    console.log("Slecet ID", id);   
    this.selectVersion = id;
    if(id == 1){
      this.selectedArr = this.expediente
      console.log(this.selectedArr);            
    }else if(id == 2){
      this.selectedArr = this.replanteo      
    }else if(id == 3){
      this.selectedArr = this.montaje     
    }else if(id == 4){
      this.selectedArr = this.cierre
    }
          
    this.getEstadoLineas();
  }

  getEstadoLineas(){
    if (this.myChartLineasEstado != undefined) {
      this.myChartLineasEstado.clear();
      this.myChartLineasEstado.destroy();
    } 
    
    this.myChartLineasEstado = new Chart('LineasEstado', {
      type: 'bar',
      data: {
        labels: this.tplinea,
        datasets: [{
          label: 'Total',
          data: this.total,
          backgroundColor: ['rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)'],
          borderColor: ['rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)','rgba(21, 101, 192)'],
          borderWidth: 1
        },{
          label: 'Validado',
          data: this.selectedArr,
          backgroundColor: ['rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)'],
          borderColor: ['rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)','rgba(255, 143, 0)'],
          borderWidth: 1
        }]
      },
      options: {
        legend: {  display: true },
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
  
  
  inicio(event){
    console.log(event);  
    this.fechaInicioInspecion = event.value  
    let dia = event.value.getDate().toString()
    let mes = (event.value.getMonth()+1).toString()
    let anio = event.value.getFullYear().toString()

    if (mes < 10) {
      mes = '0'+mes;
    }
    if (dia < 10) {
      dia = '0'+dia;
    }
    this.fechaInicio = anio + '-' + mes + '-' + dia + ' 00:00:00.000'

    console.log(this.fechaInicio);

    this.getMonInspeccion();
    
  }

  fin(event){
    console.log(event);    
    this.fechaFinalInspecion = event.value
    let dia = event.value.getDate().toString()
    let mes = (event.value.getMonth()+1).toString()
    let anio = event.value.getFullYear().toString()
    if (mes < 10) {
      mes = '0'+mes;
    }
    if (dia < 10) {
      dia = '0'+dia;
    }
    this.fechaFinal = anio + '-' + mes + '-' + dia + ' 23:59:59.000'
    this.fechaFinalBool = true;
    this.getMonInspeccion();
  }

  getMonInspeccion(){
    let request = {
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto,
      fechaInicio: this.fechaInicio,
      fechaFinal: this.fechaFinal      
    }
    console.log(request);
    
    this.dashboardServices.getMonInspecion(request, this.getToken().token).subscribe(result => {
      console.log("Exportar Todo result", result)
      if(result.estado){
       console.log(result.data);
       if (this.myChartInspeccion != undefined) {
        this.myChartInspeccion.clear();
        this.myChartInspeccion.destroy();
      } 
       this.myChartInspeccion = new Chart('INSPECCION', {
          type: 'bar',
          data: {
            labels: result.data.claves,
            datasets: [{
              label: '',
              data: result.data.cantidades,
              backgroundColor: AppSettings.COLOR,
              borderColor: AppSettings.COLOR_BORDER,
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
      }
    })
    
  }

  inicio2(event){
    console.log(event);    
    this.fechaInicioGuia = event.value
    let dia = event.value.getDate().toString()
    let mes = (event.value.getMonth()+1).toString()
    let anio = event.value.getFullYear().toString()
    
    if (mes < 10) {
      mes = '0'+mes;
    }
    if (dia < 10) {
      dia = '0'+dia;
    }
    this.fechaInicio2 = anio + '-' + mes + '-' + dia + ' 00:00:00.000'

    this.getDatosGuia();
    
  }

  fin2(event){
    console.log(event);    
    this.fechaFinalGuia = event.value
    let dia = event.value.getDate().toString()
    let mes = (event.value.getMonth()+1).toString()
    let anio = event.value.getFullYear().toString()
    if (mes < 10) {
      mes = '0'+mes;
    }
    if (dia < 10) {
      dia = '0'+dia;
    }
    this.fechaFinal2 = anio + '-' + mes + '-' + dia + ' 23:59:59.000'
    this.fechaFinalBool2 = true;
    this.getDatosGuia();
  }

  getDatosGuia(){
    let request = {
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto,
      fechaInicio: this.fechaInicio2,
      fechaFinal: this.fechaFinal2    
    }

    this.dashboardServices.getDatosGuia(request, this.getToken().token).subscribe(result => {
      console.log("Exportar Todo result", result)
      if(result.estado){
        console.log(result.data);
        if (this.myChartGuia != undefined) {
          this.myChartGuia.clear();
          this.myChartGuia.destroy();
        } 
       this.myChartGuia = new Chart('GUIAS', {
          type: 'bar',
          data: {
            labels: result.data.claves,
            datasets: [{
              label: '',
              data: result.data.cantidades,
              backgroundColor: AppSettings.COLOR,
              borderColor: AppSettings.COLOR_BORDER,
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
      }
    })
    
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
    this._ubigeo_service.get_departamento({}, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            console.log(result)
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

  getProvincia() {
    this._ubigeo_service.get_provincia({ n_idgen_departamento: this.iddepartamento }, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.provincias = result.data
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

  getDistrito() {
    this._ubigeo_service.get_distrito({ n_idgen_provincia: this.idprovincia, n_idgen_departamento: this.iddepartamento }, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.distritos = result.data
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

  getCentoPoblado() {
    this._ubigeo_service.get_centropoblado({ n_idgen_departamento: this.iddepartamento, n_idgen_provincia: this.idprovincia, n_idgen_distrito: this.iddistrito }).subscribe(
      result => {
        try {
          if (result.estado) {
            console.log(result);
            this.centropoblados = result.data
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

  getLineas(){    
    let request = {
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto
    }
    console.log(request);
    
    this.dashboardServices.getLineas(request, this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        this.dataResultado = <ResultadoApi>result;
        if(resultado.estado){
          console.log(result.data)
          if (this.myChartLineas != undefined) {
            this.myChartLineas.destroy();
          }            
          if (this.MyCharProgreso != undefined) {
            this.MyCharProgreso.destroy();
          }

          this.expediente = resultado.data.graficoLineaEstado.expediente
          
          this.replanteo = resultado.data.graficoLineaEstado.replanteo
          
          this.montaje = resultado.data.graficoLineaEstado.montaje
          
          this.cierre = resultado.data.graficoLineaEstado.cierre

          this.tplinea = resultado.data.graficoLineaEstado.tplinea

          this.total = resultado.data.graficoLineaEstado.total

          this.getEstadoLineas();

          this.myChartLineas = new Chart('Lineas_estructuras', {
            type: 'bar',
            data: {
              labels: resultado.data.graficolineas.claves,
              datasets: [{
                data: resultado.data.graficolineas.cantidades,
                backgroundColor: AppSettings.COLOR,
                borderColor: AppSettings.COLOR_BORDER,
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

          this.MyCharLineaZona = new Chart('lineaZona', {
            type: 'bar',
            data: {
              labels: resultado.data.graficozonas.claves,
              datasets: [{
                label: '',
                data: resultado.data.graficozonas.cantidades,
                backgroundColor: AppSettings.COLOR,
                borderColor: AppSettings.COLOR_BORDER,
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

          this.MyCharProgreso = new Chart('progreso', {
            type: 'line',
            data: {
              labels: resultado.data.graficolineas.claves,
              datasets: [
                {
                  label: 'ACTUAL',                  
                  data: resultado.data.graficolineas.cantidades,
                  borderColor: 'rgba(255, 0, 51)',
                  backgroundColor: 'rgba(255, 0, 51)',  
                  fill: false                
                },
                {
                  label: 'PROGRESO IDEAL',                  
                  data: resultado.data.graficolineas.cantidadesmon,
                  borderColor: 'rgba(51, 51, 255)',
                  backgroundColor: 'rgba(51, 51, 255)',   
                  fill: false                   
                }
              ]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Chart.js Line Chart'
                }
              }
            }
          });

          
          this.MyCharPeriodo = new Chart('periodo', {
            type: 'bar',
            data: {
              labels: resultado.data.graficoperiodo.claves,
              datasets: [{
                label: '',
                data: resultado.data.graficoperiodo.cantidades,
                backgroundColor: AppSettings.COLOR,
                borderColor: AppSettings.COLOR_BORDER,
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

          this.MyCharZona = new Chart('ZONA', {
            type: 'bar',
            data: {
              labels: resultado.data.graficozon.claves,
              datasets: [{
                label: '',
                data: resultado.data.graficozon.cantidades,
                backgroundColor: AppSettings.COLOR,
                borderColor: AppSettings.COLOR_BORDER,
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
          
          
        }else {
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

  openDialogProgreso(): void {        
    const dialogRef = this.dialog.open(DashboardProgresoComponent, {
      width: '950px', 
      data:  this.dataResultado
    });
    dialogRef.afterClosed().subscribe(result => {
      try {        
      } catch (error) {
        console.log(error);
      }
    });
  }  

  lineasEstructuras(): void {        
    const dialogRef = this.dialog.open(DashboardLineasEstructurasComponent, {
      width: '950px', 
      data:  this.dataResultado
    });
    dialogRef.afterClosed().subscribe(result => {
      try {        
      } catch (error) {
        console.log(error);
      }
    });
  }  

  lineaZona(): void {        
    const dialogRef = this.dialog.open(DashboardLineaZonaComponent, {
      width: '950px', 
      data:  this.dataResultado
    });
    dialogRef.afterClosed().subscribe(result => {
      try {       
      } catch (error) {
        console.log(error);
      }
    });
  }  

  openDialogPeriodo(): void {        
    const dialogRef = this.dialog.open(DashboardPeriodoComponent, {
      width: '950px', 
      data:  this.dataResultado
    });
    dialogRef.afterClosed().subscribe(result => {
      try {       
      } catch (error) {
        console.log(error);
      }
    });
  }  

  openDialogZona(): void {        
    const dialogRef = this.dialog.open(DashboardZonaComponent, {
      width: '950px', 
      data:  this.dataResultado
    });
    dialogRef.afterClosed().subscribe(result => {
      try {       
      } catch (error) {
        console.log(error);
      }
    });
  }  

  openLineaEstado(): void { 
    const dialogRef = this.dialog.open(DashboardLineaEstadoComponent, {
      width: '950px', 
      data:  {resultado: this.dataResultado, version: this.selectVersion}
    });
    dialogRef.afterClosed().subscribe(result => {
      try {       
      } catch (error) {
        console.log(error);
      }
    });
  }  

  openInpeccion(): void { 
    const dialogRef = this.dialog.open(DashboardInspeccionComponent, {
      width: '950px', 
      data:  {fechaInicio: this.fechaInicio, fechafinal: this.fechaFinal, fechaInicioInspecion: this.fechaInicioInspecion, fechaFinalInspecion: this.fechaFinalInspecion}
    });
    dialogRef.afterClosed().subscribe(result => {
      try {       
      } catch (error) {
        console.log(error);
      }
    });
  }  

  openGuias(): void { 
    const dialogRef = this.dialog.open(DashboardGuiasComponent, {
      width: '950px', 
      data:  {fechaInicio2: this.fechaInicio2, fechaFinal2: this.fechaFinal2, fechaFinalGuia: this.fechaFinalGuia, fechaInicioGuia: this.fechaInicioGuia}
    });
    dialogRef.afterClosed().subscribe(result => {
      try {       
      } catch (error) {
        console.log(error);
      }
    });
  }  


  getDepartamento_dash() {
    let rq = {
      n_idgen_departamento: this.iddepartamento,
      n_idgen_provincia: 0,
      n_idgen_distrito: 0,
      n_idgen_centropoblado: 0,
      n_idgen_fase: this.n_idgen_fase,
      n_idgen_proyecto: this.idproyecto
    }
    this.dashboardServices.getDepartamento(rq, this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          console.log(result.data)

          this.ntotalmontocontratado = 0;
          this.ntotalmontocontratado2 = 0;
          this.ntotalmontovalorizado = 0;
          this.ntotalLP = 0.00;
          this.ntotalRP = 0.00;
          this.ntotalRS = 0.00;
          this.ntotalLuminaria = 0.00;
          this.ntotalLPReforzamiento = 0.00;

          for (let i = 1; i <= resultado.data.graficofasemonto.cantidades.length; i++) {
            this.ntotalmontocontratado = this.ntotalmontocontratado + resultado.data.graficofasemonto.cantidades[i - 1];
          }

          for (let i = 1; i <= resultado.data.graficofasemontovalorizado.cantidades.cantidadfasesmontovalorizado.length; i++) {
            this.ntotalmontovalorizado = this.ntotalmontovalorizado + resultado.data.graficofasemontovalorizado.cantidades.cantidadfasesmontovalorizado[i - 1];
          }

          for (let i = 1; i <= resultado.data.graficofasemontovalorizado.cantidades.cantidadfasesmontocontratado.length; i++) {
            this.ntotalmontocontratado2 = this.ntotalmontocontratado2 + resultado.data.graficofasemontovalorizado.cantidades.cantidadfasesmontocontratado[i - 1];
          }
          /* */

          this.nporcentajevalorizado = (this.ntotalmontovalorizado / this.ntotalmontocontratado2) * 100;
          
          for (let i = 1; i <= resultado.data.graficolinea.cantidades.length; i++) {
            console.log(resultado.data.graficolinea.cantidades[i - 1]);
            this.ntotalLP = this.ntotalLP + resultado.data.graficolinea.cantidades[i - 1];
          }

          for (let i = 1; i <= resultado.data.graficolinearp.cantidades.length; i++) {
            this.ntotalRP = this.ntotalRP + resultado.data.graficolinearp.cantidades[i - 1];
          }

          for (let i = 1; i <= resultado.data.graficolinears.cantidades.length; i++) {
            this.ntotalRS = this.ntotalRS + resultado.data.graficolinears.cantidades[i - 1];
          }

          for (let i = 1; i <= resultado.data.graficoluminaria.cantidades.length; i++) {
            this.ntotalLuminaria = this.ntotalLuminaria + resultado.data.graficoluminaria.cantidades[i - 1];
          }

          for (let i = 1; i <= resultado.data.graficolpreforzamiento.cantidades.length; i++) {
            this.ntotalLPReforzamiento = this.ntotalLPReforzamiento + resultado.data.graficolpreforzamiento.cantidades[i - 1];
          }

          /*if (this.myChartBenefiario != undefined) {
            this.myChartBenefiario.destroy();
          }*/

          

          if (this.MyCharMontoValorizado != undefined) {
            this.MyCharMontoValorizado.destroy();
          }

          if (this.MyCharLineaZona != undefined) {
            this.MyCharLineaZona.destroy();
          }
          if (this.MyCharRedPrimaria != undefined) {
            this.MyCharRedPrimaria.destroy();
          }
          if (this.MyCharRedSecundaria != undefined) {
            this.MyCharRedSecundaria.destroy();
          }

          if (this.MyCharTipoEjecucion != undefined) {
            this.MyCharTipoEjecucion.destroy();
          }

          if (this.MyCharLuminaria != undefined) {
            this.MyCharLuminaria.destroy();
          }

          if (this.MyCharLPReforzamiento != undefined) {
            this.MyCharLPReforzamiento.destroy();
          }
          /*
          this.myChartBenefiario = new Chart('beneficiearioproyecto', {
            type: 'bar',
            data: {
              labels: resultado.data.graficodepartamento.claves,
              datasets: [{
                data: resultado.data.graficodepartamento.cantidades,
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
          */
          this.MyCharLineaZona = new Chart('linealp', {
            type: 'bar',
            data: {
              labels: resultado.data.graficolinea.claves,
              datasets: [{
                label: '',
                data: resultado.data.graficolinea.cantidades,
                backgroundColor: [
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
                  'rgba(255, 152, 0,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',
                  'rgba(136, 14, 79,1.0)',
                  'rgba(74, 20, 140,1.0)',
                  'rgba(49, 27, 146,1.0)',
                  'rgba(26, 35, 126,1.0)',
                  'rgba(51, 105, 30,1.0)',
                ],
                borderColor: [
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
                  'rgba(255, 152, 0,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',
                  'rgba(136, 14, 79,1.0)',
                  'rgba(74, 20, 140,1.0)',
                  'rgba(49, 27, 146,1.0)',
                  'rgba(26, 35, 126,1.0)',
                  'rgba(51, 105, 30,1.0)',
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

          this.MyCharRedPrimaria = new Chart('linearp', {
            type: 'bar',
            data: {
              labels: resultado.data.graficolinearp.claves,
              datasets: [{
                label: '',
                data: resultado.data.graficolinearp.cantidades,
                backgroundColor: [
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
                  'rgba(255, 152, 0,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',

                ],
                borderColor: [
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
                  'rgba(255, 152, 0,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',

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

          this.MyCharRedSecundaria = new Chart('linears', {
            type: 'bar',
            data: {
              labels: resultado.data.graficolinears.claves,
              datasets: [{
                label: '',
                data: resultado.data.graficolinears.cantidades,
                backgroundColor: [
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
                  'rgba(0, 188, 212,1.0)',
                  'rgba(0, 150, 136,1.0)',
                  'rgba(76, 175, 80,1.0)',
                  'rgba(139, 195, 74,1.0)',
                  'rgba(205, 220, 57,1.0)',

                ],
                borderColor: [
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
                  'rgba(0, 188, 212,1.0)',
                  'rgba(0, 150, 136,1.0)',
                  'rgba(76, 175, 80,1.0)',
                  'rgba(139, 195, 74,1.0)',
                  'rgba(205, 220, 57,1.0)',

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

          this.MyCharLuminaria = new Chart('luminaria', {
            type: 'bar',
            data: {
              labels: resultado.data.graficoluminaria.claves,
              datasets: [{
                label: '',
                data: resultado.data.graficoluminaria.cantidades,
                backgroundColor: [
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
                  'rgba(0, 188, 212,1.0)',
                  'rgba(0, 150, 136,1.0)',

                ],
                borderColor: [
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
                  'rgba(0, 188, 212,1.0)',
                  'rgba(0, 150, 136,1.0)',

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

          this.MyCharTipoEjecucion = new Chart('tipoejecucion', {
            type: 'doughnut',
            data: {
              labels: resultado.data.graficotipoejecucion.claves,
              datasets: [{
                label: '# of Votes',
                data: resultado.data.graficotipoejecucion.cantidades,
                backgroundColor: [
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
                  'rgba(255, 152, 0,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',
                  'rgba(136, 14, 79,1.0)',
                  'rgba(74, 20, 140,1.0)',

                ],
                borderColor: [
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
                  'rgba(255, 152, 0,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',
                  'rgba(136, 14, 79,1.0)',
                  'rgba(74, 20, 140,1.0)',

                ],
                borderWidth: 1
              }]
            }
          });
          
          this.MyCharTipoEjecucion = new Chart('fasemonto', {
            type: 'doughnut',
            data: {
              labels: resultado.data.graficofasemonto.claves,
              datasets: [{
                label: '# of Votes',
                data: resultado.data.graficofasemonto.cantidades,
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
            }
          });
          this.MyCharMontoValorizado = new Chart('fasemontovalorizado', {
            type: 'bar',
            data: {
              labels: resultado.data.graficofasemontovalorizado.claves,
              datasets: [{
                label: 'Monto Contratado',
                data: resultado.data.graficofasemontovalorizado.cantidades.cantidadfasesmontocontratado,
                backgroundColor: [
                  /*'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(201, 203, 207)',*/
                  'rgba(0, 188, 212,1.0)',
                  'rgba(0, 150, 136,1.0)',
                  'rgba(76, 175, 80,1.0)',
                  'rgba(139, 195, 74,1.0)',
                  'rgba(205, 220, 57,1.0)',
                ]
              }, {
                label: 'Monto Valorizado',
                data: resultado.data.graficofasemontovalorizado.cantidades.cantidadfasesmontovalorizado,
                backgroundColor: [
                  /*'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(201, 203, 207)',*/
                  'rgba(255, 235, 59,1.0)',
                  'rgba(255, 193, 7,1.0)',
                  'rgba(255, 152, 0,1.0)',
                  'rgba(255, 87, 34,1.0)',
                  'rgba(121, 85, 72,1.0)',
                ]
              }]
            }, options: {
              responsive: true,
              legend: {
                position: 'top',
                display: false
              },
              title: {
                display: false,
                text: ''
              },
              animation: {
                animateScale: true,
                animateRotate: true
              }
            }
          });

          this.MyCharLPReforzamiento = new Chart('linealpref', {
            type: 'bar',
            data: {
              labels: resultado.data.graficolpreforzamiento.claves,
              datasets: [{
                data: resultado.data.graficolpreforzamiento.cantidades,
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

  getTotales() {
    let rq = {
      n_idgen_departamento: this.iddepartamento,
      n_idgen_provincia: this.idprovincia,
      n_idgen_distrito: this.iddistrito,
      n_idgen_fase: this.n_idgen_fase,
      n_idgen_proyecto: this.idproyecto
    }
    console.log(rq);
    this.dashboardServices.gettotales(rq, this.getToken().token).subscribe(
      result => {
        console.log(result)
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          console.log(resultado.data);
          let fila1 = resultado.data.filter(o => o.orden == 1);

          if (fila1.length > 0) {
            console.log(fila1);
            this.ntotproyecto1 = resultado.data[0].totproyectos;
            this.nsinasignacionf1 = resultado.data[0].fase0;
            this.npreinversion1 = resultado.data[0].fase1;
            this.nestudiodef1 = resultado.data[0].fase2;
            this.nejecucion1 = resultado.data[0].fase3;
            this.nsupervision1 = resultado.data[0].fase4;
            this.ncierre1 = resultado.data[0].fase5;
          } else {
            this.ntotproyecto1 = 0;
            this.nsinasignacionf1 = 0;
            this.npreinversion1 = 0;
            this.nestudiodef1 = 0;
            this.nejecucion1 = 0;
            this.nsupervision1 = 0;
            this.ncierre1 = 0;
          }

          let fila2 = resultado.data.filter(o => o.orden == 2);
          if (fila2.length > 0) {
            this.ntotproyecto2 = resultado.data[1].totproyectos;
            this.nsinasignacionf2 = resultado.data[1].fase0;
            this.npreinversion2 = resultado.data[1].fase1;
            this.nestudiodef2 = resultado.data[1].fase2;
            this.nejecucion2 = resultado.data[1].fase3;
            this.nsupervision2 = resultado.data[1].fase4;
            this.ncierre2 = resultado.data[1].fase5;
          } else {
            this.ntotproyecto2 = 0;
            this.nsinasignacionf2 = 0;
            this.npreinversion2 = 0;
            this.nestudiodef2 = 0;
            this.nejecucion2 = 0;
            this.nsupervision2 = 0;
            this.ncierre2 = 0;
          }

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

  getProyectos() {
    let req = {
      n_idgen_fase: this.n_idgen_fase,
      n_idgen_departamento: this.iddepartamento,
      n_idgen_provincia: 0,
      n_idgen_distrito: 0,
      n_idgen_centropoblado: 0
    }

    this._proyecto_service.get(req).subscribe(
      result => {
        try {
          if (result.estado) {
            this.proyectos = result.data
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

  printToCart(printSectionId: string) {
    this.myChartLineas.printSectionId(printSectionId)
  }
}

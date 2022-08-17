import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { BaseComponent } from 'src/app/component/base/base.component';
import { DashboardService } from 'src/app/service/dashboard.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard-inspeccion',
  templateUrl: './dashboard-inspeccion.component.html',
  styleUrls: ['./dashboard-inspeccion.component.css'],
  providers: [DashboardService]
})
export class DashboardInspeccionComponent extends BaseComponent implements OnInit {
  fechaInicio= "";
  fechaFinal= "";

  fechaBool = true;
  fechaFinalBool = false;

  public myChartInspeccion: any;

  constructor(
    public dialogRef: MatDialogRef<DashboardInspeccionComponent>,    
    @Inject(MAT_DIALOG_DATA) public dataResultado: any,
    private dashboardServices: DashboardService,
    public _router: Router,
    public snackBar: MatSnackBar
  ) {
    super(snackBar, _router); 
    let anio = new Date().getFullYear();
    let mes = new Date().getMonth() +1;
    let dia = new Date().getDate();
    
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

    }else{
      this.fechaInicio = anio + '-' + c_mesInicio + '-' + c_dia + ' 00:00:00.000'
      this.fechaFinal = anio + '-' + c_mesFinal + '-' + c_dia + ' 23:59:59.000'
    }
   }

  ngOnInit() {
    this.getMonInspeccion();
  }

  inicio(event){
    console.log(event);    
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
    this.fechaBool = false
    console.log(this.fechaInicio);

    if(this.fechaFinalBool){
      console.log(this.fechaFinal);      
      this.getMonInspeccion();
    }
    
  }

  fin(event){
    console.log(event);    
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

    this.dashboardServices.getMonInspecion(request, this.getToken().token).subscribe(result => {
      console.log("Exportar Todo result", result)
      if(result.estado){
       console.log(result.data);
       if (this.myChartInspeccion != undefined) {
        this.myChartInspeccion.clear();
        this.myChartInspeccion.destroy();
      } 
       this.myChartInspeccion = new Chart('INSPECCION_', {
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

}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/appsettings';
import { BaseComponent } from 'src/app/component/base/base.component';
import { DashboardService } from 'src/app/service/dashboard.service';
import { Chart } from 'chart.js';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard-guias',
  templateUrl: './dashboard-guias.component.html',
  styleUrls: ['./dashboard-guias.component.css'],
  providers: [DashboardService]
})
export class DashboardGuiasComponent extends BaseComponent implements OnInit {
  public myChartGuia: any;

  fechaInicio2= "";
  fechaFinal2= "";


  date = new FormControl(new Date());
  date2;

  constructor(
    public dialogRef: MatDialogRef<DashboardGuiasComponent>,    
    @Inject(MAT_DIALOG_DATA) public dataResultado: any,
    private dashboardServices: DashboardService,
    public _router: Router,
    public snackBar: MatSnackBar
  ) {
    super(snackBar, _router); 
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
      this.fechaInicio2 = anio + '-' + c_mesInicio + '-28 00:00:00.000'
      this.fechaFinal2 = anio + '-' + c_mesFinal + '-' + c_dia + ' 23:59:59.000'
    }else{
      this.fechaInicio2 = anio + '-' + c_mesInicio + '-' + c_dia + ' 00:00:00.000'
      this.fechaFinal2 = anio + '-' + c_mesFinal + '-' + c_dia + ' 23:59:59.000'
    }
   }

  ngOnInit() {
    if(this.dataResultado.fechaInicioGuia){
      let event = this.dataResultado.fechaInicioGuia
      let dia = event.getDate().toString()
      let mes = (event.getMonth()+1).toString()
      let anio = event.getFullYear().toString()
      this.date2 =  new FormControl(new Date(anio, (mes-1), dia));
    }

    if(this.dataResultado.fechaFinalGuia){
      let event = this.dataResultado.fechaFinalGuia
      let dia = event.getDate().toString()
      let mes = (event.getMonth()+1).toString()
      let anio = event.getFullYear().toString()
      this.date =  new FormControl(new Date(anio, (mes-1), dia));
    }

    this.fechaInicio2 = this.dataResultado.fechaInicio2
    this.fechaFinal2 = this.dataResultado.fechaFinal2
    this.getDatosGuia();
  }
  
  inicio2(event){
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
 
    this.getDatosGuia();
    
    
  }

  fin2(event){
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
    this.fechaFinal2 = anio + '-' + mes + '-' + dia + ' 23:59:59.000'
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
       this.myChartGuia = new Chart('GUIAS_', {
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

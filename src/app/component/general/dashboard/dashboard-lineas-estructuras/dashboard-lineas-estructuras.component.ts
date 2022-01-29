import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../base/base.component';
import { Chart } from 'chart.js';
import { AppSettings } from 'src/app/common/appsettings';

@Component({
  selector: 'app-dashboard-lineas-estructuras',
  templateUrl: './dashboard-lineas-estructuras.component.html',
  styleUrls: ['./dashboard-lineas-estructuras.component.css']
})
export class DashboardLineasEstructurasComponent extends BaseComponent implements OnInit {
  public myChartLineas: any;
  constructor(
    public dialogRef: MatDialogRef<DashboardLineasEstructurasComponent>,    
    @Inject(MAT_DIALOG_DATA) public dataResultado: any,
    public _router: Router,
    public snackBar: MatSnackBar
  ) {
    super(snackBar, _router); 
   }

  ngOnInit() {
    
    this.getLineas();   
  }

  getLineas(){   
    this.myChartLineas = new Chart('Lineas_estructura', {
      type: 'bar',
      data: {
        labels: this.dataResultado.data.graficolineas.claves,
        datasets: [{
          data: this.dataResultado.data.graficolineas.cantidades,
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

}

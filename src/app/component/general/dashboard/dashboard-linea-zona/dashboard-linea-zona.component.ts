import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../base/base.component';
import { Chart } from 'chart.js';
import { AppSettings } from 'src/app/common/appsettings';

@Component({
  selector: 'app-dashboard-linea-zona',
  templateUrl: './dashboard-linea-zona.component.html',
  styleUrls: ['./dashboard-linea-zona.component.css']
})
export class DashboardLineaZonaComponent extends BaseComponent implements OnInit {
  public MyCharLineaZona: any;
  constructor(
    public dialogRef: MatDialogRef<DashboardLineaZonaComponent>,    
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
    this.MyCharLineaZona = new Chart('lineaZonas', {
      type: 'bar',
      data: {
        labels: this.dataResultado.data.graficozonas.claves,
        datasets: [{
          label: '',
          data: this.dataResultado.data.graficozonas.cantidades,
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
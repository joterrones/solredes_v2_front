import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../base/base.component';
import { Chart } from 'chart.js';
import { AppSettings } from 'src/app/common/appsettings';

@Component({
  selector: 'app-dashboard-zona',
  templateUrl: './dashboard-zona.component.html',
  styleUrls: ['./dashboard-zona.component.css']
})
export class DashboardZonaComponent extends BaseComponent implements OnInit {
  public MyCharZona: any;

  constructor(
    public dialogRef: MatDialogRef<DashboardZonaComponent>,    
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
    this.MyCharZona = new Chart('zonas', {
      type: 'bar',
      data: {
        labels: this.dataResultado.data.graficozon.claves,
        datasets: [{
          label: '',
          data: this.dataResultado.data.graficozon.cantidades,
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
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../base/base.component';
import { Chart } from 'chart.js';
import { AppSettings } from 'src/app/common/appsettings';


@Component({
  selector: 'app-dashboard-periodo',
  templateUrl: './dashboard-periodo.component.html',
  styleUrls: ['./dashboard-periodo.component.css']
})
export class DashboardPeriodoComponent extends BaseComponent implements OnInit {
  public MyCharPeriodo: any;
  constructor(
    public dialogRef: MatDialogRef<DashboardPeriodoComponent>,    
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
    this.MyCharPeriodo = new Chart('periodos', {
      type: 'bar',
      data: {
        labels: this.dataResultado.data.graficoperiodo.claves,
        datasets: [{
          label: '',
          data: this.dataResultado.data.graficoperiodo.cantidades,
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

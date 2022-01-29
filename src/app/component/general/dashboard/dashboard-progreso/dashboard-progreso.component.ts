import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../base/base.component';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard-progreso',
  templateUrl: './dashboard-progreso.component.html',
  styleUrls: ['./dashboard-progreso.component.css']
})
export class DashboardProgresoComponent extends BaseComponent implements OnInit {
  public MyCharProgreso: any;

  constructor(
    public dialogRef: MatDialogRef<DashboardProgresoComponent>,    
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
    console.log(this.dataResultado);

    if (this.MyCharProgreso != undefined) {
      this.MyCharProgreso.destroy();
    }

    this.MyCharProgreso = new Chart('progresos', {
      type: 'line',
      data: {
        labels: this.dataResultado.data.graficolineas.claves,
        datasets: [
          {
            label: 'ACTUAL',                  
            data: this.dataResultado.data.graficolineas.cantidades,
            borderColor: 'rgba(255, 0, 51)',
            backgroundColor: 'rgba(255, 0, 51)',  
            fill: false                
          },
          {
            label: 'PROGRESO IDEAL',                  
            data: this.dataResultado.data.graficolineas.cantidadesmon,
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
          
  }

}

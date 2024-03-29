import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { AppSettings } from 'src/app/common/appsettings';
import { BaseComponent } from '../../../base/base.component';

@Component({
  selector: 'app-dashboard-linea-estado',
  templateUrl: './dashboard-linea-estado.component.html',
  styleUrls: ['./dashboard-linea-estado.component.css']
})
export class DashboardLineaEstadoComponent extends BaseComponent implements OnInit {
  public myChartLineasEstado: any;
  
  tplinea = [];
  expediente = [];
  replanteo = [];
  montaje = [];
  cierre = [];
  selectedArr = [];
  total = [];
  

  versiones =[
    { id: 1, nombre: "Expediente" },
    { id: 2, nombre: "Replanteo" },
    { id: 3, nombre: "Montaje" },
    { id: 4, nombre: "Cierre" },
  ];

  selectVersion

  constructor(
    public dialogRef: MatDialogRef<DashboardLineaEstadoComponent>,    
    @Inject(MAT_DIALOG_DATA) public dataResultado: any,
    public _router: Router,
    public snackBar: MatSnackBar
  ) {
    super(snackBar, _router); 
   }

  ngOnInit() {    
    console.log(this.dataResultado);
    this.expediente = this.dataResultado.resultado.data.graficoLineaEstado.expediente
    
    this.replanteo = this.dataResultado.resultado.data.graficoLineaEstado.replanteo
    
    this.montaje = this.dataResultado.resultado.data.graficoLineaEstado.montaje
    
    this.cierre = this.dataResultado.resultado.data.graficoLineaEstado.cierre

    this.tplinea = this.dataResultado.resultado.data.graficoLineaEstado.tplinea

    this.total = this.dataResultado.resultado.data.graficoLineaEstado.total
    
    if(this.dataResultado.version){
      this.selectVersion = this.dataResultado.version
      if(this.selectVersion == 1){
        this.selectedArr = this.expediente   
      }else if(this.selectVersion == 2){
        this.selectedArr = this.replanteo      
      }else if(this.selectVersion == 3){
        this.selectedArr = this.montaje     
      }else if(this.selectVersion == 4){
        this.selectedArr = this.cierre
      }
    }
    this.getEstadoLineas();  

  }
  selecVersion(id) {
    console.log("Slecet ID", id);   
    
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
    this.myChartLineasEstado = new Chart('LineasEstados', {
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
}

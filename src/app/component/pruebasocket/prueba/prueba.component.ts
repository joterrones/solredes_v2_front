import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { SocketWebService } from 'src/app/service/socket.services';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent extends BaseComponent implements OnInit {
  a = 0;
  constructor(
    private socketWebService: SocketWebService,
    public _router: Router,
    public snackBar: MatSnackBar,
  ) { 
    super(snackBar, _router)
    this.socketWebService.outEven.subscribe(res => {
      console.log("responde back soccket "+ res);
      this.a += parseInt(res);
      console.log(this.a);
    })
   }

  ngOnInit() {
  }

  irProyecto(){
    this.socketWebService.emitEvent("1")
  }

}

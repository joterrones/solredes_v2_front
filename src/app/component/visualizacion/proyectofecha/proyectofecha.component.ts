import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '../../base/base.component';
import { Inject } from '@angular/core';
import { ProyectoService } from '../../../service/proyecto.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings';
import { ConfirmComponent } from '../../general/confirm/confirm.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
@Component({
  selector: 'app-proyectofecha',
  templateUrl: './proyectofecha.component.html',
  styleUrls: ['./proyectofecha.component.css'],
  providers: [ProyectoService]
})
export class ProyectofechaComponent extends BaseComponent implements OnInit {
  dateprogramada = new FormControl(new Date());
  d_fecha: any;

  ngOnInit() {

  }

  constructor(
    private _proyecto_service: ProyectoService,
    public _router: Router, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar) {
    super(snackBar, _router);
    this.dateprogramada = new FormControl(new Date());

  }
  save() {
    console.log(this.d_fecha)
    if (this.d_fecha != undefined) {
      const dialogRef = this.dialog.open(ConfirmComponent, {
        width: '500px',
        data: { titulo: "Desea generar las fechas automaticamente?" }
      });
      dialogRef.afterClosed().subscribe(result => {

        if (result) {
          this.guardar();
        }
      });
    } else {
      this.openSnackBar("Seleccione una fecha", 99);
    }

  }
  setfechafin(event: MatDatepickerInputEvent<Date>) {
    this.d_fecha = event.value;
  }

  guardar() {

 
    let rq = {
      n_idgen_proyecto: this.data.n_idgen_proyecto,
      d_fecha: this.d_fecha
    }
    console.log(rq);
    this._proyecto_service.fechar_tarea(rq, this.getToken().token).subscribe(
      result => {
        console.log(result);
        try {
          if (result.estado) {
            this.openSnackBar("Dato Guardado!", 200);
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

}

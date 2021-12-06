import { Component, OnInit, ɵConsole } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../common/appsettings'
import { Router } from "@angular/router";
import { BaseComponent } from '../../base/base.component';
import { GeneralService } from '../../../service/general.service';
@Component({
  selector: 'app-diaferiado',
  templateUrl: './diaferiado.component.html',
  styleUrls: ['./diaferiado.component.css'],
  providers: [GeneralService]
})
export class DiaferiadoComponent extends BaseComponent implements OnInit {

  diasferiados = [];
  dias = 0;
  diassemana = 7;
  semanas = [];
  diasmes = [];
  nombre_semanas = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];

  anios = [];
  meses = [{ id: 1, mes: "ENERO" }, { id: 2, mes: "FEBRERO" }, { id: 3, mes: "MARZO" }, { id: 4, mes: "ABRIL" }, { id: 5, mes: "MAYO" }, { id: 6, mes: "JUNIO" },
  { id: 7, mes: "JULIO" }, { id: 8, mes: "AGOSTO" }, { id: 9, mes: "SEPTIEMBRE" }, { id: 10, mes: "OCTUBRE" }, { id: 11, mes: "NOVIEMBRE" }, { id: 12, mes: "DICIEMBRE" }];

  nombre_anio = 2020;
  id_mes = 6;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public _general_service: GeneralService,
    public dialog: MatDialog
  ) {
    super(snackBar, router);
  }

  ngOnInit() {
    this.getferiado();

  }


  getferiado() {

    this._general_service.get_feriado(this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.diasferiados = result.data;
            console.log("datos")
            console.log(this.diasferiados)
            this.generar_anios(1980, 2040);
            this.diasEnUnMes();
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

  saveferiado(id_dia) {
    let request = {
      n_anio: this.nombre_anio,
      n_mes: this.id_mes,
      n_dia: id_dia
    }
    console.log,
    this._general_service.save_feriado(request, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getferiado();
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
  generar_anios(min_anios, max_anios) {
    for (let index = max_anios; index > min_anios; index--) {
      this.anios.push(index);
    }
  }

  diasEnUnMes() {
    this.semanas = [];

    this.dias = new Date(this.nombre_anio, this.id_mes, 0).getDate();
    let n_diainicio = new Date(this.nombre_anio, this.id_mes - 1, 1).getDay();
    this.construircalendario(n_diainicio);
  }

  construircalendario(n_diainicio) {

    let dias = [];
    let index_dias = 0;
    let index_senama = 0;
    let index_senama_rotar = 0;

    for (let index = 0; index < this.dias + (n_diainicio) + 7; index++) {

      index_senama_rotar++;

      if (index >= n_diainicio) {

        if (index_dias < this.dias) {
          index_dias++;
          let dia = { n_dia: index_dias, b_esferiado: this.validaferiado(index_dias,  this.id_mes, this.nombre_anio) };
          dias.push(dia);
          if (index_senama_rotar == 7) {
            index_senama_rotar = 0;
            index_senama++;
            let semana = { n_semana: index_senama, dias: dias };
            this.semanas.push(semana);
            dias = [];
          }

          this.diasmes.push(index_dias);

        } else {
          let dia = { n_dia: 0 };
          dias.push(dia);
          if (index_senama_rotar == 7) {
            index_senama_rotar = 0;
            index_senama++;

            let semana = { n_semana: index_senama, dias: dias };
            this.semanas.push(semana);
            dias = [];
          }
          this.diasmes.push(index_dias);
        }
      } else {
        let dia = { n_dia: 0 };
        dias.push(dia);
        if (index_senama_rotar == 7) {
          index_senama_rotar = 0;
          index_senama++;

          let semana = { n_semana: index_senama, dias: dias };
          this.semanas.push(semana);
          dias = [];
        }
        this.diasmes.push(index_dias);
      }

    }


  }

  validaferiado(dia, mes, anio) {
   /* console.log(dia);
    console.log(mes);*/
    console.log(this.diasferiados);
    let esfariado = this.diasferiados.filter(o => o.n_anio == anio && o.n_mes == mes && o.n_dia == dia);
    console.log(esfariado);
    if (esfariado.length > 0) {
      console.log(true);
      return true;
    } else {
      return false;
    }
  }

}

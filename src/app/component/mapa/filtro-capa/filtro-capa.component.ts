import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { transformWithProjections } from 'ol/proj';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-filtro-capa',
  templateUrl: './filtro-capa.component.html',
  styleUrls: ['./filtro-capa.component.css']
})
export class FiltroCapaComponent extends BaseComponent implements OnInit {
  FILTRO_HISTORICO: string = "filtroHistorico";
  constructor(
    public dialogRef: MatDialogRef<FiltroCapaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _router: Router,
    public snackBar: MatSnackBar
  ) {
    super(snackBar, _router);
  }

  ngOnInit() {
    localStorage.setItem(this.FILTRO_HISTORICO, JSON.stringify(this.data));
    this.dialogRef.disableClose = true;
  }

  aceptar() {
    this.data.flag = true;
    this.dialogRef.close(this.data);
  }

  cancelar(){
    this.data.flag= false;
    this.data = JSON.parse(localStorage.getItem(this.FILTRO_HISTORICO));
    console.log("filtro Cancelar", this.data);
    this.dialogRef.close(this.data);
  }

  updateAllComplete(task) {
    task.completed = task.subtasks != null && task.subtasks.every(t => t.completed);
  }

  someComplete(task): boolean {
    if (task.subtasks == null) {
      return false;
    }
    return task.subtasks.filter(t => t.completed).length > 0 && !task.completed;
  }

  setAll(completed: boolean, task) {
    task.completed = completed;
    if (task.subtasks == null) {
      return;
    }
    task.subtasks.forEach(t => (t.completed = completed));
  }

}

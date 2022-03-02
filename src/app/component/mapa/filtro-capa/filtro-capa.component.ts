import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-filtro-capa',
  templateUrl: './filtro-capa.component.html',
  styleUrls: ['./filtro-capa.component.css']
})
export class FiltroCapaComponent extends BaseComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FiltroCapaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _router: Router,
    public snackBar: MatSnackBar
  ) {
    super(snackBar, _router);
  }

  ngOnInit() {
    this.dialogRef.disableClose = true;
  }

  aceptar() {
    this.dialogRef.close(this.data);
  }
  //allComplete: boolean = false;

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

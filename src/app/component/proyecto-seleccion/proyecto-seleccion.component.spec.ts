import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoSeleccionComponent } from './proyecto-seleccion.component';

describe('ProyectoSeleccionComponent', () => {
  let component: ProyectoSeleccionComponent;
  let fixture: ComponentFixture<ProyectoSeleccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoSeleccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

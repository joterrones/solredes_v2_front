import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoubicacionComponent } from './proyectoubicacion.component';

describe('ProyectoubicacionComponent', () => {
  let component: ProyectoubicacionComponent;
  let fixture: ComponentFixture<ProyectoubicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoubicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoubicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

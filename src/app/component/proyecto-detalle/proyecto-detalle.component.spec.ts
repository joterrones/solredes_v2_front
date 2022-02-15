import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoDetalleComponent } from './proyecto-detalle.component';

describe('ProyectoDetalleComponent', () => {
  let component: ProyectoDetalleComponent;
  let fixture: ComponentFixture<ProyectoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

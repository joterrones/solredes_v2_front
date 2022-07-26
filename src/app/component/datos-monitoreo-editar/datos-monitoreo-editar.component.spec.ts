import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosMonitoreoEditarComponent } from './datos-monitoreo-editar.component';

describe('DatosMonitoreoEditarComponent', () => {
  let component: DatosMonitoreoEditarComponent;
  let fixture: ComponentFixture<DatosMonitoreoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosMonitoreoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosMonitoreoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

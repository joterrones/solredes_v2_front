import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosMonitoreoComponent } from './datos-monitoreo.component';

describe('DatosMonitoreoComponent', () => {
  let component: DatosMonitoreoComponent;
  let fixture: ComponentFixture<DatosMonitoreoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosMonitoreoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosMonitoreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

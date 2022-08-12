import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosMonitoreoPopupComponent } from './datos-monitoreo-popup.component';

describe('DatosMonitoreoPopupComponent', () => {
  let component: DatosMonitoreoPopupComponent;
  let fixture: ComponentFixture<DatosMonitoreoPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosMonitoreoPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosMonitoreoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

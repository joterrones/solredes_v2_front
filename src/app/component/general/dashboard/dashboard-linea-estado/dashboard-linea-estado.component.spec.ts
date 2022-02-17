import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLineaEstadoComponent } from './dashboard-linea-estado.component';

describe('DashboardLineaEstadoComponent', () => {
  let component: DashboardLineaEstadoComponent;
  let fixture: ComponentFixture<DashboardLineaEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardLineaEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLineaEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

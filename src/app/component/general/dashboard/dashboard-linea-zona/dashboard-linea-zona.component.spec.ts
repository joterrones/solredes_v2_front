import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLineaZonaComponent } from './dashboard-linea-zona.component';

describe('DashboardLineaZonaComponent', () => {
  let component: DashboardLineaZonaComponent;
  let fixture: ComponentFixture<DashboardLineaZonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardLineaZonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLineaZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

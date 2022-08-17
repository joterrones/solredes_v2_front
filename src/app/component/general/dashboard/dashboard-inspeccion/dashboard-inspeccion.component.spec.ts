import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInspeccionComponent } from './dashboard-inspeccion.component';

describe('DashboardInspeccionComponent', () => {
  let component: DashboardInspeccionComponent;
  let fixture: ComponentFixture<DashboardInspeccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInspeccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInspeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

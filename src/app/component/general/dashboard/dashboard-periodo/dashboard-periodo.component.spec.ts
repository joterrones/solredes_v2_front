import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPeriodoComponent } from './dashboard-periodo.component';

describe('DashboardPeriodoComponent', () => {
  let component: DashboardPeriodoComponent;
  let fixture: ComponentFixture<DashboardPeriodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPeriodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

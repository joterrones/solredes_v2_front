import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLineasEstructurasComponent } from './dashboard-lineas-estructuras.component';

describe('DashboardLineasEstructurasComponent', () => {
  let component: DashboardLineasEstructurasComponent;
  let fixture: ComponentFixture<DashboardLineasEstructurasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardLineasEstructurasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLineasEstructurasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

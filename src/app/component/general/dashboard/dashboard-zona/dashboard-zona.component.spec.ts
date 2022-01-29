import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardZonaComponent } from './dashboard-zona.component';

describe('DashboardZonaComponent', () => {
  let component: DashboardZonaComponent;
  let fixture: ComponentFixture<DashboardZonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardZonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

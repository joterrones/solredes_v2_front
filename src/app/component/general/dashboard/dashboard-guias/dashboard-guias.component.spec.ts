import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGuiasComponent } from './dashboard-guias.component';

describe('DashboardGuiasComponent', () => {
  let component: DashboardGuiasComponent;
  let fixture: ComponentFixture<DashboardGuiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardGuiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardGuiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

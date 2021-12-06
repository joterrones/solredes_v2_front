import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardbolsaComponent } from './dashboardbolsa.component';

describe('DashboardbolsaComponent', () => {
  let component: DashboardbolsaComponent;
  let fixture: ComponentFixture<DashboardbolsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardbolsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardbolsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

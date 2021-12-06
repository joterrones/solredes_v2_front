import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportControlSupervisorComponent } from './export-control-supervisor.component';

describe('ExportControlSupervisorComponent', () => {
  let component: ExportControlSupervisorComponent;
  let fixture: ComponentFixture<ExportControlSupervisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportControlSupervisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportControlSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

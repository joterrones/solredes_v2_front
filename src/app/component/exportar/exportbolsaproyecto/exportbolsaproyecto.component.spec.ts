import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportbolsaproyectoComponent } from './exportbolsaproyecto.component';

describe('ExportbolsaproyectoComponent', () => {
  let component: ExportbolsaproyectoComponent;
  let fixture: ComponentFixture<ExportbolsaproyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportbolsaproyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportbolsaproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

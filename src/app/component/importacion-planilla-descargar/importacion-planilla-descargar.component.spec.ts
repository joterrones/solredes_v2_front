import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportacionPlanillaDescargarComponent } from './importacion-planilla-descargar.component';

describe('ImportacionPlanillaDescargarComponent', () => {
  let component: ImportacionPlanillaDescargarComponent;
  let fixture: ComponentFixture<ImportacionPlanillaDescargarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportacionPlanillaDescargarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportacionPlanillaDescargarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

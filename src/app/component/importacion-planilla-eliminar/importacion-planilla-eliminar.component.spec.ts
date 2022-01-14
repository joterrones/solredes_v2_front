import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportacionPlanillaEliminarComponent } from './importacion-planilla-eliminar.component';

describe('ImportacionPlanillaEliminarComponent', () => {
  let component: ImportacionPlanillaEliminarComponent;
  let fixture: ComponentFixture<ImportacionPlanillaEliminarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportacionPlanillaEliminarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportacionPlanillaEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

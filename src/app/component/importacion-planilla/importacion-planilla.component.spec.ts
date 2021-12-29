import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportacionPlanillaComponent } from './importacion-planilla.component';

describe('ImportacionPlanillaComponent', () => {
  let component: ImportacionPlanillaComponent;
  let fixture: ComponentFixture<ImportacionPlanillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportacionPlanillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportacionPlanillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

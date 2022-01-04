import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportacionLineaComponent } from './importacion-linea.component';

describe('ImportacionLineaComponent', () => {
  let component: ImportacionLineaComponent;
  let fixture: ComponentFixture<ImportacionLineaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportacionLineaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportacionLineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

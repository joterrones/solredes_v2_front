import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportacionMontajeComponent } from './importacion-montaje.component';

describe('ImportacionMontajeComponent', () => {
  let component: ImportacionMontajeComponent;
  let fixture: ComponentFixture<ImportacionMontajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportacionMontajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportacionMontajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

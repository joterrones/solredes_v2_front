import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolsaproyectoubicacionComponent } from './bolsaproyectoubicacion.component';

describe('BolsaproyectoubicacionComponent', () => {
  let component: BolsaproyectoubicacionComponent;
  let fixture: ComponentFixture<BolsaproyectoubicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolsaproyectoubicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolsaproyectoubicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

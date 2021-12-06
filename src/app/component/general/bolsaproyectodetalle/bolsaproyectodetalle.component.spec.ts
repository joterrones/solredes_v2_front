import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolsaproyectodetalleComponent } from './bolsaproyectodetalle.component';

describe('BolsaproyectodetalleComponent', () => {
  let component: BolsaproyectodetalleComponent;
  let fixture: ComponentFixture<BolsaproyectodetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolsaproyectodetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolsaproyectodetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

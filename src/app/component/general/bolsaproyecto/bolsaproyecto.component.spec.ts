import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolsaproyectoComponent } from './bolsaproyecto.component';

describe('BolsaproyectoComponent', () => {
  let component: BolsaproyectoComponent;
  let fixture: ComponentFixture<BolsaproyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolsaproyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolsaproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

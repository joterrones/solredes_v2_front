import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificadorproyectoComponent } from './verificadorproyecto.component';

describe('VerificadorproyectoComponent', () => {
  let component: VerificadorproyectoComponent;
  let fixture: ComponentFixture<VerificadorproyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificadorproyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificadorproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

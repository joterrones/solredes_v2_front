import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallearmadoComponent } from './detallearmado.component';

describe('DetallearmadoComponent', () => {
  let component: DetallearmadoComponent;
  let fixture: ComponentFixture<DetallearmadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallearmadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallearmadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

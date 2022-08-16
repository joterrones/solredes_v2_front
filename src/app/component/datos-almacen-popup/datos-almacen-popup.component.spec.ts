import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosAlmacenPopupComponent } from './datos-almacen-popup.component';

describe('DatosAlmacenPopupComponent', () => {
  let component: DatosAlmacenPopupComponent;
  let fixture: ComponentFixture<DatosAlmacenPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosAlmacenPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosAlmacenPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

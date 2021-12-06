import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartafianzaComponent } from './cartafianza.component';

describe('CartafianzaComponent', () => {
  let component: CartafianzaComponent;
  let fixture: ComponentFixture<CartafianzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartafianzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartafianzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

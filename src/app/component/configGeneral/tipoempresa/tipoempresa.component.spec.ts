import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoempresaComponent } from './tipoempresa.component';

describe('TipoempresaComponent', () => {
  let component: TipoempresaComponent;
  let fixture: ComponentFixture<TipoempresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoempresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoempresaeditarComponent } from './tipoempresaeditar.component';

describe('TipoempresaeditarComponent', () => {
  let component: TipoempresaeditarComponent;
  let fixture: ComponentFixture<TipoempresaeditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoempresaeditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoempresaeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

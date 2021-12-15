import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipolineaeditarComponent } from './tipolineaeditar.component';

describe('TipolineaeditarComponent', () => {
  let component: TipolineaeditarComponent;
  let fixture: ComponentFixture<TipolineaeditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipolineaeditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipolineaeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

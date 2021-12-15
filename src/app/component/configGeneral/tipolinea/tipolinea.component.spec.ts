import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipolineaComponent } from './tipolinea.component';

describe('TipolineaComponent', () => {
  let component: TipolineaComponent;
  let fixture: ComponentFixture<TipolineaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipolineaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipolineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

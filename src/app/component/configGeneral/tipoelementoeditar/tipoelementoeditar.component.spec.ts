import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoelementoeditarComponent } from './tipoelementoeditar.component';

describe('TipoelementoeditarComponent', () => {
  let component: TipoelementoeditarComponent;
  let fixture: ComponentFixture<TipoelementoeditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoelementoeditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoelementoeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

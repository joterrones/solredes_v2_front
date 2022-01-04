import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoresGeneralesEditarComponent } from './valores-generales-editar.component';

describe('ValoresGeneralesEditarComponent', () => {
  let component: ValoresGeneralesEditarComponent;
  let fixture: ComponentFixture<ValoresGeneralesEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValoresGeneralesEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoresGeneralesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

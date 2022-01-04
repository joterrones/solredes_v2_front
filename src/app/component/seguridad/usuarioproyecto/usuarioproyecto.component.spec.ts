import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioproyectoComponent } from './usuarioproyecto.component';

describe('UsuarioproyectoComponent', () => {
  let component: UsuarioproyectoComponent;
  let fixture: ComponentFixture<UsuarioproyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioproyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

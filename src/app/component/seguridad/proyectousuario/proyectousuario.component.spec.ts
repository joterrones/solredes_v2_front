import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectousuarioComponent } from './proyectousuario.component';

describe('ProyectousuarioComponent', () => {
  let component: ProyectousuarioComponent;
  let fixture: ComponentFixture<ProyectousuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectousuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectousuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

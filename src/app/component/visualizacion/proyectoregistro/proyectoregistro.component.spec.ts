import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoregistroComponent } from './proyectoregistro.component';

describe('ProyectoregistroComponent', () => {
  let component: ProyectoregistroComponent;
  let fixture: ComponentFixture<ProyectoregistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoregistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoregistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoconfigComponent } from './proyectoconfig.component';

describe('ProyectoconfigComponent', () => {
  let component: ProyectoconfigComponent;
  let fixture: ComponentFixture<ProyectoconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

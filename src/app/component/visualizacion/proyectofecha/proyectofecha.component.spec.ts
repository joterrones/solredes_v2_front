import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectofechaComponent } from './proyectofecha.component';

describe('ProyectofechaComponent', () => {
  let component: ProyectofechaComponent;
  let fixture: ComponentFixture<ProyectofechaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectofechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectofechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

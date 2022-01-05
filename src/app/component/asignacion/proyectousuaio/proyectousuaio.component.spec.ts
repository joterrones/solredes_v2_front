import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectousuaioComponent } from './proyectousuaio.component';

describe('ProyectousuaioComponent', () => {
  let component: ProyectousuaioComponent;
  let fixture: ComponentFixture<ProyectousuaioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectousuaioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectousuaioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

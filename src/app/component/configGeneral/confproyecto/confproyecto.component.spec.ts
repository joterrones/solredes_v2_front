import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfproyectoComponent } from './confproyecto.component';

describe('ConfproyectoComponent', () => {
  let component: ConfproyectoComponent;
  let fixture: ComponentFixture<ConfproyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfproyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

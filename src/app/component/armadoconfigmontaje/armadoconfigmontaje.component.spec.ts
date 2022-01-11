import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmadoconfigmontajeComponent } from './armadoconfigmontaje.component';

describe('ArmadoconfigmontajeComponent', () => {
  let component: ArmadoconfigmontajeComponent;
  let fixture: ComponentFixture<ArmadoconfigmontajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArmadoconfigmontajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmadoconfigmontajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

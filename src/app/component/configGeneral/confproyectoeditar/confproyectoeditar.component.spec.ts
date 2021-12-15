import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfproyectoeditarComponent } from './confproyectoeditar.component';

describe('ConfproyectoeditarComponent', () => {
  let component: ConfproyectoeditarComponent;
  let fixture: ComponentFixture<ConfproyectoeditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfproyectoeditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfproyectoeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

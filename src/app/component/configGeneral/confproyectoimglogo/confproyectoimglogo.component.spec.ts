import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfproyectoimglogoComponent } from './confproyectoimglogo.component';

describe('ConfproyectoimglogoComponent', () => {
  let component: ConfproyectoimglogoComponent;
  let fixture: ComponentFixture<ConfproyectoimglogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfproyectoimglogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfproyectoimglogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

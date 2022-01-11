import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfproyectoimgComponent } from './confproyectoimg.component';

describe('ConfproyectoimgComponent', () => {
  let component: ConfproyectoimgComponent;
  let fixture: ComponentFixture<ConfproyectoimgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfproyectoimgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfproyectoimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

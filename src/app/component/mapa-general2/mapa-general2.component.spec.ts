import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaGeneral2Component } from './mapa-general2.component';

describe('MapaGeneral2Component', () => {
  let component: MapaGeneral2Component;
  let fixture: ComponentFixture<MapaGeneral2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaGeneral2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaGeneral2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

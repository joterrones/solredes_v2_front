import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaGeneralComponent } from './mapa-general.component';

describe('MapaGeneralComponent', () => {
  let component: MapaGeneralComponent;
  let fixture: ComponentFixture<MapaGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

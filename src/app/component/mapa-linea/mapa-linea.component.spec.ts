import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaLineaComponent } from './mapa-linea.component';

describe('MapaLineaComponent', () => {
  let component: MapaLineaComponent;
  let fixture: ComponentFixture<MapaLineaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaLineaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaLineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCapaComponent } from './filtro-capa.component';

describe('FiltroCapaComponent', () => {
  let component: FiltroCapaComponent;
  let fixture: ComponentFixture<FiltroCapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroCapaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroCapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

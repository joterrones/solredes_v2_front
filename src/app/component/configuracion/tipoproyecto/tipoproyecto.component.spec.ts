import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoproyectoComponent } from './tipoproyecto.component';

describe('TipoproyectoComponent', () => {
  let component: TipoproyectoComponent;
  let fixture: ComponentFixture<TipoproyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoproyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

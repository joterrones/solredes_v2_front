import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoproyectoconfigComponent } from './tipoproyectoconfig.component';

describe('TipoproyectoconfigComponent', () => {
  let component: TipoproyectoconfigComponent;
  let fixture: ComponentFixture<TipoproyectoconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoproyectoconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoproyectoconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

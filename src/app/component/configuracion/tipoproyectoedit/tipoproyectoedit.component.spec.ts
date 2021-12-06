import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoproyectoeditComponent } from './tipoproyectoedit.component';

describe('TipoproyectoeditComponent', () => {
  let component: TipoproyectoeditComponent;
  let fixture: ComponentFixture<TipoproyectoeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoproyectoeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoproyectoeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

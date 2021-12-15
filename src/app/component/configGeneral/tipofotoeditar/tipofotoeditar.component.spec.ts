import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipofotoeditarComponent } from './tipofotoeditar.component';

describe('TipofotoeditarComponent', () => {
  let component: TipofotoeditarComponent;
  let fixture: ComponentFixture<TipofotoeditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipofotoeditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipofotoeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipofotoComponent } from './tipofoto.component';

describe('TipofotoComponent', () => {
  let component: TipofotoComponent;
  let fixture: ComponentFixture<TipofotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipofotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipofotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

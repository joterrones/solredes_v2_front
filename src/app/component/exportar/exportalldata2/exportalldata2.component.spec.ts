import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Exportalldata2Component } from './exportalldata2.component';

describe('Exportalldata2Component', () => {
  let component: Exportalldata2Component;
  let fixture: ComponentFixture<Exportalldata2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exportalldata2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exportalldata2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

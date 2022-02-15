import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidamontajeeditarComponent } from './partidamontajeeditar.component';

describe('PartidamontajeeditarComponent', () => {
  let component: PartidamontajeeditarComponent;
  let fixture: ComponentFixture<PartidamontajeeditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartidamontajeeditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidamontajeeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

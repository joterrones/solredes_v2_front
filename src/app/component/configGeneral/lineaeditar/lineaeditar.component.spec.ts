import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaeditarComponent } from './lineaeditar.component';

describe('LineaeditarComponent', () => {
  let component: LineaeditarComponent;
  let fixture: ComponentFixture<LineaeditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineaeditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

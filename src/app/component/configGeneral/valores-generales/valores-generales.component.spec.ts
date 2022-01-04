import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoresGeneralesComponent } from './valores-generales.component';

describe('ValoresGeneralesComponent', () => {
  let component: ValoresGeneralesComponent;
  let fixture: ComponentFixture<ValoresGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValoresGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoresGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

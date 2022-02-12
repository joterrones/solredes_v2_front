import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoeditarComponent } from './periodoeditar.component';

describe('PeriodoeditarComponent', () => {
  let component: PeriodoeditarComponent;
  let fixture: ComponentFixture<PeriodoeditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodoeditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodoeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

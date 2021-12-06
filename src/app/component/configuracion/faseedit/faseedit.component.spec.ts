import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaseeditComponent } from './faseedit.component';

describe('FaseeditComponent', () => {
  let component: FaseeditComponent;
  let fixture: ComponentFixture<FaseeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaseeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaseeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

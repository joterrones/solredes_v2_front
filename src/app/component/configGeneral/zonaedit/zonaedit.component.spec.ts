import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaeditComponent } from './zonaedit.component';

describe('ZonaeditComponent', () => {
  let component: ZonaeditComponent;
  let fixture: ComponentFixture<ZonaeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonaeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonaeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

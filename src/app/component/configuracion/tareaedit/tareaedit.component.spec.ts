import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaeditComponent } from './tareaedit.component';

describe('TareaeditComponent', () => {
  let component: TareaeditComponent;
  let fixture: ComponentFixture<TareaeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareaeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

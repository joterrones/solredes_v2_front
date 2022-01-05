import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TragrupoComponent } from './tragrupo.component';

describe('TragrupoComponent', () => {
  let component: TragrupoComponent;
  let fixture: ComponentFixture<TragrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TragrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TragrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

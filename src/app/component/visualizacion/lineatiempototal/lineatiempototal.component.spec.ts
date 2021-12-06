import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineatiempototalComponent } from './lineatiempototal.component';

describe('LineatiempototalComponent', () => {
  let component: LineatiempototalComponent;
  let fixture: ComponentFixture<LineatiempototalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineatiempototalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineatiempototalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

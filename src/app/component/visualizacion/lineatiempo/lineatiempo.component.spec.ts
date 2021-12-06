import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineatiempoComponent } from './lineatiempo.component';

describe('LineatiempoComponent', () => {
  let component: LineatiempoComponent;
  let fixture: ComponentFixture<LineatiempoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineatiempoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineatiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetradomontajeComponent } from './metradomontaje.component';

describe('MetradomontajeComponent', () => {
  let component: MetradomontajeComponent;
  let fixture: ComponentFixture<MetradomontajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetradomontajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetradomontajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

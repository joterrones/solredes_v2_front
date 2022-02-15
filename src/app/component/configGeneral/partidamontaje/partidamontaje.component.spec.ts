import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidamontajeComponent } from './partidamontaje.component';

describe('PartidamontajeComponent', () => {
  let component: PartidamontajeComponent;
  let fixture: ComponentFixture<PartidamontajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartidamontajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidamontajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
